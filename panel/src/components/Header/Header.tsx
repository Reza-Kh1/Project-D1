import { Button } from '@mui/material'
import { IoChevronBackOutline } from 'react-icons/io5'
import { FaCalendarAlt, FaHome } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
export default function Header() {
    const navigate = useNavigate()
    const isLogin = JSON.parse(localStorage.getItem("sitetest") || "")
    return (
        <header className='w-full h-full pt-3'>
            <div className='p-3 mb-6 bg-gray-200 w-11/12 mx-auto rounded-md shadow-md justify-between flex items-center'>
                <span>
                    {isLogin.isStatus ? isLogin.name : "0" + isLogin.phone}
                </span>
                <span className='text-sm flex gap-2 items-center font-medium  text-gray-600'>
                    {new Date().toLocaleDateString("fa")}
                    <FaCalendarAlt />
                </span>
                <Button onClick={() => navigate(-1)} endIcon={<IoChevronBackOutline />} variant='contained' className='bg-grid'>
                    بازگشت
                </Button>
            </div>
        </header>
    )
}
