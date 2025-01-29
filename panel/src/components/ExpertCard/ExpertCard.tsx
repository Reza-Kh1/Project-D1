import { FaCheck, FaStar } from 'react-icons/fa'
import ImageCustom from '../ImageCustom/ImageCustom'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { jobContactCompany } from '../../types/typeCompany'
import { Fragment } from 'react'
type ExpertCardType = {
    data: jobContactCompany,
    lastExpert?: boolean,
    jobId: number
    setOpen?: (value: boolean) => void
    acceptCompany?: (value: number) => void
    setOpenDis?: (value: boolean) => void
    setDataExpert: (value: jobContactCompany) => void
    getSingleData?: (value: string) => void
}
export default function ExpertCard({ data, lastExpert, getSingleData, jobId, setOpen, setDataExpert, setOpenDis, acceptCompany }: ExpertCardType) {
    return (
        <section className='bg-gradient-to-t to-slate-200 from-gray-300 shadow-md rounded-md p-3'>
            <div className='flex items-center gap-2 justify-between'>
                <button onClick={() => {
                    if (setOpen) {
                        setOpen(true)
                    }
                    setDataExpert(data)
                }} type='button' className='hover:text-blue-500 text-gray-700 bg-gray-50/90 shadow-md p-2 rounded-md'>
                    <span className='font-semibold'>{data.expert?.name}</span>
                </button>
                <div className='text-gray-700 font-semibold bg-gray-50/90 shadow-md p-2 text-xs rounded-md flex gap-1'>
                    {!data?.expert?.DetailScore?.score ? <>
                        <FaStar color='#FFD700' />
                        <span>ثبت نشده</span>
                    </> :
                        <Fragment key={2}>
                            <div className='flex gap-1'>
                                {Array.from({ length: Number(data?.expert?.DetailScore?.score) }, (_, index) => {
                                    return (
                                        <FaStar key={index} color='#FFD700' />
                                    );
                                })}
                            </div>
                            {data?.expert?.DetailScore?.score + " "}({data?.expert?.DetailScore?.totalScore})
                        </Fragment>
                    }
                </div>
            </div>
            <div className='flex flex-col justify-between gap-3 mt-3'>
                <ImageCustom src={data.expert?.image?.length ? data.expert?.image : "/user.jpg"} alt='پروفایل' className='w-48 h-48 object-cover shadow-md table mx-auto rounded-full' width={250} height={250} />
                <p>
                    محل سکونت : {data.expert?.city}
                </p>
                <p>سن : {data.expert?.age}</p>
                {!lastExpert && <>
                    <p className='font-semibold'>تخصص :</p>
                    <div className='flex flex-col gap-1'>
                        {data?.expert?.expertises?.map((i, index) => {
                            if (index + 1 > 4) return
                            return <span key={index}>{index + 1}_ {i.name}</span>
                        })}
                    </div>
                </>}
                <button type='button' onClick={() => {
                    if (getSingleData) {
                        getSingleData(data.expert.id)
                    }
                    if (setOpen) {
                        setOpen(true)
                    }
                    setDataExpert(data)
                }} className='text-right hover:underline text-lg'>
                    نمایش جزئیات...
                </button>
                <div className='flex items-center justify-between'>
                    {lastExpert ?
                        !data.approvedCompany ?
                            <span className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-red-600 hover:bg-red-500/80 hover:text-gray-50 shadow-md'>
                                رد شده
                                <MdClose />
                            </span>
                            : <span className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-green-600 hover:bg-green-500/80 hover:text-gray-50 shadow-md'>
                                تایید شده
                                <FaCheck />
                            </span>
                        :
                        <>
                            <Link to={"/company/chat"} onClick={() => {
                                setDataExpert(data)
                                if (acceptCompany) {
                                    acceptCompany(jobId)
                                }
                            }} className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-green-600 hover:bg-green-500/80 hover:text-gray-50 shadow-md'>
                                تایید
                                <FaCheck />
                            </Link>
                            <button onClick={() => {
                                if (setOpenDis) {
                                    setOpenDis(true)
                                }
                                setDataExpert(data)
                            }} type='button' className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-red-600 hover:bg-red-500/80 hover:text-gray-50 shadow-md'>
                                عدم تایید
                                <MdClose />
                            </button>
                        </>
                    }
                </div>
            </div>
        </section >
    )
}