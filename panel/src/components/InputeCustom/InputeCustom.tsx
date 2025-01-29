import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { IoEye, IoEyeOff } from 'react-icons/io5'
type InputsType = {
    label?: string
    name?: string
    placeholder?: string
    type?: "text" | "number" | "password" | "textarea"
    onChange?: (value: any) => void
    required?: boolean
    className?: string
    error?: string
    value?: string
    row?: number
    classDiv?: string
    disabled?: boolean
    max?: number
    register?: UseFormRegisterReturn
}
export default function InputeCustom({ register, label, max, row, value, name, placeholder, type, onChange, required, className, error, classDiv, disabled }: InputsType) {
    const classInput = 'focus-visible:outline-none p-3 py-4 rounded-xl shadow-md w-full bg-[#dfe5ea] max-w-[275px] ' + className
    const classForm = `flex flex-col gap-2 w-full text-right ${classDiv ? classDiv : ""}`
    const [hidePass, setHidePass] = useState<boolean>(false)
    return (
        <div className={classForm}>
            {label && <label className='text-sm' htmlFor={name}>{label} {required && "*"}</label>}
            {type === "password" ?
                <div className='w-full relative'>
                    <input
                        name={name}
                        maxLength={max}
                        disabled={disabled}
                        value={value}
                        required={required || false}
                        placeholder={placeholder}
                        id={name}
                        type={!hidePass ? "password" : "text"}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        className={classInput}
                        {...register}
                    />
                    {hidePass ?
                        <button onClick={() => setHidePass(prev => !prev)} type='button' className='absolute left-1 top-1/2 transregister translate-x-1/2 -translate-y-1/2' aria-label='نمایش پسورد'>
                            <IoEye className='text-xl' />
                        </button>
                        :
                        <button onClick={() => setHidePass(prev => !prev)} type='button' className='absolute left-1 top-1/2 transregister translate-x-1/2 -translate-y-1/2' aria-label='محفی کردن پسورد'>
                            <IoEyeOff className='text-xl' />
                        </button>
                    }
                </div>
                :
                type === "textarea" ?
                    <textarea
                        maxLength={max}
                        name={name}
                        required={required || false}
                        {...register}
                        rows={row}
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        id={name}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        className={classInput + " resize-none"}
                    ></textarea>
                    :
                    <input
                        name={name}
                        required={required || false}
                        maxLength={max}
                        value={value}
                        disabled={disabled}
                        placeholder={placeholder}
                        id={name}
                        type={"text"}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        className={classInput}
                        {...register}
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (type === "number") {
                                return target.value = target.value.replace(/[^0-9]/g, "")
                            }
                        }}
                    />
            }
            {error
                && <span className='text-red-600 text-xs mr-3'>
                    {error}
                </span>
            }
        </div>
    )
}