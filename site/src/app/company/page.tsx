import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function page() {
    return (
        <main className='classDiv'>
            <h1 className='font-semibold text-lg mb-5'>بهترین متخصصان، موفقیت کسب‌وکار شما را تضمین می‌کنند.</h1>
            <div className='flex items-center justify-between gap-5'>
                <div className='flex gap-5 flex-col justify-between w-2/3 h-full'>
                    <p>آیا به دنبال متخصصانی توانمند و باتجربه برای پیشبرد پروژه‌ها و اهداف شرکت خود هستید؟ ما اینجا هستیم تا شما را به شبکه‌ای از برترین متخصصان در حوزه‌های مختلف متصل کنیم.</p>
                    <p>فرقی نمی‌کند که به دنبال همکاری‌های پروژه‌ای، پاره‌وقت، یا حتی شغل‌های کوتاه‌مدت باشید، پلتفرم ما بهترین نیروها را در اختیار شما قرار می‌دهد. ما فرآیند استخدام را سریع، شفاف و آسان کرده‌ایم تا شما بتوانید به جای نگرانی در مورد یافتن نیروی مناسب، بر رشد کسب‌وکارتان تمرکز کنید.</p>
                    <Link href={"http://localhost:5173/company/login"} target='_blank'>
                        <Button className='bg-grid '>
                            ورود/عضویت شرکت ها
                            <FaArrowLeft size={15} />
                        </Button>
                    </Link>
                </div>
                <ImageCustom alt={"فریلنسر"} src='/company-login.jpg' figureClass='w-1/3' height={200} width={200} />
            </div>
        </main>
    )
}
