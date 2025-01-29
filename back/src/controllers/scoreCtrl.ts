import { PrismaClient } from "@prisma/client"
import expressAsyncHandler from "express-async-handler"
import { customError } from "../middlewares/globalError"
const prisma = new PrismaClient()
type ContextType = { name: string, num: number, type: boolean }
const creatScore = expressAsyncHandler(async (req, res) => {
    const { score, msg, context, jobContactId, companyId, expertId, scoreType } = req.body
    let where = {} as any
    if (scoreType === "Company") {
        where.ExpertId = expertId
    } else {
        where.companyId = companyId
    }
    try {
        const contactJob = await prisma.jobContact.findUnique({ where: { id: Number(jobContactId) } })
        const info = await prisma.detailScore.findUnique({ where: where })
        if (!info) {
            let arry: ContextType[] = []
            if (context.length) {
                context.map((row: ContextType) => {
                    arry.push({ name: row.name, num: 1, type: row.type })
                })
            }
            let body = {
                context: arry,
                totalScore: 1,
                score: score
            } as any
            if (scoreType === "Company") {
                body.ExpertId = expertId
            } else {
                body.companyId = companyId
            }
            await prisma.detailScore.create({ data: { ...body } })
        } else {
            let arry: ContextType[] = []
            const dataContext = info.context as ContextType[]
            if (dataContext.length) {
                dataContext.map((row: ContextType) => {
                    if (context.includes(row.name)) {
                        arry.push({ name: row.name, num: Number(row.num + 1), type: row.type })
                    }
                })
            }
            if (context.length) {
                context.map((row: ContextType) => {
                    arry.push({ name: row.name, num: 1, type: row.type })
                })
            }
            const body = {
                totalScore: Number(info.totalScore) + 1,
                score: Number(((Number(info.score) + score) / (Number(info.totalScore) + 1)).toFixed(1)),
                context: arry
            }
            let where = {} as any
            if (scoreType === "Company") {
                where.ExpertId = expertId
            } else {
                where.companyId = companyId
            }
            await prisma.detailScore.update({ where: { ...where }, data: { ...body } })
        }
        if (scoreType === "Company") {
            if (contactJob?.isScoreExpert) {
                await prisma.jobContact.update({ where: { id: Number(jobContactId) }, data: { isScoreCompany: true, isDone: true } })
                await prisma.employment.update({ where: { id: contactJob.employmentId }, data: { isDone: true } })
            } else {
                await prisma.jobContact.update({ where: { id: Number(jobContactId) }, data: { isScoreCompany: true } })
            }
        } else {
            if (contactJob?.isScoreCompany) {
                await prisma.jobContact.update({ where: { id: Number(jobContactId) }, data: { isScoreExpert: true, isDone: true } })
                await prisma.employment.update({ where: { id: contactJob.employmentId }, data: { isDone: true } })
            } else {
                await prisma.jobContact.update({ where: { id: Number(jobContactId) }, data: { isScoreExpert: true } })
            }
        }
        await prisma.score.create({
            data: { score, context, expertId, companyId, scoreType, msg, jobContactId }
        })
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        throw customError("با خطا مواجه شدیم", 400, err)
    }
})

const getScore = expressAsyncHandler(async (req, res) => {
    const { companyId, expertId, last } = req.query
    let search = {
        approvedCompany: true,
        approvedExpert: true
    } as any
    let includes = {} as any
    try {
        if (last) {
            let searchLast = {} as any
            let includeLast = {}
            if (companyId) {
                includeLast = { expert: { include: { DetailScore: { select: { score: true, totalScore: true } } } } }
                searchLast.companyId = companyId
                searchLast.scoreType = "Company"
            } else {
                includeLast = { company: { include: { DetailScore: { select: { score: true, totalScore: true } } } } }
                searchLast.expertId = expertId
                searchLast.scoreType = "Expert"
            }
            const data = await prisma.score.findMany({
                where: searchLast,
                include: includeLast
            })
            res.send({ data })
            return
        }
        if (companyId) {
            includes = {
                expert: {
                    include: {
                        education: {
                            select: {
                                major: true,
                                education: true,
                                university: true
                            }
                        },
                        software: {
                            select: {
                                name: true,
                                lvl: true
                            }
                        },
                        expertises: {
                            select: {
                                lvl: true,
                                file: true,
                                desc: true,
                                name: true
                            }
                        },
                        DetailScore: {
                            select: { score: true, totalScore: true }
                        },
                    }
                }
            }
            search.isScoreCompany = false
            search.companyId = companyId
        } else {
            search.expertId = expertId
            search.isScoreExpert = false
            includes = {
                employment: {
                    include: {
                        company: {
                            select: {
                                name: true,
                                lvl: true,
                                id: true,
                                companyField: true,
                                employeeCount: true,
                                DetailScore: {
                                    select: {
                                        totalScore: true,
                                        score: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }        
        const data = await prisma.jobContact.findMany({
            where: { ...search }, include: includes
        })
        res.send({ data })
    } catch (err) {
        console.log(err);
        throw customError("با خطا مواجه شدیم", 400, err)
    }
})

export {
    creatScore,
    getScore
}