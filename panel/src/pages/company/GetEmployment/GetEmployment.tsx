import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { EmploymentType, GetEmploymentType } from '../../../types/typeCompany';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchgetEmployment } from '../../../services/company/getEmployment';
import { FaCheck, FaTrash } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';
import PendingApi from '../../../components/PendingApi/PendingApi';
import { useState } from 'react';
import { IoEye } from 'react-icons/io5';
import queryString from 'query-string';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function GetEmploymentCompany() {
  const { search } = useLocation()
  const query = queryString.parse(search) as any
  const [dataDel, setDataDel] = useState<EmploymentType>()
  const [open, setOpen] = useState<boolean>(false)
  const queryClient = useQueryClient();
  const { data } = useQuery<GetEmploymentType>({
    queryKey: ["GetAllEmployment", query],
    queryFn: fetchgetEmployment,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const { isPending: isPendingPost1, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`employment/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllEmployment"] });
      toast.info(".درخواست شما حذف شد");
      setOpen(false)
    },
    onError: (err: any) => {
      toast.warning("با خطا مواجه شدیم");
      setOpen(false)
      console.log(err);
    },
  });
  if (!data?.data.length) {
    return <span>
      هیچ درخواستی ثبت نشده.
    </span>
  }
  return (
    <>
      {isPendingPost1 && <PendingApi />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">نوع تخصص</StyledTableCell>
              <StyledTableCell align="center">وضعیت</StyledTableCell>
              <StyledTableCell align="center">جنسیت متخصص</StyledTableCell>
              <StyledTableCell align="center">نحوه پرداخت</StyledTableCell>
              <StyledTableCell align="center">تاریخ آغاز پروژه</StyledTableCell>
              <StyledTableCell align="center">تاریخ ثبت درخواست</StyledTableCell>
              <StyledTableCell align="center">جزئیات</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{row.nameExpertise}</StyledTableCell>
                <StyledTableCell align="center">{row.isDone ?
                  <span className='bg-blue-500/80 text-white justify-center flex items-center gap-2 shadow-md p-3 rounded-md'>
                    تکمیل شده
                    <FaCheck />
                  </span>
                  :
                  <span className='bg-green-500/80 text-white justify-center flex items-center gap-2 shadow-md p-3 rounded-md'>
                    در دسترس
                    <IoEye />
                  </span>
                }</StyledTableCell>
                <StyledTableCell align="center">{row.gender === "MAN" ? "مرد" : row.gender === "WOMAN" ? "زن" : "تفاوتی ندارد"}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{new Date(row.startProject).toLocaleDateString("fa")}</StyledTableCell>
                <StyledTableCell align="center">{new Date(row.createdAt).toLocaleDateString("fa")}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.isDone ?
                    <div className='w-full justify-between gap-4 flex items-center'>
                      <Button disabled variant='outlined' color='error' endIcon={<FaTrash />}>
                        حذف
                      </Button>
                      <Button disabled variant='outlined' color='primary' endIcon={<BsClipboard2DataFill />}>
                        جزئیات
                      </Button>
                    </div> :
                    <div className='w-full justify-between gap-4 flex items-center'>
                      <Button variant='outlined' color='error' endIcon={<FaTrash />} onClick={() => { setOpen(true), setDataDel(row) }}>
                        حذف
                      </Button>
                      <Link to={`/company/employment/${row.id}`}>
                        <Button variant='outlined' color='primary' endIcon={<BsClipboard2DataFill />}>
                          جزئیات
                        </Button>
                      </Link>
                    </div>
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination pager={data.pagination} />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">
          <div className='flex justify-between items-center w-full'>
            {dataDel?.nameExpertise}
            <IconButton onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          آیا از حذف درخواست <span className='underline font-semibold'>{dataDel?.nameExpertise}</span> اطمینان دارید ؟
        </DialogContent>
        <DialogActions>
          <div className='flex justify-between w-full'>

            <Button variant='contained' endIcon={<FaTrash />} color='primary' onClick={() => { if (dataDel?.id) { mutate(dataDel?.id) } }}>
              حذف
            </Button>
            <Button variant='contained' endIcon={<MdClose />} color='error' onClick={() => setOpen(false)}>
              بستن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}
