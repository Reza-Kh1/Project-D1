import { Tooltip } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
type LinkBoxType = {
    text: string
    icon: ReactNode
    url: string
    disabled?: boolean
}
export default function DashboardBox({ text, icon, disabled, url }: LinkBoxType) {
    return (
        disabled ?
            <Tooltip title="اطلاعات حساب کاربری خود را تکمیل کرده.">
                <div className={`justify-center items-center text-white flex flex-col gap-2  p-3 py-10 rounded-md shadow-md ${disabled ? "bg-gray-300" : " bg-blue-400 hover:bg-blue-400/90"}`}>
                    {icon}
                    <span>{text}</span>
                </div>
            </Tooltip>
            :
            <Link to={url} className={`justify-center items-center text-white flex flex-col gap-2  p-3 py-10 rounded-md shadow-md ${disabled ? "bg-gray-300" : " bg-blue-400 hover:bg-blue-400/90"}`}>
                {icon}
                <span>{text}</span>
            </Link>
    )
}
