import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { BiSolidSend } from 'react-icons/bi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { AllChatType } from '../../../types/typeExpert'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { fetchApprovedChatExpert, fetchChatExpert } from '../../../services/expert/chat'
export default function ChatExpert() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLast, setIsLast] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const { data } = useQuery<{ data: AllChatType[] }>({
    queryKey: ["AllChatExpert"],
    queryFn: fetchChatExpert,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const { data: approvedChat, refetch } = useQuery<{ data: AllChatType[] }>({
    queryKey: ["ApprovedChatExpert"],
    queryFn: fetchApprovedChatExpert,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: isLast
  });
  const NavLink = ({ href, text, image }: { href: number, text: string, image?: string }) => {
    const className = `!bg-gradient-to-r transition-all group to-blue-200 !flex !justify-between !items-center hover:text-blue-50 hover:to-blue-400 from-gray-100 shadow-md w-full rounded-md p-3 hover:bg-gray-300 ${Number(id) === href ? " !to-blue-400 !text-white" : ""}`
    return <Button className={className} onClick={() => {
      navigate(`/expert/chat/${href}`, { replace: true });
    }}>
      <div className='flex items-center gap-5'>
        <img alt='profile' src={image || "/user.jpg"} className='w-8 shadow-md h-8 rounded-full object-contain' width={40} height={40} />
        {text}
      </div>
      <BiSolidSend className={`rotate-180 group-hover:text-blue-500 text-gray-600 text-xl ${href === Number(id) ? "!text-blue-500" : ""}`} />
    </Button>
  }
  useEffect(() => {
    if (isLast) {
      refetch()
    }
  }, [isLast])
  return (
    <div className='classDiv gap-3 flex min-h-[80vh]'>
      <div className='w-3/12 bg-slate-200 p-2 rounded-md shadow-md flex flex-col gap-2'>
        <h2 className='my-2 font-semibold'>گفتگو راجع به درخواست فعلی</h2>
        {data?.data.length ? data?.data.map((i, index) => (
          <NavLink href={i.id} text={i.company.name} key={index} image={"/company.png"} />
        )) :
          <span>
            هیچ گفتگویی در دسترس نیست.
          </span>
        }
        <button type='submit' onClick={() => {
          setIsShow(prev => !prev)
          if (!isLast) {
            setIsLast(true)
          }
        }} className='my-2 flex justify-between items-center bg-slate-50 p-2 rounded-md shadow-md font-semibold'>گفتگو درخواست های پیشین {isShow ? <MdKeyboardArrowDown size={24} /> : <MdKeyboardArrowUp size={24} />}</button>
        {isShow && (
          approvedChat?.data.length ?
            approvedChat?.data.map((i, index) => (
              <NavLink href={i.id} text={i.company.name} key={index} image={"/company.png"} />
            ))
            :
            <span>
              هیچ اطلاعاتی پیدا نشد.
            </span>
        )}
      </div>
      <Outlet />
      {id ? null :
        <div className='w-9/12 bg-slate-200 p-2 rounded-md shadow-md flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>برای شروع مکالمه یک مخاطب را انتخاب کنید.</h1>
        </div>
      }
    </div>
  )
}
