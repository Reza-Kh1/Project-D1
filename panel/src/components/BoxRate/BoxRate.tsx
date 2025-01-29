import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import InputeCustom from '../InputeCustom/InputeCustom';
import { Button } from '@mui/material';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
type Rating = {
    onClick: (val1: number, val2: { name: string, type: boolean }[], val3: string) => void
}
const goodMsg = [
    "تسلط کامل بر ابزارها و نرم‌افزارهای مورد نیاز.",
    "توانایی تحویل به‌موقع پروژه‌ها.",
    "مهارت بالا در برقراری ارتباط مؤثر با تیم و مشتریان.",
    "تعهد بالا به انجام وظایف و مسئولیت‌ها.",
    "توانایی ایده‌پردازی برای پروژه‌های جدید.",
    "توانایی هدایت تیم و مدیریت پروژه‌ها.",
    "علاقه به یادگیری مهارت‌های جدید و به‌روز نگه داشتن دانش.",
    "انتقاد پذیر و ارائه بازخورد سازنده.",
    "دقت و تمرکز بالا در انجام وظایف.",
    "دانش عمیق در حوزه تخصصی شغل.",
]
const badMsg = [
    "تأخیر در انجام وظایف محول شده.",
    "ضعف در برقراری ارتباط مؤثر با همکاران یا مشتریان.",
    "عدم پذیرش انتفاد و پیشنهاد.",
    "رفتارهای غیر حرفه ای در محل کار.",
    "عدم توانایی در حل مشکلات.",
    "نیاز به تقویت دانش تخصصی در حوزه کاری.",
    "تسلط ناکافی بر ابزارها یا نرم‌افزارهای مورد نیاز.",
    "عدم تمایل به یادگیری مهارت‌های جدید.",
    "نبود تعهد به انجام وظایف.",
    "نداشتن مهارت در مدیریت چند پروژه به‌طور هم‌زمان.",
]
export default function BoxRate({ onClick }: Rating) {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [choiceText, setChoiceText] = useState<{ name: string, type: boolean }[]>([])
    const [statusScore, setStatusScore] = useState<boolean | null>(null)
    const [text, setText] = useState<string>("")
    const handleMouseEnter = (index: number) => {
        setHoveredStar(index);
    };
    const handleMouseLeave = () => {
        setHoveredStar(0);
    };
    const handleClick = (index: number) => {
        setSelectedRating(index);
        if (index > 2) {
            setStatusScore(true)
        } else {
            setStatusScore(false)
        }
    };
    const Emogi = () => {
        let text = ""
        if (Number(selectedRating)) {
            switch (selectedRating) {
                case 5:
                    text = "(عالی)"
                    break;
                case 4:
                    text = "(خوب)"
                    break;
                case 3:
                    text = "(متوسط)"
                    break;
                case 2:
                    text = "(ضعیف)"
                    break;
                case 1:
                    text = "(خیلی ضعیف)"
                    break;
                default:
                    text = ""
            }
        } else {
            text = "ثبت نشده"
        }
        return text
    }
    const submitHandler = () => {
        onClick(selectedRating, choiceText, text)
    }
    return (
        <div className='w-2/3 mx-auto text-center flex flex-col gap-7'>
            <div className='flex gap-1 cursor-pointer justify-center'>
                {Array.from({ length: 5 }, (_, index) => {
                    const starIndex = index + 1;
                    return (
                        <i
                            key={starIndex}
                            onMouseEnter={() => handleMouseEnter(starIndex)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(starIndex)}
                        >
                            <FaStar className='text-5xl' color={starIndex <= (hoveredStar || selectedRating) ? '#FFD700' : '#ccc'} />
                        </i>
                    );
                })}
            </div>
            <span className='font-semibold '>امتیاز شما : {selectedRating} <Emogi /></span>
            {selectedRating ?
                <div className='w-full max-w-2xl mx-auto'>
                    <div className='flex gap-3 mb-6'>
                        <Button onClick={() => setStatusScore(false)} className={`${statusScore === false ? "!bg-red-300/80" : "!bg-gray-200"} !text-black !shadow-md !w-full`}>
                            نقاط ضعف
                        </Button>
                        <Button onClick={() => setStatusScore(true)} className={`${statusScore === true ? "!bg-blue-300/80" : "!bg-gray-200"} !text-black !shadow-md !w-full`}>
                            نقاط قوت
                        </Button>
                    </div>
                    <div className='grid grid-cols-2 gap-5 mb-6'>
                        {statusScore !== null ?
                            statusScore ?
                                goodMsg.map((i, index) => (
                                    <Button key={index}
                                        onClick={() => {
                                            if (choiceText.some((item) => item.name === i)) {
                                                const newBody = choiceText.filter((item) => item.name !== i)
                                                setChoiceText(newBody)
                                            } else {
                                                const body = {
                                                    name: i,
                                                    type: true
                                                }
                                                setChoiceText([...choiceText, body])
                                            }
                                        }}
                                        className={`bg-gradient-to-r ${choiceText.some((item) => item.name === i) ? `!to-slate-400 !from-blue-500  !text-white` : "!to-gray-200 !from-blue-300 !text-gray-700"} !shadow-md`}
                                    >
                                        {i}
                                    </Button>
                                ))
                                :
                                badMsg.map((i, index) => (
                                    <Button key={index}
                                        onClick={() => {
                                            if (choiceText.some((item) => item.name === i)) {
                                                const newBody = choiceText.filter((item) => item.name !== i)
                                                setChoiceText(newBody)
                                            } else {
                                                const body = {
                                                    name: i,
                                                    type: false
                                                }
                                                setChoiceText([...choiceText, body])
                                            }
                                        }}
                                        className={`bg-gradient-to-r ${choiceText.some((item) => item.name === i) ? `!to-slate-400  from-red-500 !text-white` : "!to-gray-50 !from-red-400 !text-gray-700"} !shadow-md`}
                                    >
                                        {i}
                                    </Button>
                                ))
                            : null
                        }
                    </div>
                    <InputeCustom type='textarea' value={text} onChange={(val) => setText(val)} className='max-w-full !bg-gray-200' row={3} placeholder='سایر ...' name='' />
                </div>
                : null}
            <div className='flex justify-center w-1/4 mx-auto'>
                <ButtonCustom text='ثبت امتیاز' className='w-1/3' onClick={submitHandler} iconEnd={<FaStar className='text-yellow-400' />} type='button' />
            </div>
        </div >

    )
}
