import { FaStar } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
import { EmploymentType } from '../../types/typeCompany'
import { JobContactType } from '../../types/typeExpert'
import { Fragment } from 'react/jsx-runtime'
type CompanyBoxType = {
    setDetail: (value: JobContactType) => void
    data: EmploymentType
    acceptBtn: (value: number) => void
    cancelBtn: (value: number) => void
    onOpen: (value: boolean) => void
    dataJob: JobContactType
    isLast?: boolean
}
export default function CompanyCard({ onOpen, setDetail, data, acceptBtn, cancelBtn, dataJob, isLast }: CompanyBoxType) {
    return (
        <div className='shadow-md bg-gradient-to-t to-slate-200 flex flex-col justify-between from-gray-300 rounded-md p-3'>
            <div className='flex gap-1 justify-between items-center mb-4 bg-slate-50 shadow-md rounded-md p-2'>
                <h2 className='font-semibold cutline cutline-1 text-center'>
                    {data?.company.name}
                </h2>
                <div className='flex gap-1 items-center text-xs'>
                    {!data?.company.DetailScore?.score ? <>
                        <FaStar color='#FFD700' />
                        <span>ثبت نشده</span>
                    </> :
                        <Fragment key={2}>
                            <div className='flex gap-1'>
                                {Array.from({ length: Number(data?.company?.DetailScore?.score) }, (_, index) => {
                                    return (
                                        <FaStar key={index} color='#FFD700' />
                                    );
                                })}
                            </div>
                            {data?.company?.DetailScore?.score + " "}({data?.company?.DetailScore?.totalScore})
                        </Fragment>
                    }
                </div>
            </div>
            <div className='flex text-gray-700 flex-col gap-1 my-4'>
                {data.Software.length ?
                    <span className='cutline cutline-1'>
                        <span className='inline'>
                            نرم افزار :
                        </span>
                        <p className='mr-2 text-gray-700 mt-2 inline'>{data.Software.map((item, index) => (
                            <span key={index} >{item.name}
                                {data.Software.length > index + 1 ? " , " : ""}
                            </span>
                        ))}</p>
                    </span>
                    : null}
                <span className='cutline cutline-1'>تخصص مورد نیاز : {data?.nameExpertise}</span>
                <span className='cutline cutline-1'>سطح شرکت : {data?.company.lvl}</span>
                <span className='cutline cutline-1'>حوزه فعالیت شرکت : {data.company.companyField}</span>
            </div>
            <p className='text-justify text-gray-700 leading-7 cutline cutline-4 text-sm'>
                {data?.desc}
            </p>
            <button type='button' onClick={() => {
                onOpen(true)
                setDetail(dataJob)
            }} className='text-gray-950 text-right hover:underline mb-4 mt-2'>
                نمایش جزئیات...
            </button>
            <div className='flex items-center justify-between'>
                {isLast === true || isLast === false ?
                    <span className={`flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white ${isLast ? "text-green-600 hover:bg-green-500/80" : "text-red-600 hover:bg-red-500/80"} hover:text-gray-50 shadow-md`}>
                        {isLast ? "تایید" : "عدم تایید"}
                        {isLast ? <FaCheck /> : <MdClose />}
                    </span> :
                    <>
                        <button type='button' onClick={() => acceptBtn(dataJob.id)} className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-green-600 hover:bg-green-500/80 hover:text-gray-50 shadow-md'>
                            تایید
                            <FaCheck />
                        </button>
                        <button type='button' onClick={() => {
                            cancelBtn(dataJob.id)
                            setDetail(dataJob)
                        }} className='flex items-center px-3 gap-1 py-2 justify-evenly min-w-24 rounded-md bg-white text-red-600 hover:bg-red-500/80 hover:text-gray-50 shadow-md'>
                            عدم تایید
                            <MdClose />
                        </button>
                    </>}

            </div>
        </div>
    )
}
