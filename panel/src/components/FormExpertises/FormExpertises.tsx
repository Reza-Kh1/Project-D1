import { Autocomplete, Box, IconButton, LinearProgress, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'
import InputeCustom from '../InputeCustom/InputeCustom'
import { MdClose } from 'react-icons/md'
import { ExpertisesType } from '../../types/typeExpert'
import techSkills from '../../data/techSkills'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GiCloudUpload } from 'react-icons/gi'
import { FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
type FormExpertisesType = {
    expertises: ExpertisesType[]
    setExpertises: (value: ExpertisesType[]) => void
}
export default function FormExpertises({ expertises, setExpertises }: FormExpertisesType) {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const [loading, setLoading] = useState<boolean>()
    const [progress, setProgress] = useState<number>(0)
    const [indexExperties, setIndexExperties] = useState<number>()
    const deleteFile = (file: string | null, index: number) => {
        if (!file) return
        axios.delete(`upload?key=${file.split("/")[3]}`).then(() => {
            const allExperties = expertises.map((item, ind) => {
                if (ind === index) {
                    item.file = ""
                }
                return item
            })
            setExpertises(allExperties)
        }).catch(() => {
            toast.warning("دوباره تلاش کنید")
        })
    }
    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event?.target?.files;
        if (!newFile || !newFile[0]) return toast.warning("هیچ فایلی انتخاب نشده");
        if (newFile[0].size > 2 * 1052 * 1052) return toast.warning("حجم فایل نباید بیش از 2 مگابایت باشه");
        setLoading(true);
        const formData = new FormData();
        formData.append("file", newFile[0]);
        axios.post("upload", formData, {
            onUploadProgress: (event) => {
                if (event.lengthComputable && event.total) {
                    const percentComplete = Math.round((event.loaded * 100) / event.total);
                    setProgress(percentComplete);
                }
            }
        }).then(({ data }) => {
            const allExperties = expertises.map((item, ind) => {
                if (ind === indexExperties) {
                    item.file = data?.url
                }
                return item
            })
            setExpertises(allExperties)
            toast.success("عکس با موفقیت افزوده شد");
        }).catch((err) => {
            toast.warning(err.message || "عکس آپلود نشد!");
        }).finally(() => {
            setProgress(0)
            setLoading(false);
        })
    }
    const addCategory = () => {
        const body = {
            name: "",
            file: "",
            lvl: "",
            desc: "",
            userId: idProfile,
            id: Math.floor(Math.random() * 1000)
        }
        setExpertises([...expertises, body])
    }
    const deleteCategory = (id: number) => {
        const newCategory = expertises.filter((i) => i.id !== id)
        setExpertises(newCategory)
    }
    return (expertises.map((i, index) => (
        <div className='flex gap-3 w-full items-end' key={index}>
            <div className='grid grid-cols-4 items-end gap-5 w-11/12'>
                <div className='flex flex-col gap-2'>
                    <span className='text-sm'>نام تخصص :</span>
                    <Autocomplete
                        onChange={(_, value: string | null) => {
                            if (!value) return
                            const newBody = expertises.map((item) => {
                                if (item.id === i.id) {
                                    item.name = value
                                }
                                return item
                            })
                            setExpertises(newBody)
                        }}
                        value={i.name}
                        className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                        disablePortal
                        options={techSkills}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-sm'>میزان خبرگی :</span>
                    <Select
                        onChange={({ target }) => {
                            const newBody = expertises.map((item) => {
                                if (item.id === i.id) {
                                    item.lvl = target.value
                                }
                                return item
                            })
                            setExpertises(newBody)
                        }}
                        value={i.lvl}
                        className='max-w-[275px] bg-[#dfe5ea] !rounded-xl border-none shadow-md'
                        defaultValue={"s"}
                        input={<OutlinedInput label="Name" />}
                    >
                        <MenuItem value={"s"} disabled>انتخاب کنید</MenuItem>
                        <MenuItem value={"کم"}>کم</MenuItem>
                        <MenuItem value={"متوسط"}>متوسط</MenuItem>
                        <MenuItem value={"زیاد"}>زیاد</MenuItem>
                    </Select>
                </div>
                {i.file ?
                    <Link to={i.file} target='_blank' className='w-full group rounded-xl flex gap-2 p-4 justify-center relative cursor-pointer items-center shadow-md max-w-[275px] text-white bg-blue-400'>
                        <span>نمایش فایل</span>
                        <IoEye className='text-xl' />
                        <i onClick={() => deleteFile(i.file, index)} className='p-3 shadow-md hidden group-hover:block transition-all rounded-full bg-gray-800/40 absolute right-1 top-1'>
                            <FaTrash className='text-gray-50' size={10} />
                        </i>
                    </Link>
                    :
                    loading && indexExperties === index ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        :
                        <label onClick={() => setIndexExperties(index)} htmlFor="file" className='w-full rounded-xl flex gap-2 p-4 justify-center cursor-pointer items-center shadow-md max-w-[275px] text-black bg-blue-200'>
                            <span> بارگزاری مستندات</span>
                            <i><GiCloudUpload /></i>
                            <input
                                accept=".pdf, .doc, .docx"
                                id='file'
                                type="file"
                                className='w-full h-full'
                                hidden
                                onClick={(event) => { event.stopPropagation() }}
                                onChange={(event) => uploadFile(event)}
                            />
                        </label>
                }
                <InputeCustom row={1} type='textarea' name='description' label='توضیحات' onChange={(value) => {
                    const newCategory = expertises.map((item) => {
                        if (item.id === i.id) {
                            item.desc = value.toString()
                        }
                        return item
                    })
                    setExpertises(newCategory)
                }} value={i.desc} />
            </div>
            <div className='flex gap-3 items-center w-1/12 mb-2'>
                <IconButton onClick={addCategory} className='!bg-slate-300/80 !text-gray-700 shadow-md'>
                    <FaPlus />
                </IconButton>
                {expertises.length !== 1 ?
                    <IconButton onClick={() => deleteCategory(i.id)} className='!bg-slate-300/80 !text-gray-700 shadow-md'>
                        <MdClose />
                    </IconButton>
                    : null}
            </div>
        </div >
    ))

    )
}
