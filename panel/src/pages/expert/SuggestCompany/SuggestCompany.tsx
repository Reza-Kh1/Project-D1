import { useState } from 'react'
import { BsBuildingsFill, BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material'
import CompanyDetail from '../../../components/CompanyDetail/CompanyDetail'
import CompanyCard from '../../../components/CompanyCard/CompanyCard'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSuggestCompany } from '../../../services/expert/suggestCompany'
import Pagination from '../../../components/Pagination/Pagination'
import { GetJobContactType, JobContactType } from '../../../types/typeExpert'
import axios from 'axios'
import PendingApi from '../../../components/PendingApi/PendingApi'
import LackOfCoperation from '../../../components/LackOfCoperation/LackOfCoperation'
import { FaHistory } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
export default function SuggestCompanyUser() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const query = queryString.parse(search) as any
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false)
  const [openCancel, setOpenCancel] = useState<boolean>(false)
  const [detailState, setDetailState] = useState<JobContactType>()
  const { data } = useQuery<GetJobContactType>({
    queryKey: ["suggestCompany", query],
    queryFn: () => fetchSuggestCompany(query),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const detailHandler = (detail: JobContactType) => {
    setDetailState(detail)
  }
  const { isPending: isAccept, mutate: acceptCompany } = useMutation({
    mutationFn: (idJob: number) => {
      const body = {
        approvedExpert: true
      }
      return axios.put(`jobContact/${idJob}`, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestCompany"] });
      toast.success("درخواست شما ارسال شد.");
      setOpen(false)
    },
    onError: (err: any) => {
      toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
      console.log(err);
      setOpen(false)
    },
  });
  const { isPending: isCancel, mutate: cancelCompany } = useMutation({
    mutationFn: ({ text, msg }: { text: string; msg: string[] }) => {
      const body = {
        approvedExpert: false,
        message: text,
        isDelete: true,
        detailMessage: msg,
      }
      return axios.put(`jobContact/${detailState?.id}`, body)
    },
    onSuccess: () => {
      setOpen(false)
      setOpenCancel(false)
      queryClient.invalidateQueries({ queryKey: ["suggestCompany"] });
      toast.success("پروژه رد شد.");
    },
    onError: (err: any) => {
      setOpen(false)
      setOpenCancel(true)
      toast.warning(err?.response?.data?.message || "با خطا مواجه شدیم");
    },
  });
  return (
    <>
      {(isAccept || isCancel) && <PendingApi />}
      {<div className='flex justify-between mb-6 items-center'>
        <h1 className='font-semibold text-xl mb-3'>صندوق پیشنهادات</h1>
        <div className='flex items-center gap-5'>
          <Button endIcon={<BsBuildingsFill />} onClick={() => navigate("/expert/suggest", { replace: true })} variant={query.last !== "true" ? "contained" : "outlined"} color='primary'>
            نمایش شرکت های فعلی
          </Button>
          <Button endIcon={<FaHistory />} onClick={() => navigate("?last=true&page=1", { replace: true })} variant={query.last === "true" ? "contained" : "outlined"} color='primary'>
            تاریخچه درخواست ها
          </Button>
        </div>
      </div>}
      <p className='leading-8'>
        به دنیای فرصت‌های شغلی خوش آمدید! در این صفحه می‌توانید شرکت‌هایی را مشاهده کنید که شرایط و نیازهای شغلی آن‌ها با مهارت‌ها و علاقه‌مندی‌های شما هماهنگ است. هدف ما این است که مسیر شما برای پیدا کردن شغل ایده‌آل آسان‌تر و سریع‌تر شود.
        <Tooltip title="در صورت تایید توسط شرکت به شما اطلاع خواهد داده شد.">
          <IconButton>
            <BsInfoCircle className='inline mr-1 cursor-pointer' />
          </IconButton>
        </Tooltip>
      </p>
      <div className='grid grid-cols-4 mt-8 gap-5'>
        {data?.data?.length ? data?.data?.map((i, index) => (
          <CompanyCard isLast={i.approvedExpert} onOpen={setOpen} acceptBtn={acceptCompany} dataJob={i} cancelBtn={() => setOpenCancel(true)} data={i.employment} key={index} setDetail={detailHandler} />
        )) :
          <span>
            هیچ پیشنهادی یافت نشد.
          </span>
        }
      </div>
      <Pagination pager={data?.pagination} />
      <Dialog
        fullScreen
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className='w-full justify-between flex'>
            {detailState?.employment.company.name}
            <IconButton onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='grid grid-cols-4 gap-5 pt-3'>
            <CompanyDetail detailState={detailState?.employment} approvedCompany={detailState?.approvedCompany} />
          </div>
        </DialogContent>
      </Dialog>
      <LackOfCoperation name={detailState?.employment.company.name || ""} open={openCancel} setOpen={setOpenCancel}
        cancelBtn={(val, value) => {
          cancelCompany({ text: val, msg: value });
        }}
      />
    </>
  )
}
