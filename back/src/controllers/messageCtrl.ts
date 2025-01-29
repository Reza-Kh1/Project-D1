import { PrismaClient } from "@prisma/client"
import expressAsyncHandler from "express-async-handler"
import pagination from "../utils/pagination"
import { customError } from "../middlewares/globalError"
const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()
const createMessage = expressAsyncHandler(async (req, res) => {
    const { ...data } = req.body
    try {
        await prisma.message.create({ data: data })
        res.send({ success: true })
    } catch (err) {
        console.log(err);

        throw customError("با خطا مواجه شدیم", 400, err)
    }
})
const deleteMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await prisma.message.update({ where: { id: Number(id) }, data: { isDelete: true } })
        res.send({ success: true })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 400, err)
    }
})
const updateMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { ...data } = req.body
    try {
        await prisma.message.update({ where: { id: Number(id) }, data: data })
        res.send({ success: true })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 400, err)
    }
})
export {
    createMessage,
    deleteMessage,
    updateMessage
}