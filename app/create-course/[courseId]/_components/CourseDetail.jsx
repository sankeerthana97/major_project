import React from 'react'
import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlinePlayCircle } from "react-icons/hi2";

function CourseDetail({course}) {
  return (
    <div className='border border-blue-200 p-6 rounded-xl shadow-sm mt-3 bg-blue-50'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            <div className='flex gap-2'>
                <HiOutlineChartBar className='text-4xl text-violet-600' />
                <div>
                    <h2 className='text-xs text-blue-500'>Skill Level</h2>
                    <h2 className='font-medium text-lg text-violet-800'>{course?.level}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineClock className='text-4xl text-violet-600' />
                <div>
                    <h2 className='text-xs text-blue-500'>Duration</h2>
                    <h2 className='font-medium text-lg text-violet-800'>{course?.courseOutput?.course?.duration}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineBookOpen className='text-4xl text-violet-600' />
                <div>
                    <h2 className='text-xs text-blue-500'>No Of Chapters</h2>
                    <h2 className='font-medium text-lg text-violet-800'>{course?.courseOutput?.course?.numberOfChapters}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlinePlayCircle className='text-4xl text-violet-600' />
                <div>
                    <h2 className='text-xs text-blue-500'>Video Included?</h2>
                    <h2 className='font-medium text-lg text-violet-800'>{course?.includeVideo}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail
