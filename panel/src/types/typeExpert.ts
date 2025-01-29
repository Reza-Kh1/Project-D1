import { CompanyType, EmploymentType, PaginationType } from "./typeCompany"

type ExpertType = {
    age: null | string
    city: null | string
    createdAt: Date
    gender: null | "MAN" | "WOMAN"
    id: string
    image: null | string
    jobLocation: null | string
    jobStatus: null | boolean
    jobTime: null | string
    jobTitle: null | string
    name: null | string
    phone: string
    province: null | string
    isStatus: boolean
    isDelete: boolean
    education: EducationType[]
    expertises: ExpertisesType[]
    software: SoftwareType[]
    DetailScore?: DetailScoreExpert
}
type DetailScoreExpert = {
    id: number
    totalScore?: string
    score?: string
    context?: string
    ExpertId?: string
}
type SoftwareType = {
    tag: string
    name: string
    lvl: string
    userId?: string
    employmentId?: string
}
type EducationType = {
    major: string,
    university: string,
    education: string,
    userId?: string

    id: number
}
type ExpertisesType = {
    name: string,
    file: string | null
    lvl: string
    desc: string
    userId: string
    id: number
}
type JobContactType = {
    id: number,
    isDone: boolean,
    approvedExpert?: boolean,
    approvedCompany?: boolean,
    message?: string
    detailMessage?: string[],
    expertId: string
    employmentId: 9,
    companyId: string
    createdAt: Date
    updatedAt: Date
    expert: ExpertType
    employment: EmploymentType
    company: CompanyType
    score: string
    msg: string
    context: { name: string, type: string }[]
}
type GetJobContactType = {
    data: JobContactType[]
    pagination: PaginationType
}
type AllChatType = {
    id: number
    expertId: string,
    companyId: string
    jobContactId: number,
    createdAt: Date
    company: {
        name: string
    },
    expert: {
        name: string
        image?: string
    }
}
type SingleChatType = {
    id: number
    expertId: string
    companyId: string
    jobContactId: number
    createdAt: Date
    expert: {
        name: string
        image?: string
    },
    company: {
        name: string
    },
    messages: MessageType[]
}
type MessageType = {
    isDelete: boolean
    id: number
    content: string,
    senderType: "EXPERT" | "COMPANY"
}
type ChatType = {
    content: string
    senderType: "EXPERT" | "COMPANY"
}
type ScoreUsersType = {
    id: number,
    isDone: boolean,
    approvedExpert: boolean,
    approvedCompany: boolean,
    message: null | string,
    detailMessage: null | JSON,
    expertId: string,
    employmentId: number,
    companyId: string,
    createdAt: Date,
    updatedAt: Date,
    company: {
        name: string,
        DetailScore?: DetailScoreType
    },
    employment: EmploymentType[]
}
type DetailScoreType = {
    id: number
    score: string | null,
    totalScore: number | null,
    context: JSON | null
    ExpertId: string
    companyId: string
}
export type {
    ExpertType,
    SoftwareType,
    EducationType,
    ExpertisesType,
    GetJobContactType,
    JobContactType,
    DetailScoreExpert,
    SingleChatType,
    AllChatType,
    ChatType,
    DetailScoreType,
    ScoreUsersType
}