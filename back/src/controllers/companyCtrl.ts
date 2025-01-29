import expressAsyncHandler from "express-async-handler"
import { Prisma, PrismaClient } from "@prisma/client"
import { customError } from "../middlewares/globalError"
import pagination from "../utils/pagination"
import token from "jsonwebtoken"

const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()

const createCompany = expressAsyncHandler(async (req, res) => {
    const data: Prisma.CompanyCreateInput = req.body
    const dataUser = await prisma.company.create({ data })
    res.send({ data: dataUser })
})

const updateCompany = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const data: Prisma.CompanyUpdateInput = req.body
    try {
        const dataUser = await prisma.company.update({
            where: { id: id },
            data: { ...data, isStatus: true }
        })
        if (!dataUser) throw new Error()
        res.send({ ...dataUser })
    } catch (err) {
        throw customError("آپدیت با خطا مواجه شد.", 400, err)
    }
})

const getProfileCompany = expressAsyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies?.sitetest;
        const tokenUser = token.verify(cookie, process.env.TOKEN_SECURITY as string) as { id: string }
        const dataUser = await prisma.company.findUnique({ where: { id: tokenUser.id } })
        if (!dataUser) throw new Error()
        res.send({ ...dataUser })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 403, err)
    }
})

const getAllCompany = expressAsyncHandler(async (req, res) => {
    const { page, order } = req.query
    const pager = Number(page) || 1
    const sortOrder = order as "desc" | "asc"
    const dataUser = await prisma.company.findMany({
        skip: (pager - 1) * pageLimit,
        take: pageLimit,
        orderBy: { createdAt: sortOrder },
    })
    const count = await prisma.company.count()
    const pagi = pagination(count, pager, pageLimit)
    const data = {
        row: dataUser,
        pagination: pagi
    }
    res.send({ data })
})

const deleteCompany = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const dataUser = await prisma.company.update({
            where: { id: id },
            data: { isDelete: true }
        })
        if (!dataUser) throw new Error()
        res.send({ success: true })
    } catch (err) {
        throw customError("آپدیت با خطا مواجه شد.", 400, err)
    }
})

export {
    createCompany,
    updateCompany,
    getProfileCompany,
    getAllCompany,
    deleteCompany
}