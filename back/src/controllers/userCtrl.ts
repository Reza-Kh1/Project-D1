import asyncHandler from "express-async-handler"
import { PrismaClient } from "@prisma/client"
import { customError } from "../middlewares/globalError"
import pagination from "../utils/pagination"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import token from "jsonwebtoken"
const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { education, software, expertises, ...data } = req.body
    try {
        const dataUser = await prisma.expert.update({
            where: { id },
            data: {
                ...data,
                isStatus: true,
            },
        })
        if (software && software.length) {
            await prisma.software.deleteMany({ where: { userId: id } })
            await prisma.software.createMany({ data: software })
        }
        if (expertises && expertises.length > 0) {
            await prisma.expertise.deleteMany({ where: { userId: id } })
            await prisma.expertise.createMany({ data: expertises })
        }
        if (education && education.length > 0) {
            await prisma.education.deleteMany({ where: { userId: id } })
            await prisma.education.createMany({ data: education })
        }
        res.send({ ...dataUser })
    } catch (err) {
        console.log(err);

        const e = err as PrismaClientKnownRequestError
        if (e.code === 'P2002') {
            throw customError("شماره تلفن قبلاً ثبت شده است.", 400, e)
        } else {
            throw customError("آپدیت با خطا مواجه شد.", 500, e)
        }
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const dataUser = await prisma.expert.update({
            where: { id: id },
            data: { isDelete: true }
        })
        if (!dataUser) throw new Error()
        res.send({ success: true })
    } catch (err) {
        throw customError("آپدیت با خطا مواجه شد.", 400, err)
    }
})

const getProfile = asyncHandler(async (req, res) => {
    const cookie = req.cookies?.sitetest;
    const tokenUser = token.verify(cookie, process.env.TOKEN_SECURITY as string) as { id: string }
    const { updatedAt, ...other } = select
    try {
        const dataUser = await prisma.expert.findUnique({
            where: {
                id: tokenUser.id, isDelete: false
            }, select: { expertises: true, education: true, software: true, ...other },
        })
        res.send({ ...dataUser })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 500, err)
    }

})

const getAllUser = asyncHandler(async (req, res) => {
    const { page, order, id, last } = req.query
    const pager = Number(page) || 1
    const sortOrder = order as "desc" | "asc"
    if (id) {
        const data = await prisma.expert.findUnique({
            where: { id: id.toString() }, include: {
                education: {
                    select: { education: true, major: true, university: true }
                },
                software: {
                    select: { employment: true, name: true, lvl: true, }
                },
                expertises: {
                    select: { file: true, desc: true, name: true, lvl: true }
                }, DetailScore: {
                    select: {
                        score: true, totalScore: true
                    }
                },
            }
        })
        res.send({ ...data })
        return
    }
    const dataUser = await prisma.expert.findMany({
        skip: (pager - 1) * pageLimit,
        take: pageLimit,
        orderBy: { createdAt: sortOrder }
    })
    const count = await prisma.expert.count()
    const pagi = pagination(count, pager, pageLimit)
    const data = {
        row: dataUser,
        pagination: pagi
    }
    res.send({ data })
})

export {
    updateUser,
    deleteUser,
    getProfile,
    getAllUser
}
const select = {
    id: true,
    name: true,
    age: true,
    phone: true,
    province: true,
    city: true,
    gender: true,
    jobStatus: true,
    jobLocation: true,
    jobTitle: true,
    jobTime: true,
    image: true,
    password: false,
    createdAt: true,
    updatedAt: true,
    isStatus: true
}

// const updateSoftwarePromises = await software.map((softwareItem: SoftwareType) => {
//     if (softwareItem.id) {
//         return prisma.software.update({
//             where: { id: softwareItem.id },
//             data: {
//                 lvl: softwareItem.lvl,
//                 name: softwareItem.name,
//                 tag: softwareItem.tag
//             }
//         });
//     } else {
//         return prisma.software.create({
//             data: {
//                 tag: softwareItem.tag,
//                 lvl: softwareItem.lvl,
//                 name: softwareItem.name,
//                 employmentId: Number(id)
//             }
//         });
//     }
// });
// await Promise.all(updateSoftwarePromises);
// const currentPage = Number(page) || 1;
// const limit = Number(pageSize) || 10;
// const offset = (currentPage - 1) * limit;

// // ساخت شرط‌ها برای جستجو
// const conditions: any = {
//   AND: [
//     searchTerm
//       ? { OR: [
//           { name: { contains: searchTerm, mode: 'insensitive' } }, // جستجو در نام
//           { jobTitle: { contains: searchTerm, mode: 'insensitive' } } // جستجو در عنوان شغل
//         ]}
//       : undefined,
//     minAge ? { age: { gte: Number(minAge) } } : undefined, // فیلتر حداقل سن
//     maxAge ? { age: { lte: Number(maxAge) } } : undefined, // فیلتر حداکثر سن
//     gender ? { gender } : undefined, // فیلتر جنسیت
//     excludeCities ? { city: { notIn: excludeCities.split(',') } } : undefined, // حذف شهرها
//   ].filter(Boolean), // حذف مقادیر undefined
// };

// // کوئری Prisma
// const results = await prisma.user.findMany({
//   where: conditions,
//   orderBy: sortBy
//     ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' }
//     : undefined, // مرتب‌سازی
//   skip: offset, // صفحه‌بندی: شروع
//   take: limit,  // صفحه‌بندی: تعداد
//   include: includeRelations === 'true'
//     ? { posts: true, profile: true } // روابط مرتبط
//     : undefined,
// });

// // شمارش کل نتایج (برای صفحه‌بندی)
// const totalCount = await prisma.user.count({ where: conditions });