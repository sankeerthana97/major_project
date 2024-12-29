"use client"
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Course({params}) {
    const [course,setCourse]=useState();
    useEffect(()=>{
        params&&GetCourse();
    },[params])

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))

        setCourse(result[0]);
        console.log(result);
    }

  return (
    <div className="bg-pink-50 min-h-screen">
        <Header/>
        <div className='px-6 py-8 md:px-12 lg:px-20'>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <CourseBasicInfo course={course} edit={false} />
            <CourseDetail course={course} />
            <ChapterList course={course}  edit={false}/>
          </div>
        </div>
        <h2 className='text-sm text-pink-700 text-center mb-10'>This course created on 
        <Link href={''} className="underline decoration-pink-500 hover:text-pink-800">
        LEARNING AI Course 
        </Link></h2>
    </div>
  )
}

export default Course

