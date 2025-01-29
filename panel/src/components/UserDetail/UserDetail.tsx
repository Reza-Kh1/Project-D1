import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import { ExpertType } from '../../types/typeExpert'
import { Link } from 'react-router-dom'
import { IoEye } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'
type UserDetailType = {
    detailState?: ExpertType
}
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
export default function UserDetail({ detailState }: UserDetailType) {
    if (!detailState) return
    const BoxDetail = ({ title, children }: { title: string, children: React.ReactNode }) => {
        return <div className='rounded-lg shadow-boxDetail'>
            <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-lg p-3'>{title}</p>
            <span className='flex text-gray-700 items-center gap-1 p-3'>{children}</span>
        </div>
    }
    return (
        <>
            <BoxDetail title={"امتیاز متخصص :"} children={
                detailState.DetailScore?.score ?
                    <React.Fragment key={2}>
                        {Array.from({ length: Number(detailState.DetailScore?.score) }, (_, index) => { return <FaStar key={index} className='text-yellow-400 mb-1' /> })}
                        {detailState.DetailScore?.score}  ({detailState?.DetailScore?.totalScore})
                    </React.Fragment>
                    :

                    <span>امتیازی ثبت نشده.</span>
            } />
            <BoxDetail children={detailState?.age} title='سن :' />
            <BoxDetail children={detailState?.province} title='استان :' />
            <BoxDetail children={detailState?.city} title='شهر :' />
            <BoxDetail children={detailState?.gender} title='جنسیت :' />
            {detailState.expertises?.length ?
                <div className='col-span-4'>
                    <p className='text-lg'>تخصص های فناورانه :</p>
                    <div className='flex flex-col gap-3 mt-3'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>نام تخصص</StyledTableCell>
                                        <StyledTableCell>میزان خبرگی</StyledTableCell>
                                        <StyledTableCell>مستندات بارگزاری شده</StyledTableCell>
                                        <StyledTableCell>توضیحات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailState.expertises?.map((i, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{i.name}</TableCell>
                                            <TableCell>{i.lvl}</TableCell>
                                            <TableCell>
                                                {i.file ?
                                                    <Link to={i.file} target='_blank' className='flex bg-blue-400 text-white rounded-md p-2 shadow-md justify-center text-center w-1/2 items-center gap-2'>نمایش فایل <IoEye size={20} /></Link>
                                                    : <span className='flex bg-red-300 text-white rounded-md p-2 justify-center text-center w-1/2 items-center gap-2'>ثبت نشده <MdClose size={20} /></span>
                                                }
                                            </TableCell>
                                            <TableCell>{i.desc}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                : null}
            {detailState.education?.length ?
                <div className='col-span-3'>
                    <p className='text-lg'>اطلاعات تحصیلی :</p>
                    <div className='flex flex-col gap-3 mt-3'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>مقطع تحصیلی</StyledTableCell>
                                        <StyledTableCell>انتخاب رشته</StyledTableCell>
                                        <StyledTableCell>دانشگاه</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailState.education?.map((i, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{i.education}</TableCell>
                                            <TableCell>{i.major}</TableCell>
                                            <TableCell>{i.university}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                : null}
            {detailState?.software?.length ?
                <div className='col-span-3'>
                    <p className='text-lg'>مهارت های نرم افزاری :</p>
                    <div className='flex flex-col gap-3 mt-3'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>نرم افزار</StyledTableCell>
                                        <StyledTableCell>میزان خبرگی</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailState.software?.map((i, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{i.name}</TableCell>
                                            <TableCell>{i.lvl}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                : null}
            <div className='col-span-5'>
                <p className='text-lg mb-3'>متخصص در حال حاضر مشغول به <span className='underline'>{detailState.jobStatus ? "فعالیت میباشد" : "فعالیت نمی باشد"}</span>.</p>
                {detailState.jobStatus ?
                    <div className='grid grid-cols-5 gap-5'>
                        <BoxDetail children={detailState?.jobLocation} title='محل اشتغال (نام شرکت) :' />
                        <BoxDetail children={detailState?.jobTitle} title='سمت شغلی :' />
                        <BoxDetail children={detailState?.jobTime} title='مدت زمان اشتغال  :' />
                    </div>
                    : null}
            </div>
        </>
    )
}
