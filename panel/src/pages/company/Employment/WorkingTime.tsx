import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import InputeCustom from '../../../components/InputeCustom/InputeCustom'
import { WorkingTimeType } from '../../../types/typeCompany'
import TimeBox from '../../../components/TimeBox/TimeBox'
type TypeBox = {
    setTime: (value: WorkingTimeType[]) => void
    time: WorkingTimeType[]
}
const defualtData = [
    {
        day: "شنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "یکشنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "دوشنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "سه شنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "چهارشنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "پنج شنبه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },
    {
        day: "جمعه",
        active: false,
        desc: "",
        stratTime: "",
        endTime: ""
    },

]
export default function WorkingTime({ setTime, time }: TypeBox) {
    const dataTime = time.length ? time : defualtData
    return (
        <div className='mt-6'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                               روزهای کاری
                            </TableCell>
                            <TableCell align="center">روزهای هفته</TableCell>
                            <TableCell align="center">ساعت شروع کار</TableCell>
                            <TableCell align="center">ساعت پایان کار</TableCell>
                            <TableCell align="center">توضیحات بیشتر</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTime.map((i, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    {i.active ? <IconButton onClick={() => {
                                        const mapp = dataTime.map((item) => {
                                            if (item.day === i.day) {
                                                item.active = !i.active
                                            }
                                            return item
                                        })
                                        setTime(mapp)
                                    }}>
                                        <MdOutlineCheckBox />
                                    </IconButton> :
                                        <IconButton onClick={() => {
                                            const mapp = dataTime.map((item) => {
                                                if (item.day === i.day) {
                                                    item.active = !i.active
                                                }
                                                return item
                                            })
                                            setTime(mapp)
                                        }}>
                                            <MdOutlineCheckBoxOutlineBlank />
                                        </IconButton>
                                    }
                                </TableCell>
                                <TableCell align="center">{i.day}</TableCell>
                                <TableCell align="center"><TimeBox setValue={(val: string | null | Date) => {
                                    const mapp = dataTime.map((item) => {
                                        if (item.day === i.day) {
                                            item.stratTime = val
                                        }
                                        return item
                                    })
                                    setTime(mapp)
                                }} value={i.stratTime} />
                                </TableCell>
                                <TableCell align="center">
                                    <TimeBox setValue={(val: string | null | Date) => {
                                        const mapp = dataTime.map((item) => {
                                            if (item.day === i.day) {
                                                item.endTime = val
                                            }
                                            return item
                                        })
                                        setTime(mapp)
                                    }} value={i.endTime} />
                                </TableCell>
                                <TableCell align="center"><InputeCustom name='desc' value={i.desc} onChange={(value) => {
                                    console.log(value);
                                    const mapp = dataTime.map((item) => {
                                        if (item.day === i.day) {
                                            item.desc = value
                                        }
                                        return item
                                    })
                                    setTime(mapp)
                                }} className='max-w-full' placeholder='سایر ...' /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
