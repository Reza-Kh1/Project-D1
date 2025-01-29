import { useEffect, useRef, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import { FaCheck } from 'react-icons/fa6';
type GetSmsType = {
    phone: string
    sms: boolean
    submitHandler: (value?: string) => void
}
export default function SmsBox({ phone, sms, submitHandler }: GetSmsType) {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", ""])
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])
    const submitAccept = (value?: string) => {
        const completeOtp = otp.join("")
        const valuePass = value || completeOtp
        if (valuePass.length < 5) return
        submitHandler(valuePass)
    }
    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 4) {
            inputsRef.current[index + 1]?.focus()
        }
        if (index === 4 && value) {
            const completeOtp = newOtp.join("")
            submitAccept(completeOtp)
        }
    }
    useEffect(() => {
        if (sms) {
            inputsRef.current[0]?.focus();
        }
    }, [sms]);
    if (!sms) return
    return (
        <div>
            <span>شماره تلفن شما : 0{phone}</span>
            <div className='flex gap-4 justify-center mt-4' dir='ltr'>
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        type='text'
                        required
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Backspace" && !value && index > 0) {
                                inputsRef.current[index - 1]?.focus()
                            }
                        }}
                        aria-label='passCode'
                        className='text-center focus-visible:outline-none bg-blue-200 p-3 w-12 h-12 flex justify-center shadow-md rounded-md'
                    />
                ))}
            </div>
            <ButtonCustom text='تایید رمز' iconEnd={<FaCheck size={20} />} type='button' className='bg-grid w-3/4 mx-auto !mt-8' onClick={() => submitAccept()} />
        </div>
    )
}
