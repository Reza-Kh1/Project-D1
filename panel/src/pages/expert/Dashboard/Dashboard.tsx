import DashboardBox from '../../../components/DashboardBox/DashboardBox'
import { MdDashboard, MdOutlineStar } from 'react-icons/md'
import { FaMoneyCheckDollar, FaRegMessage } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { GiEntryDoor } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BsBuildingsFill } from 'react-icons/bs'

export default function DashboardUser() {
  const dataJson = JSON.parse(localStorage.getItem("sitetest") || "")
  const navigate = useNavigate()
  const logOut = () => {
    axios.get("auth/logout").then(() => {
      toast.info(".با موفقیت از حساب خارج شدید")
      localStorage.setItem("sitetest", "")
      navigate("/expert/login")
    }).catch(() => {
      toast.error(".خطا در ارتباط با دیتابیس")
    })
  }
  return (
    <div className="grid grid-cols-4 gap-3">
      <DashboardBox url="/expert/profile" icon={<MdDashboard size={30} />} text="اطلاعات حساب کاربری" />
      <DashboardBox url="/expert/suggest" disabled={!dataJson.isStatus} icon={<BsBuildingsFill size={30} />} text="لیست شرکت های یافت شده" />
      <DashboardBox url="/expert/chat" disabled={!dataJson.isStatus} icon={<FaRegMessage size={30} />} text="ارتباط با شرکت" />
      <DashboardBox url="/expert/rates" disabled={!dataJson.isStatus} icon={<div className="flex gap-2"><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /></div>} text="امتیاز دهی" />
      <DashboardBox url="/expert/payment" disabled={!dataJson.isStatus} icon={<FaMoneyCheckDollar size={30} />} text="پرداخت ها" />
      <DashboardBox url="http://localhost:3000/" icon={<FaHome size={30} />} text="بازگشت به سامانه" />
      <button onClick={logOut} type='button' className={"justify-center items-center text-white flex flex-col gap-2  p-3 py-10 rounded-md shadow-md bg-blue-400 hover:bg-blue-400/90"}>
        <GiEntryDoor size={30} />
        <span>خروج</span>
      </button>
    </div>
  )
}
