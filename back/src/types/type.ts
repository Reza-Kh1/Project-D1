type ExpertiseType = {
    id: number
    name: string
    lvl: string
    file: string
    desc: string
    userId: string
}
type EducationType = {
    id: number
    major: string
    education: string
    university: string
    userId: string
}
type SoftwareType = {
    id: number
    name: string
    lvl: string
    tag: string
    userId?: string
    employmentId?: number
}
export type {
    SoftwareType,
    EducationType,
    ExpertiseType
}