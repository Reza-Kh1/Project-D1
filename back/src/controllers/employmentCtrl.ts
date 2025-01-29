import { PrismaClient } from "@prisma/client"
import expressAsyncHandler from "express-async-handler"
import { SoftwareType } from "../types/type"
import { customError } from "../middlewares/globalError"
import pagination from "../utils/pagination"
const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()
const createEmployment = expressAsyncHandler(async (req, res) => {
    const { software, ...data } = req.body
    const dataCreate = await prisma.employment.create({ data })
    const newBody = software.map((i: SoftwareType) => {
        i.employmentId = dataCreate.id
        return i
    })
    await prisma.software.createMany({ data: newBody })
    res.send({ success: true })
})
const updateEmployment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { software, ...data } = req.body;
    try {
        await prisma.employment.update({
            where: { id: Number(id) },
            data: data,
        });
        if (software && software.length) {
            await prisma.software.deleteMany({ where: { employmentId: Number(id) } })
            await prisma.software.createMany({ data: software })
        }
        res.send({ success: true });
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 500, err)
    }

});
const deleteEmployment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await prisma.employment.update({
        where: { id: Number(id) },
        data: {
            isDelete: true
        },
    })
    res.send({ success: true })
})
const getEmployment = expressAsyncHandler(async (req, res) => {
    const { id, companyId, page } = req.query
    const pages = Number(page) || 1
    if (companyId) {
        const totalCount = await prisma.employment.count({
            where: {
                isDelete: false,
                companyId: companyId as string,
            },
        });
        const data = await prisma.employment.findMany({
            where: {
                isDelete: false,
                companyId: companyId as string
            },
            skip: (pageLimit * pages) - pageLimit,
            take: pageLimit,
        })
        const pager = pagination(totalCount, pages, pageLimit)
        res.send({ data, pagination: pager })
        return
    }
    if (id) {
        const data = await prisma.employment.findUnique({
            where: { id: Number(id) }, include: {
                Software: true
            }
        })
        res.send({ ...data })
    } else {
        const totalCount = await prisma.employment.count()
        const data = await prisma.employment.findMany({
            where: { isDelete: false, isDone: false },
            skip: (pageLimit * pages) - pageLimit,
            take: pageLimit,
            include: {
                company: {
                    select: {
                        name: true,
                        lvl: true,
                        companyField: true,
                        employeeCount: true,
                    }
                }
            }
        })
        const pager = pagination(totalCount, pages, pageLimit)
        res.send({ data, pagination: pager })
    }
})
export {
    createEmployment,
    updateEmployment,
    deleteEmployment,
    getEmployment
}