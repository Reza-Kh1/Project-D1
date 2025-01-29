import { useEffect, useState } from 'react'
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa'
import InputeCustom from '../../../components/InputeCustom/InputeCustom'
import { Autocomplete, IconButton, MenuItem, OutlinedInput, Select, TextField, Tooltip } from '@mui/material'
import { BsInfoCircle } from 'react-icons/bs'
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom'
import { MdDataSaverOn } from 'react-icons/md'
import Calendar from '../../../components/Calendar/Calendar'
import techSkills from '../../../data/techSkills'
import FormSoftware from '../../../components/FormSoftware/FormSoftware'
import { EmploymentType, WorkingTimeType } from '../../../types/typeCompany'
import WorkingTime from './WorkingTime'
import { SoftwareType } from '../../../types/typeExpert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import PendingApi from '../../../components/PendingApi/PendingApi'

export default function EmploymentCompany({ data }: { data?: EmploymentType }) {
  const queryClient = useQueryClient();
  const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
  const { register, handleSubmit, watch, setValue, getValues } = useForm<EmploymentType>();
  const [workingTime, setWorkingTime] = useState<WorkingTimeType[]>([])
  const [software, setSoftware] = useState<SoftwareType[]>([])
  const [date, setDate] = useState<Date>()
  const lvl = watch("lvl")
  const gender = watch("gender")
  const price = watch("price")
  const teamWork = watch("teamWork")
  const age = watch("age")
  const takeTask = watch("takeTask")
  const remote = watch("remote")
  const { isPending: isPendingPost1, mutate: actionHandler } = useMutation({
    mutationFn: async (formData: EmploymentType) => {
      const body = {
        ...formData,
        software: software,
        descRemote: getValues("descRemote") || workingTime,
        companyId: idProfile
      } as any
      if (date) {
        body.startProject = new Date(date).toISOString()
      }
      if (data) {
        return axios.put(`employment/${data.id}`, body);
      } else {
        return axios.post(`employment`, body);
      }
    },
    onSuccess: () => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["singlePloyment", Number(data.id)] });
      }
      queryClient.invalidateQueries({ queryKey: ["GetAllEmployment"] });
      toast.success(".درخواست شما ثبت شد");
    },
    onError: (err: any) => {
      toast.warning("با خطا مواجه شدیم");
      console.log(err);
    },
  });
  const syncData = () => {
    if (!data) return
    setValue("age", data?.age)
    setValue("desc", data?.desc || "")
    setValue("gender", data?.gender || "s")
    setValue("lvl", data?.lvl || "s")
    setValue("nameExpertise", data?.nameExpertise || "")
    setValue("price", data?.price || "s")
    setValue("remote", data?.remote)
    setValue("startProject", data?.startProject || "")
    setValue("takeTask", data?.takeTask || false)
    setValue("teamWork", data?.teamWork || false)
    if (!data.remote) {
      setWorkingTime(data.descRemote as WorkingTimeType[])
    } else {
      setValue("descRemote", data.descRemote)
    }
    setDate(data.startProject || "")
    setSoftware(data.Software || [])
  }
  useEffect(() => {
    syncData()
  }, [data])
  return (
    <>
      {isPendingPost1 && <PendingApi />}
      {data ?
        <h1 className='text-md font-semibold block mb-6'>
          فرم درخواست خود را ویرایش کنید.
        </h1>
        :
        <h1 className='text-md font-semibold block mb-6'>
          فرم درخواست خود را ثبت کنید.
        </h1>
      }
      <form onSubmit={handleSubmit(data => actionHandler(data))}>
        <div className='grid grid-cols-4 gap-5 items-end justify-center'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>تخصص مورد نیاز خود را انتخاب کنید :</span>
            <Autocomplete
              onChange={(_, newValue: string | null) => {
                setValue("nameExpertise", newValue || "");
              }}
              value={getValues("nameExpertise") || ""}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              disablePortal
              options={techSkills}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>میزان خبرگی فرد مورد نیاز :</span>
            <Select
              onChange={({ target }) => {
                setValue("lvl", target.value)
              }}
              value={lvl || "s"}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
              <MenuItem value={"کم"}>
                <Tooltip placement='left' title="مبتدی یا تازه کار">
                  <span>
                    کم
                  </span>
                </Tooltip>
              </MenuItem>
              <MenuItem value={"متوسط"}>
                <Tooltip placement='left' title="میان رده یا نیمه حرفه ای">
                  <span>متوسط</span>
                </Tooltip>
              </MenuItem>
              <MenuItem value={"زیاد"}>
                <Tooltip placement='left' title="ارشد یا حرفه ای">
                  <span>زیاد</span>
                </Tooltip>
              </MenuItem>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>جنسیت :</span>
            <Select
              onChange={({ target }) => {
                setValue("gender", target.value)
              }}
              value={gender || "s"}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
              <MenuItem value={"ALL"}>تفاوتی ندارد</MenuItem>
              <MenuItem value={"MAN"}>مرد</MenuItem>
              <MenuItem value={"WOMAN"}>زن</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>نحوه پرداخت حق الزحمه :</span>
            <Select
              onChange={({ target }) => {
                setValue("price", target.value)
              }}
              value={price || "s"}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
              <MenuItem value={"براساس پیشرفت پروژه"}>براساس پیشرفت پروژه</MenuItem>
              <MenuItem value={"پس از اتمام پروژه"}>پس از اتمام پروژه</MenuItem>
              <MenuItem value={"حقوق ثابت ماهانه"}>حقوق ثابت ماهانه</MenuItem>
              <MenuItem value={"حقوق ساعتی"}>حقوق ساعتی</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>نحوه فعالیت در سازمان :</span>
            <Select
              onChange={({ target }) => {
                setValue("teamWork", target.value === "true" ? true : false)
              }}
              value={teamWork}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
              <MenuItem value={"false"}>به صورت انفرادی</MenuItem>
              <MenuItem value={"true"}>به عنوان عضو یک تیم</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>بازه سنی متخصص :</span>
            <Select
              onChange={({ target }) => {
                setValue("age", target.value)
              }}
              value={age || "s"}
              className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
              <MenuItem value={"20 الی 30 "}>20 الی 30 </MenuItem>
              <MenuItem value={"30 الی 40 "}>30 الی 40 </MenuItem>
              <MenuItem value={"40 الی 50 "}>40 الی 50 </MenuItem>
              <MenuItem value={"50 الی 60 "}>50 الی 60 </MenuItem>
              <MenuItem value={"60 به بالا"}>60 به بالا</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col gap-2 max-w-[275px]'>
            <span className='text-sm'>زمان تقریبی آغاز پروژه :</span>
            <Calendar date={date} setDate={setDate} />
          </div>
        </div>
        <div className='my-6'>
          <FormSoftware isEmployment={data?.id} selectSoftware={software} setSelectSoftware={setSoftware} />
        </div>
        <div className='flex flex-col mt-8 gap-2'>
          <span> آیا در شرکت شما فرد خبره ی مسلط به فناوری مورد نیاز وجود دارد که خروجی وظایف انجام شده را از فرد متقاضی تحویل بگیرد؟</span>
          <div className='flex gap-3 mt-2 items-end'>
            <button onClick={() => setValue("takeTask", true)} className={`p-3 min-w-[105px] bg-slate-200 rounded-md shadow-md border text-right flex items-center gap-2 ${takeTask ? "shadow-blue-300" : ""}`} type='button'>
              {takeTask === true ?
                <FaRegDotCircle className='text-blue-700' />
                :
                <FaRegCircle />
              }
              بله
            </button>
            <button onClick={() => setValue("takeTask", false)} className={`p-3 min-w-[105px] bg-slate-200  rounded-md shadow-md border text-right flex items-center gap-2 ${takeTask === false ? "shadow-blue-300" : ""}`} type='button'>
              {takeTask === false ?
                <FaRegDotCircle className='text-blue-700' />
                :
                <FaRegCircle />
              }
              خیر
            </button>
          </div>
        </div>
        <div className='mt-8'>
          <span> آیا نیاز به حضور فرد متقاضی در شرکت می باشد؟</span>
          <div className='flex gap-3 mt-4 items-end'>
            <button onClick={() => {
              setValue("remote", false)
              setValue("descRemote", "")
              setWorkingTime([])
            }} className={`p-3 min-w-[105px] bg-slate-200 rounded-md shadow-md border text-right flex items-center gap-2 ${remote === false ? "shadow-blue-300" : ""}`} type='button'>
              {remote === false ?
                <FaRegDotCircle className='text-blue-700' />
                :
                <FaRegCircle />
              }
              بله
            </button>
            <button onClick={() => {
              setValue("remote", true)
              setValue("descRemote", "")
              setWorkingTime([])
            }} className={`p-3 min-w-[105px] bg-slate-200  rounded-md shadow-md border text-right flex items-center gap-2 ${remote ? "shadow-blue-300" : ""}`} type='button'>
              {remote === true ?
                <FaRegDotCircle className='text-blue-700' />
                :
                <FaRegCircle />
              }
              خیر
            </button>
          </div>
          {remote === false ?
            <WorkingTime setTime={setWorkingTime} time={workingTime} />
            :
            <div className='flex w-1/2 pl-2 mt-3 items-center gap-2'>
              <InputeCustom register={register("descRemote")} name='desc' className='max-w-full' placeholder='توضیحات' />
              <Tooltip title={"به صورت دورکاری انجام میشود-جلسات مجازی..."}>
                <IconButton>
                  <BsInfoCircle size={20} />
                </IconButton>
              </Tooltip>
            </div>
          }
        </div>
        <div className='gap-5 grid grid-cols-4 mt-8'>
          <InputeCustom type='textarea' register={register("desc")} row={2} name='description' className='max-w-full' classDiv='col-span-2' label='توضیحات :' />
        </div>
        <div className='w-1/5 mb-8'>
          <ButtonCustom type='submit' className='bg-grid mt-8' text='ذخیره کردن اطلاعات' iconEnd={<MdDataSaverOn className='text-xl' />} />
        </div>
      </form>
    </>
  )
}
