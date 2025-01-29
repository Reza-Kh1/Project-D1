import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function page() {
  return (
    <main className='classDiv'>
      <h1 className='font-semibold text-lg mb-5'>با ما، آینده کاری خود را متحول کنید.</h1>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex gap-5 flex-col justify-between w-2/3 h-full'>
          <p>آیا شما یک متخصص با مهارت‌های فوق‌العاده هستید که به دنبال یک شغل دوم مناسب برای افزایش درآمد یا تنوع در تجربه کاری خود هستید؟ ما اینجا هستیم تا شما را با فرصت‌های شغلی بی‌نظیری آشنا کنیم که با مهارت‌ها و علاقه‌های شما سازگار باشند.</p>
          <p>فرقی نمی‌کند که به دنبال پروژه‌های پاره‌وقت، دورکاری، یا حتی کارهای حضوری باشید، ما شبکه‌ای از کارفرمایان معتبر و فرصت‌های کاری متنوع را برای شما فراهم کرده‌ایم. هدف ما این است که شما بدون اتلاف وقت، شغل دوم دلخواه خود را پیدا کنید و به سادگی به آن دسترسی داشته باشید.</p>
          <Link href={"http://localhost:5173/expert/login"} target='_blank'>
            <Button className='bg-grid'>
              ورود/عضویت متخصصین
              <FaArrowLeft size={15} />
            </Button>
          </Link>
        </div>
        <ImageCustom alt={"فریلنسر"} src='/free.jpg' figureClass='w-1/3' height={300} width={300} />
      </div>
    </main>
  )
}
