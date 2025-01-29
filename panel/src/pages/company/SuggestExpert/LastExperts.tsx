import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { GetJobContactCompany, jobContactCompany } from '../../../types/typeCompany';
import { searchSuggestExpert } from '../../../services/company/suggestExpert';
import queryString from 'query-string';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { MdClose } from 'react-icons/md';
import UserDetail from '../../../components/UserDetail/UserDetail';
import Pagination from '../../../components/Pagination/Pagination';
import ExpertCard from '../../../components/ExpertCard/ExpertCard';
import axios from 'axios';
import { ExpertType } from '../../../types/typeExpert';
type LastExpertsType = {
    isShow: boolean
}
export default function LastExperts({ isShow }: LastExpertsType) {
    const { search } = useLocation();
    const [searchQuery, setSearchQuery] = useState<any>();
    const [idExpert, setIdExpert] = useState<any>();
    const [open, setOpen] = useState<boolean>(false)
    const [dataExpert, setDataExpert] = useState<jobContactCompany>()
    const getData = async (id: string) => {
        const { data } = await axios.get(`expert?id=${id}`);
        return data;
    }
    const { data: singleExpert, refetch } = useQuery<ExpertType>({
        queryKey: ["SingleExpert", idExpert],
        queryFn: () => getData(idExpert),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        enabled: false
    });
    const { data } = useInfiniteQuery<GetJobContactCompany>({
        queryKey: ["AllExperts", searchQuery],
        queryFn: () => searchSuggestExpert(searchQuery),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        getNextPageParam: (lastPage) => lastPage.pagination.nextPage || undefined,
        initialPageParam: "",
    });
    useEffect(() => {
        if (idExpert) {
            refetch()
        }
    }, [idExpert])
    useEffect(() => {
        const query = queryString.parse(search);
        setSearchQuery(query);
    }, [search]);
    return (
        <>
            {isShow ?
                data?.pages[0].data.length ?
                    <>
                        <h2 className='my-5'>لیست متخصصین برای درخواست های پیشین.</h2>
                        <div className='grid grid-cols-4 gap-4'>
                            {data?.pages[0].data.map((i, index) => (
                                <ExpertCard data={i} key={index} lastExpert={true} getSingleData={(val) => setIdExpert(val)} setDataExpert={setDataExpert} setOpen={setOpen} jobId={1} />
                            ))}
                        </div>
                        <Pagination pager={data?.pages[0].pagination} />
                    </>
                    : <span>هیچ اطلاعاتی یافت نشد.</span>
                :
                null
            }
            {singleExpert ?
                <Dialog
                    fullScreen
                    fullWidth
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div className='w-full flex justify-between items-center pt-8'>
                            {singleExpert?.name}
                            <IconButton onClick={() => setOpen(false)}>
                                <MdClose />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='grid grid-cols-5 gap-5'>
                            <UserDetail detailState={singleExpert} />
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
                : null}

        </>
    )
}
