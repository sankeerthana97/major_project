"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

function CourseStart({params}: {params: {courseId: string}}) {
    const [course,setCourse]=useState<any>();
    const [selectedChapter,setSelectedChapter]=useState<any>(0);
    const [chapterContent,setChapterContent]=useState<any>();
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("Component mounted - Fetching course data...")
        GetCourse();
    },[])

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList.courseId,params.courseId));
        
        console.log("Course data fetched:", result[0]);
        setCourse(result[0]);
    }

    const GetSelectedChapterContent=async(chapterId: number)=>{
        if (!course?.courseId) return;
        
        console.log("Fetching content for chapter ID:", chapterId);
        
        const result=await db.select().from(Chapters)
        .where(and(
            eq(Chapters.chapterId,chapterId),
            eq(Chapters.courseId,course.courseId)
        ));

        console.log("Chapter content fetched:", result[0]);
        setChapterContent(result[0]);
    }

    const handleBack = () => {
        navigate('https://major-project-eosin-sigma.vercel.app/');
    }

    const handleTakeTest = () => {
        window.location.href = 'https://xnhurfu2ealdnmle.vercel.app/';
    }

    // Log state changes
    useEffect(() => {
        console.log("Current course state:", course);
    }, [course]);

    useEffect(() => {
        console.log("Current selected chapter:", selectedChapter);
    }, [selectedChapter]);

    useEffect(() => {
        console.log("Current chapter content:", chapterContent);
    }, [chapterContent]);

  return (
    <div>
        {/* Back Button */}
        <div className="fixed top-4 left-4 z-10">
            <Button 
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
            >
                ← Back
            </Button>
        </div>

        {/* Chapter list Side Bar  */}
        <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
            <h2 className='font-medium text-lg bg-primary p-4
            text-white'>{course?.courseOutput?.course?.name}</h2>

            <div>
                {course?.courseOutput?.course?.chapters?.map((chapter: any,index: number)=>(
                    <div key={index} 
                    className={`cursor-pointer
                    hover:bg-purple-50
                    ${selectedChapter?.name==chapter?.name&&'bg-purple-100'}
                    `}
                    onClick={()=>{
                        console.log("Chapter clicked:", chapter);
                        setSelectedChapter(chapter);
                        GetSelectedChapterContent(index)
                    }}
                    >
                        <ChapterListCard chapter={chapter} index={index} />
                    </div>
                ))}

                {/* Take Test Button */}
                <div className="p-4 border-t">
                    <Button 
                        className="w-full"
                        onClick={handleTakeTest}
                    >
                        Take Test
                    </Button>
                </div>
            </div>
        </div>
        {/* Content Div  */}
        <div className='md:ml-72'>
            <ChapterContent chapter={selectedChapter}
                content={chapterContent}
            />
        </div>
    </div>
  )
}

export default CourseStart
