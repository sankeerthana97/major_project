import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


function CourseCard({course,refreshData,displayUser=false}) {

    const handleOnDelete=async()=>{
        const resp=await db.delete(CourseList)
        .where(eq(CourseList.id,course?.id))
        .returning({id:CourseList?.id})
        
        if(resp)
        {
            refreshData()
        }
    }

  return (
    <div className='shadow-sm rounded-lg border border-pink-200 p-2
     cursor-pointer mt-4 hover:border-pink-500'>
        <Link href={'/course/'+course?.courseId}>
            <Image src={course?.courseBanner} width={300} height={200}
            className='w-full h-[200px] object-cover rounded-lg'
            />
        </Link>
        <div className='p-2'>
            <h2 className='font-medium text-lg flex justify-between items-center text-pink-800'>{course?.courseOutput?.course?.name}
            
           {!displayUser&& <DropdownOption
            handleOnDelete={()=>handleOnDelete()}
            ><HiMiniEllipsisVertical className="text-pink-600"/></DropdownOption>}
            </h2>
            
            <p className='text-sm text-pink-400 my-1'>{course?.category}</p>
            <div className='flex items-center justify-between'>
                <h2 className='flex gap-2 items-center
                 p-1 bg-pink-50 text-pink-600 text-sm rounded-sm'>
                    <HiOutlineBookOpen className="text-pink-500"/>{course?.courseOutput?.course?.numberOfChapters} Chapters</h2>
                <h2 className='text-sm bg-pink-50 text-pink-600 p-1 rounded-sm'>{course?.level}</h2>
            
            </div>
          {displayUser&&  <div className='flex gap-2 items-center mt-2'>
                <Image src={course?.userProfileImage} width={35} height={35}
                className='rounded-full'
                />
                <h2 className='text-sm text-pink-700'>{course?.userName}</h2>
            </div>}
        </div>
    </div>
  )
}

export default CourseCard

