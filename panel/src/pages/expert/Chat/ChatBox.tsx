import { useEffect, useRef, useState } from 'react'
import ImageCustom from '../../../components/ImageCustom/ImageCustom'
import { FaCalendarAlt } from 'react-icons/fa'
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidSend } from 'react-icons/bi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSingleChat } from '../../../services/company/chat'
import { SingleChatType } from '../../../types/typeExpert'
import axios from 'axios'
import { toast } from 'react-toastify'
import PendingApi from '../../../components/PendingApi/PendingApi'
import { useParams } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
type MessageComponentType = {
    text: string
    type: "EXPERT" | "COMPANY"
    image: string
    id: number
}
export default function ChatBoxExpert() {
    const { id } = useParams()
    const [open, setOpen] = useState<boolean>(false)
    const [idDelete, setIdDelete] = useState<number>()
    const queryClient = useQueryClient();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageBoxRef = useRef<HTMLDivElement | null>(null);
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "")
    const maxHeight = 150;
    const { data, isLoading } = useQuery<{ data: SingleChatType }>({
        queryKey: ["SingleChat", id],
        queryFn: () => fetchSingleChat(Number(id)),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const { isPending, mutate: submitHandler } = useMutation({
        mutationFn: async () => {
            const body = {
                content: textareaRef?.current?.value,
                senderId: idProfile.id,
                senderType: "EXPERT",
                chatId: data?.data.id
            }
            return axios.post('message', body);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["SingleChat", id] });
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.value = "";
            }
        },
        onError: (err: any) => {
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    const { isPending: isDel, mutate: deleteHandler } = useMutation({
        mutationFn: async () => {
            return axios.delete(`message/${idDelete}`);
        },
        onSuccess: async () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["SingleChat", id] });
            toast.info("پیام حذف شد");
        },
        onError: (err: any) => {
            setOpen(false)
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    const handleInput = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            if (textarea.scrollHeight > maxHeight) {
                textarea.style.height = `${maxHeight}px`;
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }
        }
    };
    const MessageComponent = ({ text, type, image, id }: MessageComponentType) => {
        return (
            <div>
                <div className={`${type === "EXPERT" ? "bg-gray-500 border-message-right ml-20 mr-10" : "bg-blue-400 border-message-left mx-10"} text-white text-sm leading-8 shadow-md p-2 relative`}>
                    {text}
                    {type === 'EXPERT' ?
                        <button title='trash button' onClick={() => {
                            setOpen(true)
                            setIdDelete(id)
                        }} className={`${type === "EXPERT" ? "-left-9" : "-right-8"} absolute top-1/2 p-2 bg-black/40  rounded-full shadow-md transform -translate-y-1/2`} type='button'>
                            <FaTrash className='text-white' />
                        </button>
                        : null}
                </div>
                <ImageCustom alt="use test" className='w-10 h-10 shadow-md rounded-full' figureClass={`relative w-full flex ${type === "COMPANY" ? "justify-end" : ""}`} src={type === "EXPERT" ? image ? image : "/user.jpg" : "/company.png"} width={40} height={40} />
            </div>
        )
    }
    useEffect(() => {
        if (!isLoading && messageBoxRef.current) {
            const messageBox = messageBoxRef.current;
            messageBox.scrollTop = messageBox.scrollHeight;
        }
    }, [isLoading, data]);
    return (
        <div className='w-9/12 bg-slate-200 p-2 rounded-md shadow-md flex flex-col justify-between'>
            {isPending && <PendingApi />}
            <div className='11/12'>
                <div className='bg-slate-50 p-1 shadow-md border border-blue-300 rounded-xl flex justify-between px-2 items-center'>
                    <div className='flex items-center gap-3'>
                        {idProfile.type === "expert" ?
                            <>
                                <img alt='profile' src={"/company.png"} className='w-12 shadow-md h-12 rounded-full object-contain' width={40} height={40} />
                                <span>{data?.data.company.name}</span>
                            </>
                            :
                            <>
                                <img alt='profile' src={data?.data.expert.image || "/user.jpg"} className='w-12 shadow-md h-12 rounded-full object-contain' width={40} height={40} />
                                <span>{data?.data.expert.name}</span>
                            </>
                        }
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='flex gap-2 items-center font-medium text-gray-600'>
                            {new Date().toLocaleDateString("fa")}
                            <FaCalendarAlt />
                        </span>
                        <IconButton className='rounded-full !bg-blue-400 !text-white !shadow-md' >
                            <BsThreeDotsVertical className='text-lg' />
                        </IconButton>
                    </div>
                </div>
                <div aria-label='message box' ref={messageBoxRef} className='custom-scroll pl-2 flex flex-col gap-5 my-3 max-h-[63vh] overflow-auto'>
                    {data?.data?.messages?.map((i, index) => {
                        if (i.isDelete) return
                        return <MessageComponent id={i.id} key={index} type={i.senderType} image={data.data.expert.image || ""} text={i.content} />
                    })}
                </div>
            </div>
            <label htmlFor='text' className='w-full relative'>
                <Tooltip title="ارسال">
                    <button type='button' onClick={() => {
                        if (textareaRef?.current) {
                            submitHandler()
                        }
                    }} aria-label='send message' className='absolute left-2 top-1/2 transform text-xl bg-blue-400 p-2 hover:bg-blue-500 shadow-md rounded-full text-blue-50 -translate-y-1/2'>
                        <BiSolidSend className='rotate-180' />
                    </button>
                </Tooltip>
                <textarea
                    id='text'
                    onKeyDown={(e) => {
                        if (!textareaRef?.current?.value) return
                        if (e.key === 'Enter') {
                            if (e.shiftKey) {
                                return;
                            }
                            e.preventDefault();
                            submitHandler();
                        }
                    }}
                    ref={textareaRef}
                    placeholder='متن خود را بنویسید...'
                    rows={1}
                    onInput={handleInput}
                    className='bg-slate-50 resize-none border scroll-none border-blue-300 w-full focus-visible:outline-none p-3 pl-12 rounded-xl shadow-md flex'
                />
            </label>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    از حذف پیام اطمینان دارید ؟
                </DialogTitle>
                <DialogActions>
                    <div className='flex items-center justify-between w-full'>
                        <Button color='primary' variant='outlined' endIcon={<FaTrash size={15} />} onClick={() => deleteHandler()}>حذف</Button>
                        <Button color='error' variant='outlined' endIcon={<MdClose size={15} />} onClick={() => setOpen(false)}>
                            بستن
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}
