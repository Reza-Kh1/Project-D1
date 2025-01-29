"use client"
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaRegUserCircle, FaStar, FaUserPlus, FaUsers } from 'react-icons/fa'
import { TbLogin } from 'react-icons/tb'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Badge,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { MdMenuOpen } from 'react-icons/md'
import { FaAnglesRight, FaPen, FaUser } from 'react-icons/fa6'
import Image from 'next/image'
import { VscGraph } from 'react-icons/vsc'
import { PiMailbox } from 'react-icons/pi'
import { GiEntryDoor } from 'react-icons/gi'
import toast from 'react-hot-toast'
import NavLink from '../NavLink/NavLink'
import { BiSolidSend } from 'react-icons/bi'
import { HiBellAlert } from 'react-icons/hi2'
export default function BtnLogin() {
    const path = usePathname()
    const route = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLogin, setLogin] = useState<{ name: string, role: string } | null>(null)
    useEffect(() => {
        const local = localStorage.getItem("position")
        if (isOpen) {
            onOpenChange()
        }
        if (local) {
            const json = JSON.parse(local)
            if (json.login) {
                setLogin({ role: json.role || "", name: json.name || "" })
            }
        }
    }, [path])
    const signOut = () => {
        localStorage.setItem("position", "")
        toast.success("با موفقیت از حساب خارج شدید")
        route.push("/")
        setLogin(null)
        onOpenChange()
    }
    return isLogin === null || !isLogin.role ?
        <div className='flex items-center gap-2'>
            <Link href={"/login/user"}>
                <Button className='bg-grid'>
                    ورود متخصص
                    <FaRegUserCircle size={20} />
                </Button>
            </Link>
            <Link href={"/login/company"}>
                <Button className='bg-grid'>
                    ورود شرکت
                    <TbLogin size={20} />
                </Button>
            </Link>
        </div>
        :
        <div>
            <Button
                variant="shadow"
                onPress={onOpen}
                isIconOnly
                color='default'
            >
                <MdMenuOpen size={20} />
            </Button>
            <Drawer
                hideCloseButton
                backdrop="blur"
                classNames={{ base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium w-[350px]" }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="p-2 items-center flex justify-between border-b">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="flat" className='rounded-full'>
                                            <Badge content="1" className='text-center mx-auto' color='primary' shape='circle'>
                                                <HiBellAlert size={20} />
                                            </Badge>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Action event example">
                                        <DropdownItem key="new"><Link className='flex items-center gap-1' href={"/dashboard/message?name=ali"}>
                                        <HiBellAlert size={15} />
                                        پیام از طرف علی منصوری</Link></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <span className='text-sm flex gap-2 items-center font-medium  text-gray-600'>
                                    {new Date().toLocaleDateString("fa")}
                                    <FaCalendarAlt />
                                </span>
                                <Button
                                    isIconOnly
                                    className="text-default-400"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    <FaAnglesRight size={20} />
                                </Button>
                            </DrawerHeader>
                            <DrawerBody>
                                <div className='flex items-start gap-3'>
                                    <Image alt='profile' className='border rounded-full shadow-md' src={"/profile.jpg"} width={140} height={140} />
                                    <div className='flex flex-col gap-3 justify-center h-full'>
                                        <span>
                                            <FaUser className='inline text-blue-500 ml-3' />
                                            علی جواد مقدم
                                        </span>
                                        {isLogin.role === "user" ?
                                            <span>
                                                <VscGraph className='inline text-blue-500 ml-3' />
                                                امتیاز کاربر : 4.3
                                            </span>
                                            :
                                            <span>
                                                <FaUsers className='inline text-blue-500 ml-3' />
                                                نام شرکت : بهین علم فراجهان
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className='w-full mt-5 flex flex-col gap-3'>
                                    <NavLink href={`/dashboard/${isLogin.role === "user" ? "user" : "company"}`} name='حساب کاربری' icon={<FaPen className='text-xl' />} />
                                    {isLogin.role !== "user" ? <NavLink name='ایجاد درخواست' href='/dashboard/company/employment' icon={<FaUserPlus className='text-xl' />} /> : null}
                                    <NavLink name='صندوق دریافت پیشنهاد ها' href={`/dashboard/${isLogin.role === "user" ? "user" : "company"}/offer-fund`} icon={<PiMailbox className='text-xl' />} />
                                    <NavLink name='پیام ها' href={"/dashboard/message"} icon={<BiSolidSend className='text-xl rotate-180' />} />
                                    <NavLink href={`/dashboard/rats`} icon={<FaStar className='text-xl' />} name='امتیاز دهی' />
                                    <button type='button' onClick={signOut} className='flex justify-between bg-gradient-to-l from-blue-500 text-white to-slate-400 hover:shadow-gray-500 transition-all items-center rounded-md shadow-md p-3 w-full'>
                                        خروج
                                        <GiEntryDoor className='text-xl' />
                                    </button>
                                </div>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div >
}