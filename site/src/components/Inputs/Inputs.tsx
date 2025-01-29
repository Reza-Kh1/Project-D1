"use client"
import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'

type InputsType = {
    label?: string
    name: string
    placeholder?: string
    type?: "text" | "number" | "password" | "textarea"
    onChange?: (value: any) => void
    required?: boolean
    className?: string
    helpText?: string
    value?: string
    row?: number
    classDiv?: string
    disabled?: boolean
}
export default function Inputs({ label, row, value, name, placeholder, type, onChange, required, className, helpText, classDiv, disabled }: InputsType) {
    const classInput = 'focus-visible:outline-none p-3 py-4 rounded-xl shadow-md w-full bg-[#dfe5ea] max-w-[275px] ' + className
    const classForm = `flex flex-col gap-2 w-full text-right ${classDiv ? classDiv : ""}`
    const [hidePass, setHidePass] = useState<boolean>(false)
    return (
        <>
            <div className={classForm}>
                {label && <label className='text-sm' htmlFor={name}>{label} {required && "*"}</label>}
                {type === "password" ?
                    <div className='w-full relative'>
                        <input
                            disabled={disabled}
                            value={value}
                            placeholder={placeholder}
                            id={name}
                            required={required || false}
                            name={name} type={!hidePass ? "password" : "text"}
                            onChange={(e) => onChange && onChange(e.target.value)}
                            className={classInput}
                        />
                        {hidePass ?
                            <button onClick={() => setHidePass(prev => !prev)} type='button' className='absolute left-1 top-1/2 transform translate-x-1/2 -translate-y-1/2' aria-label='نمایش پسورد'>
                                <IoEye className='text-xl' />
                            </button>
                            :
                            <button onClick={() => setHidePass(prev => !prev)} type='button' className='absolute left-1 top-1/2 transform translate-x-1/2 -translate-y-1/2' aria-label='محفی کردن پسورد'>
                                <IoEyeOff className='text-xl' />
                            </button>
                        }
                    </div>
                    :
                    type === "textarea" ?
                        <textarea
                            rows={row}
                            disabled={disabled}
                            value={value}
                            placeholder={placeholder}
                            id={name}
                            required={required || false}
                            name={name}
                            onChange={(e) => onChange && onChange(e.target.value)}
                            className={classInput + " resize-none"}
                        ></textarea>
                        :
                        <input
                            value={value}
                            disabled={disabled}
                            placeholder={placeholder}
                            id={name}
                            required={required || false}
                            name={name}
                            type={"text"}
                            onChange={(e) => {
                                if (onChange) {
                                    onChange(e.target.value)
                                }
                                if (type === "number") {
                                    return e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                }
                            }}
                            className={classInput}
                        />
                }
                {helpText
                    && <span className='text-xs mr-3'>
                        {helpText}
                    </span>
                }
            </div>
        </>
    )
}
