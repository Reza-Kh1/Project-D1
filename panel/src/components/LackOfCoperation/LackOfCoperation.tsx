import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import InputeCustom from '../InputeCustom/InputeCustom'
import { useState } from 'react'
type LackOfCoperationType = {
    open: boolean
    setOpen: (value: boolean) => void
    name: string
    cancelBtn: (value: string, val: string[]) => void
}
const msg = [
    "تأخیر در انجام وظایف محول شده.",
    "ضعف در برقراری ارتباط مؤثر با همکاران یا مشتریان.",
    "عدم پذیرش انتفاد و پیشنهاد.",
    "رفتارهای غیر حرفه ای در محل کار.",
    "عدم توانایی در حل مشکلات.",
    "نیاز به تقویت دانش تخصصی در حوزه کاری.",
    "تسلط ناکافی بر ابزارها یا نرم‌افزارهای مورد نیاز.",
    "عدم تمایل به یادگیری مهارت‌های جدید.",
    "نبود تعهد به انجام وظایف.",
]
export default function LackOfCoperation({ cancelBtn, open, setOpen, name, }: LackOfCoperationType) {
    const [text, setText] = useState<string>("")
    const [msgCancel, setMsgCancel] = useState<string[]>([])
    const cancelMsgHandler = (value: string) => {
        if (msgCancel.includes(value)) {
            const newMap = msgCancel.filter((i) => i !== value)
            setMsgCancel(newMap)
        } else {
            setMsgCancel([...msgCancel, value])
        }
    }
    return (
        <Dialog
            maxWidth="md"
            fullWidth
            open={open}
            onClose={() => { setOpen(false), setText(""), setMsgCancel([]) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {name}
            </DialogTitle>
            <DialogContent>
                <div className='grid grid-cols-3 gap-5 mb-5'>
                    {msg.map((i, index) => (
                        <Button key={index} onClick={() => cancelMsgHandler(i)} className={`${msgCancel.includes(i) ? "!bg-blue-500" : "!bg-blue-400/80"} !text-white shadow-md`}>
                            {i}
                        </Button>
                    ))}
                </div>
                {/* <p className='font-semibold'>آیا مشکلی در ارتباط وجود داشت ؟</p> */}
                <InputeCustom value={text} onChange={(value) => setText(value)} type='textarea' row={5} className='max-w-full' placeholder='علت خود را بنویسید ...' label='لطفا علت عدم همکاری خود را برای ما بنویسید :' name='desc' />
            </DialogContent>
            <DialogActions>
                <div className='flex items-center justify-between w-full'>
                    <Button variant='contained' color='primary' onClick={() => cancelBtn(text, msgCancel)}>
                        ثبت
                    </Button>
                    <Button variant='contained' color='error' onClick={() => { setOpen(false), setText(""), setMsgCancel([]) }}>
                        بستن
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}
