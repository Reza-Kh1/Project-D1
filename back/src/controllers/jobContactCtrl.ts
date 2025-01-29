import { PrismaClient } from "@prisma/client"
import expressAsyncHandler from "express-async-handler"
import pagination from "../utils/pagination"
import { customError } from "../middlewares/globalError"
const pageLimit = Number(process.env.PAGE_LIMITE) || 5
const prisma = new PrismaClient()
const createJobContact = expressAsyncHandler(async (req, res) => {
    const { ...data } = req.body
    try {
        await prisma.jobContact.create({ data })
        res.send({ success: true })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 500, err)
    }
})
const updateJobContact = expressAsyncHandler(async (req, res) => {
    const { ...data } = req.body
    const { id } = req.params
    try {
        const dataUpdate = await prisma.jobContact.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        if (!dataUpdate) throw new Error()
        res.send({ ...dataUpdate })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 500, err)
    }
})
const getJobContact = expressAsyncHandler(async (req, res) => {
    const { expertId, companyId, approved, page, last } = req.query
    let pages = Number(page) || 1
    let search = {} as any
    let searchCount = {} as any
    try {
        if (expertId) {
            let searchExpert = {} as any
            if (last === "true") {
                searchExpert.expertId = expertId.toString()
            } else {
                searchExpert.expertId = expertId.toString()
                searchExpert.approvedExpert = null
            }
            const [totalCount, jobContacts] = await Promise.all([
                prisma.jobContact.count({
                    where: {
                        approvedExpert: null,
                        expertId: expertId.toString()
                    }
                }),
                prisma.jobContact.findMany({
                    where: searchExpert,
                    include: {
                        employment: {
                            include: {
                                Software: {
                                    select: {
                                        lvl: true,
                                        name: true
                                    }
                                },
                                company: {
                                    select: {
                                        name: true,
                                        lvl: true,
                                        companyField: true,
                                        employeeCount: true,
                                        DetailScore: {
                                            select: {
                                                score: true,
                                                totalScore: true,
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    skip: (pageLimit * pages) - pageLimit,
                    take: pageLimit,
                })
            ]);
            const pager = pagination(totalCount, pages, pageLimit)
            res.send({ data: jobContacts, pagination: pager })
            return
        }
        if (companyId) {
            if (approved) {
                searchCount = {
                    where: {
                        NOT: {
                            approvedCompany: null,
                        },
                        companyId: companyId.toString()
                    },
                }
                search = {
                    where: {
                        NOT: {
                            approvedCompany: null,
                        },
                        companyId: companyId.toString()
                    },
                    include: {
                        expert: {
                            include: {
                                DetailScore: {
                                    select: {
                                        score: true,
                                        totalScore: true,
                                    }
                                }
                            }
                        },
                        employment: {
                            select: {
                                nameExpertise: true,
                                price: true,
                                desc: true,
                            },
                        },
                    },
                    skip: (pageLimit * pages) - pageLimit,
                    take: pageLimit,
                }
            } else {
                searchCount = {
                    where: {
                        approvedExpert: true,
                        approvedCompany: null,
                        companyId: companyId.toString()
                    }
                }
                search = {
                    where: {
                        approvedExpert: true,
                        approvedCompany: null,
                        companyId: companyId.toString()
                    },
                    include: {
                        expert: {
                            include: {
                                software: {
                                    select: {
                                        name: true,
                                        lvl: true
                                    }
                                },
                                expertises: {
                                    select: {
                                        name: true,
                                        file: true,
                                        lvl: true,
                                        desc: true,
                                    }
                                },
                                education: {
                                    select: {
                                        education: true,
                                        major: true,
                                        university: true
                                    }
                                }

                                ,
                                DetailScore: {
                                    select: {
                                        score: true,
                                        totalScore: true,
                                    }
                                }
                            }
                        },
                        employment: {
                            select: {
                                nameExpertise: true,
                                price: true,
                                desc: true,
                                Software: {
                                    select: {
                                        lvl: true,
                                        name: true
                                    }
                                }
                            },
                        },
                    },
                }
            }
            const [totalCount, jobContacts] = await Promise.all([
                prisma.jobContact.count(searchCount),
                prisma.jobContact.findMany(search)
            ]);
            const pager = pagination(totalCount, pages, pageLimit)
            res.send({ data: jobContacts, pagination: pager })
            return
        }
        const [totalCount, jobContacts] = await Promise.all([
            prisma.jobContact.count(),
            prisma.jobContact.findMany({
                skip: (pageLimit * pages) - pageLimit,
                take: pageLimit,
            })
        ]);
        const pager = pagination(totalCount, pages, pageLimit)
        res.send({ data: jobContacts, pagination: pager })
    } catch (err) {
        throw customError("با خطا مواجه شدیم", 500, err)
    }
})
export {
    createJobContact,
    updateJobContact,
    getJobContact
}