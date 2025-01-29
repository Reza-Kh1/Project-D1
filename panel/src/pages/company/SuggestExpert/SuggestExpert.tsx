import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserDetail from '../../../components/UserDetail/UserDetail'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import LackOfCoperation from '../../../components/LackOfCoperation/LackOfCoperation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSuggestExpert } from '../../../services/company/suggestExpert'
import { GetJobContactCompany, jobContactCompany } from '../../../types/typeCompany'
import axios from 'axios'
import PendingApi from '../../../components/PendingApi/PendingApi'
import ExpertCard from '../../../components/ExpertCard/ExpertCard'
import LastExperts from './LastExperts'
import { FaEye } from 'react-icons/fa6'
import { FaHistory } from 'react-icons/fa'
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f3f4f6",
        color: "#525b69",
        fontWeight: 600,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
export default function SuggestExpertCompany() {
    const dataJson = JSON.parse(localStorage.getItem("sitetest") || "").id
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { data } = useQuery<GetJobContactCompany>({
        queryKey: ["suggestExpert"],
        queryFn: fetchSuggestExpert,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
    const [isShow, setIsShow] = useState<boolean>(false)
    const [openDis, setOpenDis] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [dataExpert, setDataExpert] = useState<jobContactCompany>()
    const { isPending: isAccept, mutate: acceptCompany } = useMutation({
        mutationFn: async (id: number) => {
            const body = {
                approvedCompany: true
            }
            const res = await axios.put(`jobContact/${id}`, body) as any
            const chatBody = {
                expertId: res.data.expertId,
                companyId: res.data.companyId,
                jobContactId: res.data.id
            }
            return axios.post("chat", chatBody)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["AllChatCompany"] });
            queryClient.invalidateQueries({ queryKey: ["AllExperts"] });
            queryClient.invalidateQueries({ queryKey: ["suggestExpert"] });
            toast.success(".تایید متخصص اعلام میشود");
            setOpen(false)
            navigate(`/company/chat?name=${dataExpert?.expert.name}`, { replace: true })
        },
        onError: (err: any) => {
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
            console.log(err);
            setOpen(false)
        },
    });
    const { isPending: isCancel, mutate: cancelExpert } = useMutation({
        mutationFn: ({ text, msg }: { text: string; msg: string[] }) => {
            const body = {
                approvedCompany: false,
                message: text,
                isDelete: true,
                detailMessage: msg,
            }
            return axios.put(`jobContact/${dataExpert?.id}`, body)
        },
        onSuccess: () => {
            setOpen(false)
            setOpenDis(false)
            queryClient.invalidateQueries({ queryKey: ["suggestExpert"] });
            queryClient.invalidateQueries({ queryKey: ["AllExperts"] });
            toast.success("متخصص رد شد.");
        },
        onError: (err: any) => {
            setOpen(false)
            setOpenDis(true)
            toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
        },
    });
    return (
        <>
            {(isAccept || isCancel) && <PendingApi />}
            <div className='flex justify-between mb-8 items-center'>
                <h1 className='font-semibold text-xl'>متخصص های پیشنهاد شده برای شما.</h1>
                <div className='flex items-center gap-5'>
                    <Button endIcon={<FaEye />} onClick={() => { setIsShow(false), navigate(`/company/suggestExpert`, { replace: true }) }} variant={!isShow ? "contained" : "outlined"} color='primary'>
                        متخصصین فعلی
                    </Button>
                    <Button endIcon={<FaHistory />} onClick={() => { setIsShow(true), navigate(`?approved=true&companyId=${dataJson}`, { replace: true }) }} variant={isShow ? "contained" : "outlined"} color='primary'>
                        متخصصین گذشته
                    </Button>
                </div>
            </div>
            {!isShow ?
                <>
                    <h2 className='my-5'>لیست متخصصین برای درخواست فعلی.</h2>
                    {data?.data.length ?
                        <div className='grid grid-cols-4 gap-4'>
                            {data?.data.map((i, index) => (
                                <ExpertCard acceptCompany={acceptCompany} setDataExpert={setDataExpert} setOpen={setOpen} setOpenDis={setOpenDis} jobId={i.id} data={i} lastExpert={false} key={index} />
                            ))}
                        </div>
                        :
                        <span>هیچ متخصصی یافت نشد.</span>
                    }
                </>
                : null
            }
            <LastExperts isShow={isShow} />
            <Dialog
                fullScreen
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='w-full flex justify-between items-center'>
                        {dataExpert?.expert.name}
                        <IconButton onClick={() => setOpen(false)}>
                            <MdClose />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='grid grid-cols-5 gap-5'>
                        <UserDetail detailState={dataExpert?.expert} />
                    </div>
                    <div className='mt-12 border-t-2 pt-8'>
                        <h2 className='text-xl mb-6 font-semibold'>
                            اطلاعات پروژه درخواست شده
                        </h2>
                        <div className='grid grid-cols-5 gap-5'>
                            <div className='grid grid-cols-5 gap-5 col-span-5'>
                                <div className='rounded-xl shadow-boxDetail'>
                                    <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-xl p-3'>تخصص مورد نیاز :</p>
                                    <span className='flex text-gray-700 items-center gap-1 p-3'>{dataExpert?.employment.nameExpertise}</span>
                                </div>
                                <div className='rounded-xl shadow-boxDetail'>
                                    <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-xl p-3'>نحوه پرداخت حق الزحمه :</p>
                                    <span className='flex text-gray-700 items-center gap-1 p-3'>{dataExpert?.employment.price}</span>
                                </div>
                            </div>
                            <div className='col-span-3'>
                                <p className='text-lg'>نرم افزار های درخواست شده :</p>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>#</StyledTableCell>
                                                <StyledTableCell>نرم افزار</StyledTableCell>
                                                <StyledTableCell>میزان خبرگی</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dataExpert?.employment.Software?.map((i, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{i.name}</TableCell>
                                                    <TableCell>{i.lvl}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div className='col-span-3 rounded-xl shadow-boxDetail'>
                                <p className='font-semibold block text-gray-600 bg-gray-100 rounded-t-xl p-3'>توضحات</p>
                                <span className='flex text-gray-700 items-center gap-1 p-3'>{dataExpert?.employment.desc}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={() => setOpen(false)}>بستن</Button>
                </DialogActions>
            </Dialog>
            <LackOfCoperation name={dataExpert?.expert.name || ""} open={openDis} setOpen={setOpenDis}
                cancelBtn={(val, value) => {
                    cancelExpert({ text: val, msg: value });
                }}
            />
        </>
    )
}
