type CompanyEmploymentType = {
    technicalExpertise: string
    lvlExpert: string
    descWork: string
    id: number
    image: string
    lvlCompany: string
    name: string
    fanavar: { name: string, lvl: string }[]
    locationWork: boolean
    days: number
    gender: string
    price: string
    age: number
    hAge: number
    takeTask: boolean
    desc: string
    score: number
    totalScore: number
    teamWork: string
}
type ExpertType = {
    name: string
    age: number
    phone: string
    technicalExpertise: technicalExpertiseType[] | null
    city: string
    province: string
    gender: string
    image: string | null
    education: EducationType[] | null
    software: { name: string, lvl: string }[] | null
    score: string | null
    countScore: number | null
    jobStatus: boolean
    jobLocation: string | null
    jobTitle: string | null,
    jobTime: string | null
}
type technicalExpertiseType = {
    name: string
    lvl: string
    desc: string
    url: string
}
type EducationType = {
    lvl: string
    major: string
    university: string
}
export type { CompanyEmploymentType, ExpertType }