import React, { Fragment } from 'react'
import { FaStar } from 'react-icons/fa'
import { EmploymentType, WorkingTimeType } from '../../types/typeCompany'
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f3f4f6",
        color: "#525b69",
        fontWeight: 600,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function CompanyDetail({ detailState, approvedCompany }: { detailState?: EmploymentType, approvedCompany: boolean | undefined }) {
    const BoxDetail = ({ title, children }: { title: string, children: React.ReactNode }) => {
        return <div className='rounded-md shadow-boxDetail'>
            <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-md p-3'>{title}</p>
            <span className='flex text-gray-700 items-center gap-1 p-3'>{children}</span>
        </div>
    }
    return (
        <>
            <BoxDetail children={detailState?.company.lvl} title='سطح شرکت :' />
            <BoxDetail children={
                !detailState?.company.DetailScore?.score ? <>
                    <FaStar color='#FFD700' />
                    <span>ثبت نشده</span>
                </> :
                    <Fragment key={2}>
                        <div className='flex gap-1'>
                            {Array.from({ length: Number(detailState?.company?.DetailScore?.score) }, (_, index) => {
                                return (
                                    <FaStar key={index} color='#FFD700' />
                                );
                            })}
                        </div>
                        {detailState?.company?.DetailScore?.score + " "}({detailState?.company?.DetailScore?.totalScore})
                    </Fragment>
            } title='امتیاز شرکت :' />
            <BoxDetail children={detailState?.company.companyField} title='حوزه فعالیت شرکت :' />
            {approvedCompany !== null && <BoxDetail children={approvedCompany ? "تایید شدید" : "رد شدید"} title='رای شرکت به استخدام شما:' />}
            <BoxDetail children={detailState?.company.employeeCount} title='تعداد پرسنل شرکت:' />
            <BoxDetail children={detailState?.nameExpertise} title='تخصص مورد نیاز:' />
            <BoxDetail children={detailState?.lvl} title='میزان خبرگی متخصص:' />
            <BoxDetail children={detailState?.gender} title='جنسیت متخصص:' />
            <BoxDetail children={detailState?.price} title='نحوه پرداخت :' />
            <BoxDetail children={detailState?.teamWork ? "به صورت انفرادی" : "به عنوان عضو بک تیم"} title='نحوه فعالیت در سازمان :' />
            <BoxDetail children={`${detailState?.age}`} title='بازه سنی :' />
            <BoxDetail children={new Date(detailState?.startProject || "").toLocaleDateString("fa")} title='تاریخ تقریبی آغاز پروژه :' />
            <BoxDetail children={detailState?.takeTask ? "در شرکت فرد خبره ی مسلط به فناوری های اشاره شده وجود دارد که خروجی وظایف انجام شده را از شما تحویل میگیرد." : "در شرکت فرد خبره مسلط به فناوری های اشاره شده برای دریافت خروجی از شما وجود ندارد ."} title='گزارش کار :' />
            <BoxDetail children={detailState?.remote ? "دورکاری" : "حضور در شرکت"} title='همکاری به چه صورت است:' />
            {
                detailState?.remote ?
                    <BoxDetail children={detailState?.descRemote as string} title='توضیحات شرایط به صورت دورکاری :' />
                    :
                    <div className='col-span-4'>
                        <p className='text-lg'>توضیحات شرایط همکاری به صورت حضوری :</p>
                        <div className='flex w-9/12 flex-col pl-2 mt-3'>
                            {detailState?.descRemote as WorkingTimeType[] ?
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead >
                                            <TableRow>
                                                <StyledTableCell>روزهای هفته</StyledTableCell>
                                                <StyledTableCell>ساعت شروع کار</StyledTableCell>
                                                <StyledTableCell>ساعت پایان کار</StyledTableCell>
                                                <StyledTableCell>توضیحات مربوطه</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(detailState?.descRemote as WorkingTimeType[]).map((i, index) => {
                                                if (!i.active) return
                                                return <TableRow key={index}>
                                                    <TableCell>{i.day}</TableCell>
                                                    <TableCell>{new Date(i.stratTime as Date).toLocaleDateString("fa")}</TableCell>
                                                    <TableCell>{new Date(i.endTime as Date).toLocaleDateString("fa")}</TableCell>
                                                    <TableCell>{i.desc}</TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                : null}
                        </div>
                    </div>
            }
            <div className='col-span-4'>
                <p className='text-lg'>مهارت های نرم افزاری :</p>
                <div className='flex w-1/2 flex-col pl-2 mt-3'>
                    {detailState?.Software?.length ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>نرم افزار</StyledTableCell>
                                        <StyledTableCell>میزان خبرگی</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailState?.Software.map((i, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{i.name}</TableCell>
                                            <TableCell>{i.lvl}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : null}
                </div>
            </div>
            <div className='col-span-2'>
                <BoxDetail children={detailState?.desc} title='توضیحات :' />
            </div>
        </>
    )
}
