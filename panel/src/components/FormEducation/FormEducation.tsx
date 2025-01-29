import { Autocomplete, IconButton, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { universityData } from '../../data/university'
import { FaPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import listReshte from '../../data/reshte'
import { EducationType } from '../../types/typeExpert'
type FormEducationType = {
    education: EducationType[]
    setEducation: (value: EducationType[]) => void
}
export default function FormEducation({ education, setEducation }: FormEducationType) {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const addUniversity = () => {
        const body = {
            major: "",
            university: "",
            education: "",
            userId: idProfile,
            id: Math.floor(Math.random() * 1000)
        }
        setEducation([...education, body])
    }
    const deleteUniversity = (id: number) => {
        const newCategory = education.filter((i) => i.id !== id)
        setEducation(newCategory)
    }
    return (
        education.map((i, index) => (
            <div key={index} className='grid grid-cols-4 items-center gap-5 w-11/12 pl-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-sm'>مقطع تحصیلی :</span>
                    <Select
                        onChange={({ target }) => {
                            const newBody = education.map((item) => {
                                if (item.id === i.id) {
                                    item.education = target.value
                                }
                                return item
                            })
                            setEducation(newBody)
                        }}
                        value={i.education || "s"}
                        className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Name" />}
                    >
                        <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
                        <MenuItem value={"کاردانی"}>کاردانی</MenuItem>
                        <MenuItem value={"کارشناسی"}>کارشناسی</MenuItem>
                        <MenuItem value={"کارشناسی ارشد"}>کارشناسی ارشد</MenuItem>
                        <MenuItem value={"دکترا"}>دکترا</MenuItem>
                    </Select>
                </div>
                {i.education && i.education !== "select" ?
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm'>انتخاب رشته :</span>
                        <Autocomplete
                            onChange={(_, value: string | null) => {
                                if (!value) return
                                const newBody = education.map((item) => {
                                    if (item.id === i.id) {
                                        item.major = value
                                    }
                                    return item
                                })
                                setEducation(newBody)
                            }}
                            value={i.major}
                            className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                            disablePortal
                            options={(listReshte as any)[i.education]}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    :
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm'>انتخاب رشته :</span>
                        <Select
                            disabled
                            defaultValue={"s"}
                            className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                        >
                            <MenuItem value={"s"} disabled>مقطع تحصیلی خود را انتخاب کنید</MenuItem>
                        </Select>
                    </div>
                }
                <div className='flex flex-col gap-2'>
                    <span className='text-sm'>دانشگاه :</span>
                    <Autocomplete
                        onChange={(_, value: string | null) => {
                            if (!value) return
                            const newBody = education.map((item) => {
                                if (item.id === i.id) {
                                    item.university = value
                                }
                                return item
                            })
                            setEducation(newBody)
                        }}
                        value={i.university}
                        className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                        disablePortal
                        options={universityData}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <div className='flex items-end h-full mb-3 gap-2'>
                    <IconButton onClick={addUniversity} className='!bg-slate-300/80 !text-gray-700 shadow-md'>
                        <FaPlus />
                    </IconButton>
                    {education.length !== 1 ?
                        <IconButton onClick={() => deleteUniversity(i.id)} className='!bg-slate-300/80 !text-gray-700 shadow-md'>
                            <MdClose />
                        </IconButton>
                        : null}
                </div>
            </div>
        ))
    )
}
