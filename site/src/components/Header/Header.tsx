import React from 'react'
import BtnLogin from './BtnLogin'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { FaRegUserCircle } from 'react-icons/fa'
import { PiBuildingsFill } from 'react-icons/pi'
export default function Header() {
    return (
        <header className='w-full h-full pt-3'>
            <section className='p-3 mb-6 bg-gray-200 w-11/12 mx-auto rounded-md shadow-md justify-between flex items-center'>
                {/* <BtnLogin /> */}
                <div className='flex gap-3'>
                    <Link href={"/company"}>
                        <Button className='bg-grid'>
                            ورود شرکت ها
                            <PiBuildingsFill size={20} />
                        </Button>
                    </Link>
                    <Link href={"/expert"}>
                        <Button className='bg-grid'>
                            ورود متخصصین
                            <FaRegUserCircle size={20} />
                        </Button>
                    </Link>
                </div>
                <ul className='flex gap-1 items-center w-1/3 justify-between'>
                    <li>menu 1</li>
                    <li>menu 2</li>
                    <li>menu 3</li>
                    <li>menu 4</li>
                    <li>menu 5</li>
                </ul>
                <Link href={"/"}>logo site</Link>
            </section>
        </header>
    )
}
