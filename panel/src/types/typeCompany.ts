import { ExpertType, SoftwareType } from "./typeExpert"
type CompanyType = {
    id: string
    isDelete: boolean
    isStatus: boolean
    name: string
    password: string
    companyId: string
    phone: string
    userCompany: string
    phoneUser: string
    userRole: string
    companyField: string
    employeeCount: string
    address: string
    lvl: string
    year: string
    createdAt: Date
    updatedAt: Date
    DetailScore?: DetailScoreType
    employment: EmploymentType[]
    // Chat          Chat[]
}
type DetailScoreType = {
    id: number
    totalScore: string
    score: string
    context: JSON
    ExpertId: string
    companyId: string
}
type GetEmploymentType = {
    data: EmploymentType[]
    pagination: PaginationType
}
type EmploymentType = {
    id: string
    nameExpertise: string
    lvl: string
    teamWork: boolean
    gender?: string
    price: string
    age: string
    startProject: Date
    Software: SoftwareType[]
    takeTask: boolean
    remote: boolean
    descRemote?: WorkingTimeType[] | string
    desc: string
    createdAt: Date
    updatedAt: Date
    companyId: string
    isDone: boolean
    isDelete: boolean
    company: CompanyType
}
type WorkingTimeType = {
    day: string
    active: boolean
    desc: string
    stratTime: string | null | Date
    endTime: string | null | Date
}
type PaginationType = {
    allPage: number;
    nextPage?: number;
    prevPage?: number;
};
type jobContactCompany = {
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
    company: CompanyType
    employment: EmploymentType
}
type GetJobContactCompany = {
    data: jobContactCompany[]
    pagination: PaginationType
}
export type {
    EmploymentType,
    WorkingTimeType,
    CompanyType,
    PaginationType,
    GetEmploymentType,
    jobContactCompany,
    GetJobContactCompany
}