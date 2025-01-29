import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
export default function HomePageUser() {
    const navigate = useNavigate()
    const local = localStorage.getItem("sitetest")

    const logOut = () => {
        axios.get("auth/logout").then(() => {
            toast.info(".دوباره وارد حساب خود شوید")
            localStorage.setItem("sitetest", "")
            navigate("/expert/login")
        }).catch(() => {
            toast.error(".خطا در ارتباط با دیتابیس")
        })
    }
    useEffect(() => {
        if (local) {
            if (JSON.parse(local)?.type !== "expert") {
                logOut()
            }
        }
        if (!local) {
            logOut()
        }
    }, [])
    return (
        <main className='w-full'>
            <Header />
            <div className='mt-3 w-full max-w-7xl mx-auto mb-8'>
                <Outlet />
            </div>
        </main>
    )
}
