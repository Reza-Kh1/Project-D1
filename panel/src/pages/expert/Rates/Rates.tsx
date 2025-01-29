import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import ImageCustom from '../../../components/ImageCustom/ImageCustom'
import { FaHistory, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import BoxRate from '../../../components/BoxRate/BoxRate';
import LackOfCoperation from '../../../components/LackOfCoperation/LackOfCoperation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { JobContactType } from '../../../types/typeExpert';
import { toast } from 'react-toastify';
import { fetchRateExpert } from '../../../services/expert/rate';
import CompanyDetail from '../../../components/CompanyDetail/CompanyDetail';
import PendingApi from '../../../components/PendingApi/PendingApi';
export default function RatesCompany() {
    const profileId = JSON.parse(localStorage.getItem("sitetest") || "").id
    const [lastScore, setLastScore] = useState<boolean>(false)
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false)
    const [openDis, setOpenDis] = useState<boolean>(false)
    const [isData, setIsData] = useState<boolean>(false)
    const [infoExpert, setInfoExpert] = useState<JobContactType>()
    const { data } = useQuery<{ data: JobContactType[] }>({
        queryKey: ["RatePage", lastScore],
        queryFn: () => fetchRateExpert(lastScore),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const { isPending: isPendingScore, mutate: submitScore } = useMutation({
        mutationFn: ({ score, msg, text }: { score: number; msg: { name: string, type: boolean }[], text: string }) => {
            const body = {
                jobContactId: infoExpert?.id,
                companyId: infoExpert?.companyId,
                expertId: profileId,
                scoreType: "Expert",
                score: score,
                msg: text,
                context: msg,
            }
            return axios.post(`score`, body)
        },
        onSuccess: () => {
            toast.success(".امتیاز ثبت شد");
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["RatePage"] });
            queryClient.invalidateQueries({ queryKey: ["AllChatExpert"] });

        },
        onError: (err: any) => {
            setOpen(false)
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    const { isPending, mutate: cancelExpert } = useMutation({
        mutationFn: ({ text, msg }: { text: string; msg: string[] }) => {
            const body = {
                approvedExpert: false,
                message: text,
                isDelete: true,
                detailMessage: msg,
            }
            return axios.put(`jobContact/${infoExpert?.id}`, body)
        },
        onSuccess: () => {
            setOpen(false)
            setOpenDis(false)
            queryClient.invalidateQueries({ queryKey: ["RatePage"] });
        },
        onError: (err: any) => {
            setOpen(false)
            setOpenDis(true)
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    return (
        <>
            {(isPending || isPendingScore) && <PendingApi />}
            <div className='flex justify-between'>
                <h1 className='text-lg font-semibold block'>لیست شرکت ها</h1>
                <div className='flex items-center gap-5'>
                    <Button endIcon={<FaStar />} onClick={() => setLastScore(false)} variant={!lastScore ? "contained" : "outlined"} color='primary'>
                        امتیاز به شرکت
                    </Button>
                    <Button endIcon={<FaHistory />} onClick={() => setLastScore(true)} variant={lastScore ? "contained" : "outlined"} color='primary'>
                        تاریخچه امتیازات
                    </Button>
                </div>
            </div>
            {lastScore ?
                <div className='grid grid-cols-4 gap-3 my-6'>
                    {data?.data.map((item, index) => (
                        <section key={index} className='bg-gradient-to-t p-3 to-gray-200/70 rounded-md shadow-md from-slate-200 flex flex-col gap-3'>
                            <ImageCustom alt={"/company.png"} className='w-24 h-24 mx-auto rounded-full object-cover shadow-md' src={"/company.png"} width={70} height={70} />
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold'>{item.company.name}</span>
                                {!item.company.DetailScore?.totalScore ? <span><FaStar className='text-yellow-400 inline ' /> ثبت نشده</span> :
                                    <span className='font-semibold'>{item.company.DetailScore?.score} <FaStar className='text-yellow-400 inline ' /> ({item.company.DetailScore?.totalScore})</span>
                                }
                            </div>
                            <button className='hover:underline text-lg text-right' onClick={() => { setOpen(true), setInfoExpert(item), setIsData(true) }} type='button'>
                                جزئیات بیشتر...
                            </button>
                            <div className='text-center'>
                                <span>مشغول به همکاری شدید ؟</span>
                                <button onClick={() => { setOpen(true), setInfoExpert(item), setIsData(false) }} type='button' className='bg-gray-50 hover:bg-blue-100 p-2 rounded-md shadow-sm w-12 mr-2'>
                                    بله
                                </button>
                                <button onClick={() => { setOpenDis(true), setInfoExpert(item) }} type='button' className='bg-gray-50 hover:bg-blue-100 p-2 rounded-md shadow-sm w-12 mr-2'>
                                    خیر
                                </button>
                            </div>
                        </section >
                    ))}
                </div>
                :
                <div className='grid grid-cols-4 gap-3 my-6'>
                    {data?.data.map((item, index) => (
                        <section key={index} className='bg-gradient-to-t p-3 to-gray-200/70 rounded-md shadow-md from-slate-200 flex flex-col gap-3'>
                            <ImageCustom alt={"/company.png"} className='w-24 h-24 mx-auto rounded-full object-cover shadow-md' src={"/company.png"} width={70} height={70} />
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold'>{item.employment.company.name}</span>
                                {!item.employment.company.DetailScore?.totalScore ? <span><FaStar className='text-yellow-400 inline ' /> ثبت نشده</span> :
                                    <span className='font-semibold'>{item.employment.company.DetailScore?.score} <FaStar className='text-yellow-400 inline ' /> ({item.employment.company.DetailScore?.totalScore})</span>
                                }
                            </div>
                            <button className='hover:underline text-lg text-right' onClick={() => { setOpen(true), setInfoExpert(item), setIsData(true) }} type='button'>
                                جزئیات بیشتر...
                            </button>
                            <div className='text-center'>
                                <span>مشغول به همکاری شدید ؟</span>
                                <button onClick={() => { setOpen(true), setInfoExpert(item), setIsData(false) }} type='button' className='bg-gray-50 hover:bg-blue-100 p-2 rounded-md shadow-sm w-12 mr-2'>
                                    بله
                                </button>
                                <button onClick={() => { setOpenDis(true), setInfoExpert(item) }} type='button' className='bg-gray-50 hover:bg-blue-100 p-2 rounded-md shadow-sm w-12 mr-2'>
                                    خیر
                                </button>
                            </div>
                        </section >
                    ))}
                </div>
            }

            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='flex justify-between items-center w-full'>
                        {infoExpert?.employment?.company?.name || infoExpert?.company.name}
                        <IconButton onClick={() => setOpen(false)}>
                            <MdClose />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {lastScore ?
                        <div className='col-span-5 grid grid-cols-5 gap-5'>
                            <div className='rounded-md shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-md p-3'>سطح شرکت</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{infoExpert?.company?.name}</span>
                            </div>
                            <div className='rounded-md shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-md p-3'>امتیاز شرکت :</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>
                                    <FaStar className='text-yellow-400 mb-1' />
                                    {infoExpert?.company?.DetailScore?.score}{" "}({infoExpert?.company?.DetailScore?.totalScore})</span>
                            </div>
                            <div className='rounded-md shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-md p-3'>تعداد پرسنل شرکت:</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{infoExpert?.company?.employeeCount}</span>
                            </div>
                            <div className='rounded-md shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-md p-3'>حوزه فعالیت شرکت:</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{infoExpert?.company?.companyField}</span>
                            </div>
                            <div className='rounded-lg shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-lg p-3'>امتیازی شما به متخصص :</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{infoExpert?.score}</span>
                            </div>
                            <div className='rounded-lg shadow-boxDetail col-span-4'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-lg p-3'>متن همراه امتیاز :</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{infoExpert?.msg || "ثبت نشده."}</span>
                            </div>
                            <div className='rounded-lg shadow-boxDetail col-span-5'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-lg p-3'>نقات قوت انتخاب شده :</p>
                                <div className='grid grid-cols-4 gap-4 p-4'>
                                    {infoExpert?.context?.map((row, index) => {
                                        if (!row.type) return
                                        return <span key={index} className='bg-gradient-to-r text-center p-3 rounded-xl !to-gray-300 !from-blue-300 !text-gray-800 !shadow-md'>
                                            {row.name}
                                        </span>
                                    })}
                                </div>
                            </div>
                            <div className='rounded-lg shadow-boxDetail col-span-5'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-lg p-3'>نقات ضعف انتخاب شده :</p>
                                <div className='grid grid-cols-4 gap-4 p-4'>
                                    {infoExpert?.context?.map((row, index) => {
                                        if (!row.type) return
                                        return <span key={index} className='bg-gradient-to-r text-center p-3 rounded-xl !to-gray-200 !from-red-400 !text-gray-700 !shadow-md'>
                                            {row.name}
                                        </span>
                                    })}
                                </div>
                            </div>
                        </div>
                        : isData ?
                            <div className='grid grid-cols-5 gap-5'>
                                <CompanyDetail detailState={infoExpert?.employment} />
                            </div>
                            :
                            <>
                                <p className='mt-6 font-semibold'>امتیاز خود را ثبت کنید .</p>
                                <BoxRate onClick={(val1, val2, val3) => submitScore({ score: val1, msg: val2, text: val3 })} />
                            </>
                    }
                </DialogContent>
                <DialogActions>
                    <div className='flex items-center justify-between w-full'>
                        <Button variant='contained' color='error' onClick={() => setOpen(false)}>
                            بستن
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
            {!lastScore ?
                <LackOfCoperation
                    cancelBtn={(val, value) => {
                        cancelExpert({ text: val, msg: value });
                    }}
                    name={infoExpert?.employment?.company?.name || ""} open={openDis} setOpen={setOpenDis} />
                : null}
        </>
    )
}
