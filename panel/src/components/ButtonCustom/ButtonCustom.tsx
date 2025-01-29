import React from 'react'
type ButtonCustomType = {
    className?: string
    type?: "submit" | "button" | "reset"
    iconEnd?: React.ReactNode
    iconStart?: React.ReactNode
    text: string
    onClick?: () => void
}
export default function ButtonCustom({ onClick, className, type, iconEnd, iconStart, text }: ButtonCustomType) {
    const classButton = `bg-grid flex items-center p-2 gap-2 justify-center w-full mx-auto mt-8 ${className}`
    return (
        <button onClick={onClick} type={type || "button"} className={classButton}>
            {iconStart ? iconStart : null}
            {text}
            {iconEnd ? iconEnd : null}
        </button>
    )
}
