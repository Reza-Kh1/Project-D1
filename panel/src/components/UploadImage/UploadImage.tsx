import { Box, CircularProgress, CircularProgressProps, IconButton, Tooltip, Typography } from '@mui/material'
import { BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GiCloudUpload } from 'react-icons/gi'
type UploadImageType = {
    urlImage: string
    setUrlImage: (value: string) => void
}
function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" color='inherit'{...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color={"inherit"}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
export default function UploadImage({ urlImage, setUrlImage }: UploadImageType) {
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>()
    const deleteImage = () => {
        axios.delete(`upload?key=${urlImage.split("/")[3]}`).then(() => {
            setUrlImage("")
        }).catch(() => {
            toast.warning("دوباره تلاش کنید")
        })
    }
    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event?.target?.files;
        if (!newFile || !newFile[0]) return toast.warning("هیچ عکسی انتخاب نشده");
        if (newFile[0].size > 2 * 1052 * 1052) return toast.warning("حجم عکس نباید بیش از 2 مگابایت باشه");
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
            toast.success("عکس با موفقیت افزوده شد");
            setUrlImage(data?.url)
        }).catch((err) => {
            toast.warning(err.message || "عکس آپلود نشد!");
        }).finally(() => {
            setProgress(0)
            setLoading(false);
        })
    }
    return (
        <>
            <span className='block text-md font-semibold'>بارگذاری عکس</span>
            <p className='flex items-center'>
                <span>عکس پرسنلی حداکثر 2 سال اخیر باشد.</span>
                <Tooltip title="اطلاعات ویژه">
                    <IconButton>
                        <BsInfoCircle size={20} />
                    </IconButton>
                </Tooltip>
            </p>
            {urlImage ?
                <figure className='w-40 h-40 relative group mt-5'>
                    <img src={urlImage} className='bg-cover border-2 h-full p-1 rounded-full' alt="" />
                    <i onClick={deleteImage} className='absolute group-hover:opacity-100 transition-all opacity-0 text-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-2 rounded-full shadow-md text-2xl bg-slate-700/70'><MdClose /></i>
                </figure>
                :
                <label htmlFor="image" className='w-40 hover:bg-slate-300 group cursor-pointer h-36 mt-5 flex items-center justify-center rounded-md bg-slate-200 shadow-md'>
                    <input name='image' accept='image/*' id='image' type="file" hidden onChange={uploadImage} disabled={loading} />
                    {loading ?
                        <i className='text-white flex gap-3'>
                            <CircularProgressWithLabel value={progress || 0} />
                        </i>
                        :
                        <i className='text-3xl text-white bg-blue-300 p-3 rounded-full shadow-md'><GiCloudUpload /></i>
                    }
                </label>
            }
        </>
    )
}
