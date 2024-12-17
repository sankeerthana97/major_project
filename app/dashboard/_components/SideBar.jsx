"use client"
import { Progress } from '@/components/ui/progress';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiOutlineHome,HiOutlineSquare3Stack3D,HiOutlineShieldCheck,HiOutlinePower } from "react-icons/hi2";
;
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function SideBar() {
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<HiOutlineHome />,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Explore',
            icon:<HiOutlineSquare3Stack3D />,
            path:'/dashboard/explore'
        },
        {
            id:1,
            name:'Upgrade',
            icon:<HiOutlineShieldCheck />,
            path:'/dashboard/upgrade'
        },
        {
            id:1,
            name:'Logout',
            icon:<HiOutlinePower />,
            path:'/dashboard/logout'
        }
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={'/logo.svg'} width={160} height={100} />
        <hr className='my-5' />

        <ul>
            {Menu.map((item,index)=>(
                <Link href={item.path}>
                    <div className={`flex items-center gap-2 text-gray-600
                    p-3 cursor-pointer hover:bg-gray-100
                    hover:text-black rounded-lg mb-3
                    ${item.path==path&&'bg-gray-100 text-black'}`}> 
                        <div className='text-2xl'>{item.icon}</div>
                        <h2>{item.name}</h2>
                    </div>
                </Link>
            ))}
        </ul>

        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={(userCourseList?.length/5)*100} />
            <h2 className='text-sm my-2'>{userCourseList?.length} Out of 5 Course created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimted course generate</h2>

        </div>
    </div>
  )
}

export default SideBar