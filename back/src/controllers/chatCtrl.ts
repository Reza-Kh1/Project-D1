import { PrismaClient } from "@prisma/client"
import expressAsyncHandler from "express-async-handler"
import pagination from "../utils/pagination"
import { customError } from "../middlewares/globalError"
const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()
const createChat = expressAsyncHandler(async (req, res) => {
    const { ...data } = req.body
    await prisma.chat.create({ data })
    res.send({ success: true })
})
const deleteChat = expressAsyncHandler(async (req, res) => {
    const { ...data } = req.body
    await prisma.jobContact.create({ data })
    res.send({ success: true })
})
const getChat = expressAsyncHandler(async (req, res) => {
    const { companyId, approved, expertId, id } = req.query
    if (!id && !companyId && !approved && !expertId) throw customError("اطلاعاتی ارسال نشد", 404)
    const lastChat = approved ? false : true
    if (companyId) {
        const dataChat = await prisma.chat.findMany({
            where: {
                companyId: companyId.toString(),
                NOT: {
                    jobContact: { isDone: lastChat }
                }
            },
            include: {
                expert: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        })
        res.send({ data: dataChat })
        return
    }
    if (expertId) {
        const dataChat = await prisma.chat.findMany({
            where: {
                expertId: expertId.toString(),
                NOT: {
                    jobContact: { isDone: lastChat }
                }
            },
            include: {
                company: {
                    select: {
                        name: true
                    }
                }
            }
        })
        res.send({ data: dataChat })
        return
    }
    if (id) {
        const dataChat = await prisma.chat.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                expert: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                company: {
                    select: {
                        name: true
                    }
                },
                messages: {
                    select: {
                        isDelete: true,
                        id: true,
                        content: true,
                        senderType: true
                    },
                }
            }
        })
        res.send({ data: dataChat })
        return
    }
})

export {
    createChat,
    deleteChat,
    getChat
}