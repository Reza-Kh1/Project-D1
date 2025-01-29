import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { HiLogin } from 'react-icons/hi';
import { TbMessage2 } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputeCustom from '../../../components/InputeCustom/InputeCustom';
import SmsBox from '../../../components/SmsBox/SmsBox';
import ButtonCustom from '../../../components/ButtonCustom/ButtonCustom';
import { GiEntryDoor } from 'react-icons/gi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
type FormLoginType = {
  phone: string
  password: string
}
type FormRegisterType = {
  phone: string
  password: string
  password2: string
}
const requiredMsg = "این فیلد الزامی است."
export default function LoginUser() {
  const route = useNavigate()
  const [sms, setSms] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [idExpert, setIdExpert] = useState<string>("")
  const { register: loginRegister, handleSubmit: handleLogin, getValues: getValueLogin, formState: { errors: errLogin } } = useForm<FormLoginType>()
  const { register: signUpRegister, handleSubmit: handleSignUp, getValues, formState: { errors: errSign } } = useForm<FormRegisterType>()
  const routeDashboard = (data: any) => {
    toast.success("با موفقیت وارد حساب شدید")
    const option = {
      phone: data.phone,
      id: data.id,
      name: data.name,
      type: "expert",
      isStatus: data.isStatus,
    }
    localStorage.setItem("sitetest", JSON.stringify(option))
    route("/expert/dashboard", { replace: true })
  }
  const submitCheck = (value?: string) => {
    const body = {
      type: "expert",
      pass: value
    }
    axios.post(`auth/verify/${idExpert}`, body).then(({ data }) => {
      routeDashboard(data.data)
      setSms(false)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  const signUpHandler = (formData: FormRegisterType) => {
    if (formData.password !== formData.password2) return toast.error("پسورد های وارد برابر نیستند.")
    const body = {
      phone: 0 + getValues("phone"),
      password: getValues("password")
    }
    axios.post("auth/expert", body).then(({ data }) => {
      console.log(data.pass);
      setIdExpert(data.id)
      setSms(true)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  const loginHandler = (formData: FormLoginType) => {
    axios.put("auth/expert", formData).then(({ data }) => {
      routeDashboard(data.data)
    }).catch((err) => {
      toast.error(err.response.data.message || "با خطا مواجه شدیم")
    })
  }
  useEffect(() => {
    const dataJson = localStorage.getItem("sitetest")
    if (dataJson) {
      const data = JSON.parse(dataJson)
      if (data.type === "expert") {
        toast.success("با موفقیت وارد حساب شدید")
        route("/expert/dashboard")
      }
    }
  }, [])
  return (
    <main className='w-full flex justify-center gap-10 flex-col items-center mt-10'>
      <div className='w-1/2 flex shadow-md rounded-md overflow-hidden bg-slate-50'>
        <Button color='inherit' className={`shadow-none !rounded-none w-full ${!isLogin ? "!bg-slate-200" : "!bg-blue-400 !text-white "}`} onClick={() => setIsLogin(true)}>
          ورود به حساب
        </Button>
        <Button color='inherit' className={`shadow-none !rounded-none w-full ${isLogin ? "!bg-slate-200" : "!bg-blue-400 !text-white "}`} onClick={() => setIsLogin(false)}>
          ثبت حساب جدید
        </Button>
      </div>
      {isLogin ?
        <div className='p-5 shadow-md bg-slate-100 rounded-md w-3/12 text-center'>
          <h1 className='text-blue-950 text-xl font-bold mb-6'>صفحه ورود متخصص</h1>
          <form onSubmit={handleLogin(loginHandler)}>
            <div className=' grid grid-cols-1 gap-4'>
              <div className='flex flex-col gap-2 justify-start'>
                <span className='text-sm text-right'>شماره تلفن خود را وارد کنید.</span>
                <div className='relative'>
                  <input
                    dir='ltr'
                    {...loginRegister("phone", {
                      required: requiredMsg,
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
                <span className='text-red-600 text-xs mr-3 text-right'>{errLogin.phone?.message}</span>
              </div>
              <InputeCustom
                error={errLogin.password?.message}
                register={loginRegister("password", {
                  required: requiredMsg, pattern: {
                    value: /^(?=.*[0-9])(?=.*[@#$%^&+=]).{6,}$/,
                    message: "رمز عبور باید حداقل ۶ کاراکتر باشد و شامل اعداد و کاراکترهای خاص مثل @#$ باشد.",
                  },
                })}
                type='password'
                label='رمز عبور'
                className='max-w-full'
              />
            </div>
            <div className='w-3/4 mx-auto'>
              <ButtonCustom type='submit' text="ورود به حساب" iconEnd={<HiLogin size={20} />} />
            </div>
          </form>
        </div> :
        <div className='p-5 shadow-md bg-slate-100 rounded-md w-3/12 text-center'>
          <h1 className='text-blue-950 text-xl font-bold mb-6'>ثبت حساب کاربری جدید</h1>
          {!sms ? (
            <form onSubmit={handleSignUp(signUpHandler)}>
              <div className=' grid grid-cols-1 gap-4'>
                <div className='flex flex-col gap-2 justify-start'>
                  <span className='text-sm text-right'>شماره تلفن خود را وارد کنید.</span>
                  <div className='relative'>
                    <input
                      dir='ltr'
                      {...signUpRegister("phone", {
                        required: requiredMsg,
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
                  <span className='text-red-600 text-xs mr-3 text-right'>{errSign.phone?.message}</span>
                </div>
                <InputeCustom
                  error={errSign.password?.message}
                  register={signUpRegister("password", {
                    required: requiredMsg, pattern: {
                      value: /^(?=.*[0-9])(?=.*[@#$%^&+=]).{6,}$/,
                      message: "رمز عبور باید حداقل ۶ کاراکتر باشد و شامل اعداد و کاراکترهای خاص مثل @#$ باشد.",
                    },
                  })}
                  type='password'
                  label='رمز عبور'
                  required
                  className='max-w-full'
                />
                <InputeCustom
                  error={errSign.password2?.message}
                  register={signUpRegister("password2", {
                    required: "این فیلد الزامی است.",
                    validate: (value) => value === getValues("password") || "رمز عبور مطابقت ندارد.",
                  })}
                  type='password'
                  label='تکرار رمز عبور'
                  className='max-w-full'
                />
              </div>
              <div className='w-3/4 mx-auto'>
                <ButtonCustom text="دریافت رمز یک بار مصرف" type='submit' iconEnd={<TbMessage2 size={20} />} />
              </div>
            </form>
          ) : (
            <SmsBox phone={getValues("phone") || getValueLogin("phone")} sms={sms} submitHandler={(val) => submitCheck(val)} />
          )}
        </div>
      }
      <Link className='fixed bottom-10 left-10' to={"http://localhost:3000/expert"}>
        <Button className='!bg-blue-500/80 !px-8 !text-white !rounded-md !p-3 shadow-md'>
          بازگشت به سامانه
          <GiEntryDoor size={30} />
        </Button>
      </Link>
    </main>
  )
}
