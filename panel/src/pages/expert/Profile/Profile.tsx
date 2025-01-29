import { useEffect, useState } from 'react'
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { MdDataSaverOn } from 'react-icons/md';
import InputeCustom from '../../../components/InputeCustom/InputeCustom';
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom';
import { Autocomplete, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { city, province } from '../../../data/city';
import FormSoftware from '../../../components/FormSoftware/FormSoftware';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfileUser } from '../../../services/expert/profile';
import { useForm } from 'react-hook-form';
import UploadImage from '../../../components/UploadImage/UploadImage';
import FormEducation from '../../../components/FormEducation/FormEducation';
import { EducationType, ExpertisesType, SoftwareType, ExpertType } from '../../../types/typeExpert';
import FormExpertises from '../../../components/FormExpertises/FormExpertises';
import PendingApi from '../../../components/PendingApi/PendingApi';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function ProfileUser() {
    const { data } = useQuery<ExpertType>({
        queryKey: ["profile"],
        queryFn: fetchProfileUser,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const queryClient = useQueryClient();
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { register, handleSubmit, setValue, watch, getValues } = useForm<ExpertType>()
    const [uploadImg, setUploadImg] = useState<string>("")
    const [software, setSoftware] = useState<SoftwareType[]>([])
    const [expertises, setExpertises] = useState<ExpertisesType[]>([])
    const [education, setEducation] = useState<EducationType[]>([])
    const [cityValue, setCityValue] = useState<string>("")
    const gender = watch("gender")
    const provinceForm = watch("province")
    const jobStatus = watch("jobStatus")
    const { isPending: isPendingPost1, mutate: updateData } = useMutation({
        mutationFn: async (formData: ExpertType) => {
            const body = {
                ...formData,
                image: uploadImg,
                expertises,
                education,
                software,
                city: cityValue
            }
            if (!expertises.length || !education.length || !software.length) {
                toast.warning(".تمامیه فیلدهای موجود را پر کنید");
                return
            }
            return axios.put(`expert/${idProfile}`, body);
        },
        onSuccess: ({ data }: any) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            if (data.isStatus && data.name && data.id) {
                const option = {
                    phone: data.phone,
                    id: data.id,
                    name: data.name,
                    type: "expert",
                    isStatus: data.isStatus,
                }
                localStorage.setItem("sitetest", JSON.stringify(option))
            }
            toast.success("حساب کاربری ویرایش شد.");
        },
        onError: (err: any) => {
            console.log(err);
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    const syncData = () => {
        if (!data) return
        setUploadImg(data?.image || "")        
        setCityValue(data.city || "")
        setValue("age", data?.age)
        // setValue("city", data?.city || "")
        setValue("province", data?.province || "")
        setValue("gender", data?.gender)
        setValue("name", data?.name || "")
        setValue("phone", data?.phone || "")
        setValue("jobTime", data?.jobTime || "")
        setValue("jobLocation", data?.jobLocation || "")
        setValue("jobStatus", data?.jobStatus || false)
        setValue("jobTitle", data?.jobTitle || "")
        const ed = data?.education?.length ? data?.education : [{
            major: "",
            university: "",
            education: "",
            userId: idProfile,
            id: Math.floor(Math.random() * 1000)
        }]
        setEducation(ed)
        const exper = data?.expertises?.length ? data?.expertises : [{
            name: "",
            file: "",
            lvl: "",
            desc: "",
            userId: idProfile,
            id: Math.floor(Math.random() * 1000)
        }]
        setExpertises(exper)
        setSoftware(data.software)
    }
    useEffect(() => {
        syncData()
    }, [data])
    return (
        <form onSubmit={handleSubmit((data) => updateData(data))} className='w-full flex-col gap-5 flex'>
            {isPendingPost1 && <PendingApi />}
            <div className='w-full flex gap-1'>
                <div className='w-3/4'>
                    <p className='font-semibold text-md mb-3'>
                        فرم اطلاعات فردی
                    </p>
                    <div className='flex flex-wrap gap-5 mb-3 mt-5'>
                        <InputeCustom required register={register("name", { required: true })} label='نام و نام خانوادگی' classDiv='max-w-[275px]' />
                        <InputeCustom required register={register("age", { required: true })} type='number' label='سن' classDiv='max-w-[275px]' />
                        <InputeCustom required register={register("phone", { required: true })} type='number' disabled label='شماره تماس' classDiv='max-w-[275px]' />
                        <div className='flex flex-col gap-2'>
                            <span className='text-sm'>استان :</span>
                            <Autocomplete
                                onChange={(_, newValue: string | null) => {
                                    setValue("province", newValue || "");
                                }}
                                value={getValues("province") || ""}
                                className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                                disablePortal
                                options={province}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        {provinceForm && (city as any)[provinceForm] ?
                            <div className='flex flex-col gap-2'>
                                <span className='text-sm'>شهر :</span>
                                <Autocomplete
                                    onChange={(_, newValue: string | null) => {
                                        if (newValue) {
                                            setCityValue(newValue)
                                        }
                                    }}
                                    value={cityValue}
                                    className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                                    options={(city as any)[provinceForm]}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            :
                            <div className='flex flex-col gap-2 max-w-[275px] w-full'>
                                <span className='text-sm'>شهر :</span>
                                <Select
                                    className='max-w-full bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                                    defaultValue={"s"}
                                    disabled
                                    input={<OutlinedInput label="Name" />}
                                >
                                    <MenuItem value={"s"} disabled>اول استان خود را انتخاب کنید</MenuItem>
                                </Select>
                            </div>
                        }
                    </div>
                    <span>جنسیت</span>
                    <div className='w-full flex gap-3 mt-2'>
                        <button onClick={() => setValue("gender", "MAN")} className={`p-3 min-w-[105px] bg-slate-200 rounded-md shadow-md border text-right flex items-center gap-2 ${gender === "MAN" ? "shadow-blue-300" : ""}`} type='button'>
                            {"MAN" === gender ?
                                <FaRegDotCircle className='text-blue-700' />
                                :
                                <FaRegCircle />
                            }
                            مرد
                        </button>
                        <button onClick={() => setValue("gender", "WOMAN")} className={`p-3 min-w-[105px] bg-slate-200  rounded-md shadow-md border text-right flex items-center gap-2 ${gender === "WOMAN" ? "shadow-blue-300" : ""}`} type='button'>
                            {"WOMAN" === gender ?
                                <FaRegDotCircle className='text-blue-700' />
                                :
                                <FaRegCircle />
                            }
                            زن
                        </button>
                    </div>
                </div>
                <div className='upload-image w-1/4'>
                    <UploadImage urlImage={uploadImg} setUrlImage={setUploadImg} />
                </div>
            </div>
            <div>
                <p className='font-semibold text-md mb-3'>
                    انتخاب دسته بندی تخصص فناورانه
                </p>
                <div className='flex flex-col gap-5' >
                    <FormExpertises setExpertises={setExpertises} expertises={expertises} />
                </div>
            </div>
            <div>
                <p className='font-semibold text-md mb-3'>
                    اطلاعات تحصیلی
                </p>
                <div className='flex flex-col gap-5 w-full'>
                    <FormEducation education={education} setEducation={setEducation} />
                </div>
            </div>
            <FormSoftware selectSoftware={software} setSelectSoftware={setSoftware} />
            <div>
                <p className='font-semibold text-md mb-3'>
                    اطلاعات سوابق کاری
                </p>
                <div className='w-full gap-5 flex items-end'>
                    <div className='flex flex-col  max-w-[275px] w-full'>
                        <span>مشغول به کار هستید ؟</span>
                        <div className='w-full justify-between flex gap-3 mt-2'>
                            <button onClick={() => setValue("jobStatus", true)} className={`p-3 w-full bg-slate-200 rounded-md shadow-md border text-right flex items-center gap-2 ${jobStatus ? "shadow-blue-300" : ""}`} type='button'>
                                {jobStatus ?
                                    <FaRegDotCircle className='text-blue-700' />
                                    :
                                    <FaRegCircle />
                                }
                                بله
                            </button>
                            <button onClick={() => setValue("jobStatus", false)} className={`p-3 w-full bg-slate-200  rounded-md shadow-md border text-right flex items-center gap-2 ${!jobStatus ? "shadow-blue-300" : ""}`} type='button'>
                                {!jobStatus ?
                                    <FaRegDotCircle className='text-blue-700' />
                                    :
                                    <FaRegCircle />
                                }
                                خیر
                            </button>
                        </div>
                    </div>
                    {jobStatus ?
                        <div className='flex w-full gap-5'>
                            <InputeCustom register={register("jobLocation")} classDiv=' max-w-[275px]' className='shadow-md' name='' label={"محل اشتغال (نام شرکت)"} />
                            <InputeCustom register={register("jobTitle")} classDiv=' max-w-[275px]' className='shadow-md' name='' label={"سمت شغلی"} />
                            <InputeCustom register={register("jobTime")} classDiv=' max-w-[275px]' className='shadow-md' name='' label={"مدت زمان اشتغال"} />
                        </div>
                        : null}
                </div>
            </div>
            <div className='text-right mb-10 w-1/6 flex justify-start'>
                <ButtonCustom type='submit' text='ذخیره کردن اطلاعات' iconEnd={<MdDataSaverOn className='text-xl' />} />
            </div>
        </form >
    )
}
