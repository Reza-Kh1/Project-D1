import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ReactNode } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
type BoxLoginType = {
  icon: ReactNode
  text: string
  title: string
  url: string
}
export default function Home() {
  const BoxLogin = ({ icon, text, title, url }: BoxLoginType) => {
    return (
      <div className="bg-gradient-to-b to-slate-100 p-3 justify-between flex flex-col text-center from-blue-300 w-1/3 rounded-md shadow-md">
        <i className="flex justify-center">
          {icon}
        </i>
        <h2 className="font-semibold text-lg my-4 text-gray-700">{title}</h2>
        <p className="text-gray-600">{text}</p>
        <Link href={url}>
          <Button className="bg-grid mt-5">
            اینجا کلیک کنید
          </Button>
        </Link>
      </div>
    )
  }
  return (
    <main className="classDiv">
      <div className="flex gap-5 justify-evenly">
        <BoxLogin icon={<FaUserTie size={70} className="text-gray-600" />} text="آیا شما یک متخصص با مهارت‌های فوق‌العاده هستید که به دنبال شغل دوم مناسب برای افزایش درآمد یا تنوع در تجربه کاری خود هستید؟ ما اینجا هستیم تا شما را با فرصت‌های شغلی بی‌نظیری آشنا کنیم که با مهارت‌ها و علاقه‌های شما سازگار باشند." title="ورود متخصص" url="expert" />
        <BoxLogin icon={<BsBuildings size={70} className="text-gray-600" />} text="آیا به دنبال متخصصانی توانمند و باتجربه برای پیشبرد پروژه‌ها و اهداف شرکت خود هستید؟ ما اینجا هستیم تا شما را به شبکه‌ای از برترین متخصصان در حوزه‌های مختلف متصل کنیم." title="ورود شرکت ها" url="company" />
      </div>
    </main>
  );
}
