import { PrismaClient } from "@prisma/client"
import asyncHandler from "express-async-handler"
import { createHash, comaprePassword } from "../utils/hashPassword"
import { customError } from "../middlewares/globalError"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import createToken from "../utils/createToken"
import { Response } from "express"
import crypto from "crypto";
import Ghasedak from "../middlewares/sms"
const apiKey = process.env.API_KEY_GHASEDAK as string
const templateGhasedak = process.env.TEMPLATE_GHASEDAK as string
const prisma = new PrismaClient()

const loginExpert = asyncHandler(async (req, res: Response) => {
    const { password, phone } = req.body
    const dataExpert = await prisma.expert.findUnique({ where: { phone, isDelete: false } })
    if (!dataExpert) {
        throw customError("شماره مورد نظر ثبت نشده است", 404)
    }
    await comaprePassword(password, dataExpert?.password)
    sendCookie(res, dataExpert, "expert")
    res.send({ data: dataExpert })
})

const signUpExpert = asyncHandler(async (req, res) => {
    const { password, phone } = req.body
    const hash = await createHash(password)
    const smsPass = await createPass()
    let dataExpert: { id?: string } = {}

    try {
        const dataSingle = await prisma.expert.findUnique({ where: { phone }, select: { isVerify: true } })
        if (dataSingle && dataSingle.isVerify) {
            throw customError("شما قبلا با این شماره ثبت نام کرده اید", 403)
        }
        if (dataSingle && !dataSingle.isVerify) {
            dataExpert = await prisma.expert.update({ where: { phone: phone }, data: { verifyPass: smsPass, password: hash }, select: { id: true } })
        } else {
            dataExpert = await prisma.expert.create({ data: { password: hash, phone, verifyPass: smsPass }, select: { id: true } })
        }
        ////// ارسال پیامک
        // const resSms = await sendSms({ password: smsPass, phone: phone })
        // if (!resSms) {
        //     throw customError("دوباره تلاش کنید", 403)
        // }
        ////// ارسال پیامک
        res.send({ id: dataExpert?.id, pass: smsPass })
    } catch (err) {
        const e = err as PrismaClientKnownRequestError
        if (e.code === 'P2002') {
            throw customError("شماره تلفن قبلاً ثبت شده است", 400, e)
        } else {
            throw customError("خطای داخلی سرور", 500, e)
        }
    }

})

const signUpCompany = asyncHandler(async (req, res) => {
    const { password, phone, companyId } = req.body
    let dataCompany: { id?: string } = {}
    const hash = await createHash(password)
    const smsPass = await createPass()
    try {
        const data = await prisma.company.findUnique({ where: { companyId }, select: { isVerify: true } })
        if (data && data.isVerify) {
            throw customError("شما قبلا با این شماره ثبت نام کرده اید", 403)
        }
        if (data && !data.isVerify) {
            dataCompany = await prisma.company.update({ where: { companyId }, data: { verifyPass: smsPass, password: hash }, select: { id: true } })
        } else {
            dataCompany = await prisma.company.create({ data: { password: hash, phoneUser: phone, companyId, verifyPass: smsPass }, select: { id: true } })
        }
        ////// ارسال پیامک
        // const resSms = await sendSms({ password: smsPass, phone: phone })
        // if (!resSms) {
        //     throw customError("دوباره تلاش کنید", 403)
        // }
        ////// ارسال پیامک
        res.send({ id: dataCompany?.id, pass: smsPass })
    } catch (err) {
        const e = err as PrismaClientKnownRequestError
        console.log(e.message);
        if (e.code === 'P2002') {
            throw customError("قبلا با این شناسه ملی ثبت نام شده است", 400, e)
        } else if (e.message === "شما قبلا با این شماره ثبت نام کرده اید") {
            throw customError(e.message, 500, e)
        } else if (e.message === "دوباره تلاش کنید") {
            throw customError("دوباره تلاش کنید", 500, e)
        }
        else {
            throw customError("خطای داخلی سرور", 500, e)
        }
    }
})

const loginCompany = asyncHandler(async (req, res) => {
    const { password, companyId } = req.body
    const dataCompany = await prisma.company.findUnique({ where: { companyId, isDelete: false, isVerify: true } })
    if (!dataCompany) {
        throw customError("شناسه ملی ثبت نشده است", 404)
    }
    await comaprePassword(password, dataCompany?.password)
    sendCookie(res, dataCompany, "company")
    res.send({ ...dataCompany })
})

const logOutUser = asyncHandler(async (req, res) => {
    res.cookie("sitetest", "", { expires: new Date(0) });
    res.send({ success: true });
});

const verifyPassword = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { type, pass } = req.body
    const isCompany = type === "company" ? true : false
    const search = { where: { id }, select: { verifyPass: true, phone: true, name: true, isStatus: true, id: true } }
    let data = {} as any
    if (!isCompany) {
        data = await prisma.expert.findUnique(search)
    }
    if (isCompany) {
        data = await prisma.company.findUnique(search)
    }
    if (data?.verifyPass === pass) {
        sendCookie(res, data, !isCompany ? "expert" : "company")
        if (!isCompany) {
            data = await prisma.expert.update({ where: { id }, data: { isVerify: true } })
        }
        if (isCompany) {
            data = await prisma.company.update({ where: { id }, data: { isVerify: true } })
        }
        res.send({ data });
        return
    } else {
        throw customError("رمز اشتباه ارسال شده", 403)
    }
});

const forgetPass = asyncHandler(async (req, res) => {
    res.send({ success: true })
})

const sendCookie = (res: Response, data: any, type: string) => {
    const body = {
        isStatus: data.isStatus,
        name: data.name,
        id: data.id,
        type
    };
    const token = createToken(body)
    res.cookie("sitetest", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
    });
}

const createPass = async () => {
    const digits = "0123456789".split("");
    for (let i = digits.length - 1; i > 0; i--) {
        const j = crypto.randomInt(0, i + 1);
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, 5).join("");
}

const sendSms = async ({ phone, password }: { phone: string, password: string }) => {
    let ghasedak = new Ghasedak(apiKey);
    const receptor = phone;
    const template = templateGhasedak;
    const param1 = password;
    const { result } = await ghasedak.verification({ receptor, type: 8, template, param1 })
    if (result?.code === 200) {
        return true
    } else {
        return false
    }
}

export {
    signUpExpert,
    loginExpert,
    signUpCompany,
    loginCompany,
    forgetPass,
    logOutUser,
    verifyPassword
}