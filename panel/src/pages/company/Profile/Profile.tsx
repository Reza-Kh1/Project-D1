import InputeCustom from '../../../components/InputeCustom/InputeCustom'
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom'
import { MdDataSaverOn } from 'react-icons/md'
import { MenuItem, OutlinedInput, Select } from '@mui/material'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { CompanyType } from '../../../types/typeCompany'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProfileCompany } from '../../../services/company/profile'
import axios from 'axios'
import { toast } from 'react-toastify'
import PendingApi from '../../../components/PendingApi/PendingApi'
export default function ProfileCompany() {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const [year, setYear] = useState<number[] | null>()
    const queryClient = useQueryClient();
    const { data } = useQuery<CompanyType>({
        queryKey: ["profileCompany"],
        queryFn: fetchProfileCompany,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const { register, handleSubmit, watch, setValue } = useForm<CompanyType>({
        defaultValues: {
            lvl: "s",
            year: "s"
        }
    });
    const getYears = () => {
        const currentYear = new Date().getFullYear() - 621; // تبدیل سال میلادی به شمسی
        const startYear = 1300;
        const years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        setYear(years)
    };
    const lvl = watch("lvl")
    const yearCompany = watch("year")
    const { isPending: isPendingPost1, mutate: updateData } = useMutation({
        mutationFn: async (formData: CompanyType) => {
            return axios.put(`company/${idProfile}`, formData);
        },
        onSuccess: ({ data }) => {
            const option = {
                phone: data.phone,
                id: data.id,
                name: data.name,
                type: "company",
                isStatus: data.isStatus,
            }
            localStorage.setItem("sitetest", JSON.stringify(option))
            queryClient.invalidateQueries({ queryKey: ["profileCompany"] });
            toast.success("حساب کاربری ویرایش شد.");
        },
        onError: (err: any) => {
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
            console.log(err);
        },
    });
    const syncData = () => {
        if (!data) return
        setValue("address", data?.address)
        setValue("companyField", data?.companyField || "")
        setValue("companyId", data?.companyId || "")
        setValue("employeeCount", data?.employeeCount)
        setValue("name", data?.name || "")
        setValue("phone", data?.phone || "")
        setValue("lvl", data?.lvl || "s")
        setValue("year", data?.year || "s")
        setValue("userRole", data?.userRole || "")
        setValue("userCompany", data?.userCompany || "")
        setValue("phoneUser", data?.phoneUser || "")
    }
    useEffect(() => {
        syncData()
        getYears()
    }, [data])
    return (
        <>
            {isPendingPost1 && <PendingApi />}
            <h1 className='text-md font-semibold'>
                مشخصات شرکت خود را کامل کنید.
            </h1>
            <form onSubmit={handleSubmit((data => updateData(data)))} className='my-5'>
                <div className='grid grid-cols-4 gap-5 items-end'>
                    <InputeCustom register={register("name", { required: true })} className='max-w-full' label='نام شرکت' />
                    <InputeCustom register={register("companyId", { required: true })} className='max-w-full' disabled label='شناسه شرکت' max={11} type='number' />
                    <InputeCustom register={register("phone", { required: true })} className='max-w-full' label='شماره تماس' type='number' />
                    <InputeCustom register={register("userCompany", { required: true })} className='max-w-full' label='نام رابط' />
                    <InputeCustom register={register("phoneUser", { required: true })} className='max-w-full' label='شماره تماس رابط' type='number' />
                    <InputeCustom register={register("userRole", { required: true })} className='max-w-full' label='سمت رابط در شرکت' />
                    <InputeCustom register={register("companyField", { required: true })} className='max-w-full' label='حوزه فعالیت شرکت' />
                    <InputeCustom register={register("employeeCount", { required: true })} className='max-w-full' label='تعداد پرسنل' type='number' />
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm'>سطح شرکت *</span>
                        <Select
                            onChange={({ target }) => {
                                setValue("lvl", target.value)
                            }}
                            className='bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                            input={<OutlinedInput label="Name" />}
                            value={lvl || "s"}
                        >
                            <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
                            <MenuItem value={"شرکت بزرگ"}>شرکت بزرگ</MenuItem>
                            <MenuItem value={"SME"}>SME</MenuItem>
                            <MenuItem value={"Start-up"}>Start-up</MenuItem>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm'>تاریخ تاسیس *</span>
                        <Select
                            className='bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                            onChange={({ target }) => {
                                setValue("year", target.value)
                            }}
                            value={yearCompany || "s"}
                            input={<OutlinedInput label="Name" />}
                        >
                            <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
                            {year?.map((i) => (
                                <MenuItem key={i} value={`${i}`}>{i}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <InputeCustom register={register("address", { required: true })} classDiv='col-span-2' className='max-w-full' name='address' type='textarea' row={1} label='آدرس' />
                </div>
                <div className='w-1/5 mr-2'>
                    <ButtonCustom text='ذخیره کردن اطلاعات' type='submit' iconEnd={<MdDataSaverOn className='text-xl' />} className='bg-grid mt-8' />
                </div>
            </form>
        </>
    )
}
