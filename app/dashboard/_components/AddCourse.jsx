"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

function AddCourse() {
    const {user}=useUser();
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext)


    return (
    <div className='flex items-center justify-between'>
        <div>
            <h2 className='text-3xl text-pink-800'>Hello, 
            <span className='font-bold text-pink-900'>{user?.fullName}</span></h2>
            <p className='text-sm text-pink-600'>Create new course with AI, Share with friends and Earn from it</p>
        </div>
        <Link href={userCourseList?.length>=100000?'https://www.tubeguruji.com/tubeguruji-pro':'/create-course'}>
             <Button className="bg-pink-600 hover:bg-pink-700 text-white">+ Create AI Course</Button>
        </Link>
    </div>
  )
}

export default AddCourse

