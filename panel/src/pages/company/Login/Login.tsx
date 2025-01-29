import { Button } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import InputeCustom from '../../../components/InputeCustom/InputeCustom'
import { TbLogin, TbMessage2 } from 'react-icons/tb'
import SmsBox from '../../../components/SmsBox/SmsBox'
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom'
import { useForm } from "react-hook-form"
import { GiEntryDoor } from "react-icons/gi";
import axios from 'axios'

type FormLogin = {
  companyId: string
  password: string
}
type FormRegister = {
  keyCode: string
  phone: string
  password1: string
  password2: string
}
export default function LoginCompany() {
  const route = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [sms, setSms] = useState<boolean>(false)
  const [idCompany, setIdCompany] = useState<string>("")
  const { register: loginRegister, handleSubmit: loginSubmit, formState: { errors } } = useForm<FormLogin>()
  const { register: signUpRegister, handleSubmit: registerSubmit, formState: formRegister, getValues } = useForm<FormRegister>()
  const routeDashboard = (data: any) => {
    toast.success("با موفقیت وارد حساب شدید")
    const option = {
      phone: 0 + getValues("phone"),
      id: data.id,
      name: data.name,
      type: "company",
      isStatus: data.isStatus,
    }
    localStorage.setItem("sitetest", JSON.stringify(option))
    route("/company/dashboard", { replace: true });
  }
  const loginHandler = (formData: FormLogin) => {
    axios.put("auth/company", formData).then(({ data }) => {
      routeDashboard(data)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  const sigUpHandler = (formData: FormRegister) => {
    if (formData.password1 !== formData.password2) return toast.error(".رمز عبور وارد شده مطابقت ندارد")
    const body = {
      password: getValues("password1"),
      phone: 0 + getValues("phone"),
      companyId: getValues("keyCode")
    }
    axios.post("auth/company", body).then(({ data }) => {
      console.log(data);
      setSms(true)
      setIdCompany(data?.id)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  const checkSms = (val?: string) => {
    const body = {
      type: "expert",
      pass: val
    }
    axios.post(`auth/verify/${idCompany}`, body).then(({ data }) => {
      routeDashboard(data?.data)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  return (
    <main className='w-full flex justify-center gap-8 flex-col items-center my-10'>
      <div className='w-1/2 flex shadow-md rounded-md overflow-hidden bg-slate-50'>
        <Button color='inherit' className={`shadow-none !rounded-none w-full ${!isLogin ? "" : "!bg-blue-400 !text-white "}`} onClick={() => setIsLogin(true)}>
          ورود به حساب
        </Button>
        <Button color='inherit' className={`shadow-none !rounded-none w-full ${isLogin ? "" : "!bg-blue-400 !text-white "}`} onClick={() => setIsLogin(false)}>
          ثبت حساب جدید
        </Button>
      </div>
      {isLogin ?
        <form onSubmit={loginSubmit(loginHandler)} className='p-5 shadow-md bg-slate-100 rounded-md w-3/12 text-center'>
          <h1 className='text-blue-950 text-xl font-bold mb-6'>ورود به حساب شرکت</h1>
          <div className=' grid grid-cols-1 gap-4'>
            <InputeCustom register={loginRegister("companyId", {
              required: "این فیلد الزامی است.", pattern: {
                value: /^\d{11}$/,
                message: "شناسه ملی باید 11 رقم باشد.",
              },
            })} type='number' error={errors.companyId?.message} label='شناسه ملی شرکت' className='max-w-full' placeholder='12333212123' />
            <InputeCustom register={loginRegister("password", {
              required: "این فیلد الزامی است.", pattern: {
                value: /^(?=.*[0-9])(?=.*[@#$%^&+=]).{6,}$/,
                message:
                  "رمز عبور باید حداقل ۶ کاراکتر باشد و شامل اعداد و کاراکترهای خاص مثل @#$ باشد.",
              },
            })} error={errors.password?.message} type='password' label='رمز عبور خود را وارد کنید' className='max-w-full' />
          </div>
          <ButtonCustom type='submit' iconEnd={<TbLogin size={20} />} text='ورود به حساب' />
        </form>
        :
        <form
          onSubmit={registerSubmit(sigUpHandler)}
          className='p-5 shadow-md bg-slate-100 rounded-md w-3/12 text-center'>
          <h1 className='text-blue-950 text-xl font-bold mb-6'>{sms ? "احراز هویت" : 'ساخت حساب جدید'}</h1>
          {!sms ?
            <>
              <div className=' grid grid-cols-1 gap-4'>
                <InputeCustom register={signUpRegister("keyCode", {
                  required: "این فیلد الزامی است.",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "شناسه ملی باید 11 رقم باشد.",
                  },
                })} error={formRegister.errors.keyCode?.message} type='number' label='شناسه ملی شرکت' className='max-w-full' placeholder='12333212123' required />
                <div className='flex flex-col gap-2 justify-start'>
                  <span className='text-sm text-right'>شماره تلفن خود را وارد کنید.</span>
                  <div className='relative'>
                    <input
                      dir='ltr'
                      {...signUpRegister("phone", {
                        required: true,
                        pattern: {
                          value: /^[1-9]\d{9}$/, // شماره باید با عددی غیر از 0 شروع شود و 10 رقم باشد.
                          message: "شماره تلفن باید با عددی غیر از 0 شروع شود و 10 رقم باشد.",
                        },
                      })}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, "");
                        if (target.value.startsWith("0")) {
                          target.value = target.value.slice(1);
                        }
                      }}
                      placeholder='9121237887'
                      type="text"
                      className='pl-14 focus-visible:outline-none p-3 py-4 rounded-xl shadow-md bg-[#dfe5ea] w-full'
                    />
                    <span className='absolute text-lg left-2 top-0 transform translate-y-1/2 '>
                      : 98+
                    </span>
                  </div>
                  <span className='text-red-600 text-xs mr-3 text-right'>{formRegister.errors.phone?.message}</span>
                </div>
                <InputeCustom register={signUpRegister("password1", {
                  required: "این فیلد الزامی است.", pattern: {
                    value: /^(?=.*[0-9])(?=.*[@#$%^&+=]).{6,}$/,
                    message:
                      "رمز عبور باید حداقل ۶ کاراکتر باشد و شامل اعداد و کاراکترهای خاص مثل @#$ باشد.",
                  },
                })} error={formRegister.errors.password1?.message} type='password' label='رمز عبور خود را وارد کنید' required className='max-w-full' />
                <InputeCustom register={signUpRegister("password2", {
                  required: "این فیلد الزامی است.",
                  validate: (value) => value === getValues("password1") || "رمز عبور مطابقت ندارد.",
                })} error={formRegister.errors.password2?.message} type='password' label='تایید رمز عبور' required className='max-w-full' />
              </div>
              <ButtonCustom text='دریافت رمز یک بار مصرف' type='submit' iconEnd={<TbMessage2 size={20} />} />
            </>
            :
            <SmsBox phone={getValues("phone")} sms={sms} submitHandler={(val?: string) => checkSms(val)} />}
        </form>
      }

      <Link className='fixed bottom-10 left-10' to={"http://localhost:3000/company"}>
        <Button className='!bg-blue-500/80 !px-8 !text-white !rounded-md !p-3 shadow-md'>
          بازگشت به سامانه
          <GiEntryDoor size={30} />
        </Button>
      </Link>
    </main >
  )
}
