import React from 'react'
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from './EditChapters';

function ChapterList({course, refreshData, edit=true}) {
  return (
    <div className='mt-3'>
        <h2 className='font-medium text-2xl text-pink-800'>Chapters</h2>
        <div className='mt-2'>
            {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
               <div key={index} className='border border-pink-200 p-5 rounded-lg mb-2 flex items-center justify-between hover:bg-pink-50 transition-colors'>
                <div className='flex gap-5 items-center'>
                        <h2 className='bg-pink-600 flex-none h-10 w-10 text-white rounded-full text-center p-2'>{index+1}</h2>
                        <div className=''>
                            <h2 className='font-medium text-lg text-pink-700'>
                                {chapter?.name}
                                {edit && <EditChapters course={course} index={index} refreshData={refreshData} />}
                            </h2>
                            <p className='text-sm text-pink-500'>{chapter?.about}</p>
                            <p className='flex gap-2 text-pink-600 items-center'>
                                <HiOutlineClock className="text-pink-500" /> {chapter?.duration}
                            </p>
                        </div>
                    </div>
                    <HiOutlineCheckCircle className='text-4xl text-pink-300 flex-none' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList

