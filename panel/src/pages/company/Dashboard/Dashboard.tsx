import { MdDashboard, MdOutlinePendingActions, MdOutlineStar } from "react-icons/md";
import { FaMoneyCheckDollar, FaRegMessage } from "react-icons/fa6";
import { FaHome, FaUserTie } from "react-icons/fa";
import { LuClipboardPenLine } from "react-icons/lu";
import DashboardBox from "../../../components/DashboardBox/DashboardBox";
import { GiEntryDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function DashboardCompany() {
  const navigate = useNavigate()
  const dataJson = JSON.parse(localStorage.getItem("sitetest") || "")
  const logOut = () => {
    axios.get("auth/logout").then(() => {
      toast.info(".با موفقیت از حساب خارج شدید")
      localStorage.setItem("sitetest", "")
      navigate("/company/login")
    }).catch(() => {
      toast.error(".خطا در ارتباط با دیتابیس")
    })
  }
  return (
    <div className="grid grid-cols-4 gap-3">
      <DashboardBox url="/company/profile" icon={<MdDashboard size={30} />} text="اطلاعات حساب کاربری" />
      <DashboardBox url="/company/employment" disabled={!dataJson.isStatus} icon={<LuClipboardPenLine size={30} />} text="ایجاد درخواست جدید" />
      <DashboardBox url="/company/get-employment" disabled={!dataJson.isStatus} icon={<MdOutlinePendingActions size={30} />} text="درخواست های پیشین" />
      <DashboardBox url="/company/suggestExpert" disabled={!dataJson.isStatus} icon={<FaUserTie size={30} />} text="لیست متخصصین یافت شده" />
      <DashboardBox url="/company/chat" disabled={!dataJson.isStatus} icon={<FaRegMessage size={30} />} text="ارتباط با متخصص" />
      <DashboardBox url="/company/rates" disabled={!dataJson.isStatus} icon={<div className="flex gap-2"><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /><MdOutlineStar size={30} /></div>} text="امتیاز دهی" />
      <DashboardBox url="/company/payment" disabled={!dataJson.isStatus} icon={<FaMoneyCheckDollar size={30} />} text="پرداخت ها" />
      <DashboardBox url="http://localhost:3000/" icon={<FaHome size={30} />} text="بازگشت به سامانه" />
      <button onClick={logOut} type='button' className={"justify-center items-center text-white flex flex-col gap-2  p-3 py-10 rounded-md shadow-md bg-blue-400 hover:bg-blue-400/90"}>
        <GiEntryDoor size={30} />
        <span>خروج</span>
      </button>
    </div>
  )
}
