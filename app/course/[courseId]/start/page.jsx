"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState, useRef } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function CourseStart({params}) {
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [chapterContent, setChapterContent] = useState();
    const contentRef = useRef(null);
    
    useEffect(() => {
        GetCourse();
    }, [])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));
        setCourse(result[0]);
        if (result[0]?.courseOutput?.course?.chapters.length > 0) {
            setSelectedChapter(result[0].courseOutput.course.chapters[0]);
            GetSelectedChapterContent(0);
        }
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)));
        setChapterContent(result[0]);
    }

    const handleNextChapter = () => {
        const currentIndex = course.courseOutput.course.chapters.findIndex(
            chapter => chapter.name === selectedChapter.name
        );
        if (currentIndex < course.courseOutput.course.chapters.length - 1) {
            const nextChapter = course.courseOutput.course.chapters[currentIndex + 1];
            setSelectedChapter(nextChapter);
            GetSelectedChapterContent(currentIndex + 1);
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
        }
    }

    const handleTakeTest = () => {
        window.location.href = 'https://xnhurfu2ealdnmle.vercel.app/';
    }

    const isLastChapter = selectedChapter && 
        course?.courseOutput?.course?.chapters.indexOf(selectedChapter) === 
        course?.courseOutput?.course?.chapters.length - 1;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Back Button */}
            <div className="p-4 border-b">
                <Link href="https://major-project-eosin-sigma.vercel.app/dashboard">
                    <Button variant="ghost" className="flex items-center gap-2">
                        ← Back to Courses
                    </Button>
                </Link>
            </div>
            
            <div className="flex flex-1">
                {/* Chapter list Side Bar */}
                <div className='w-72 hidden md:block h-[calc(100vh-65px)] border-r shadow-sm overflow-y-auto'>
                    <h2 className='font-medium text-lg bg-pink-600 p-4 text-white'>
                        {course?.courseOutput?.course?.name}
                    </h2>
                    <div>
                        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                            <div 
                                key={index} 
                                className={`cursor-pointer hover:bg-pink-50 
                                ${selectedChapter?.name === chapter?.name ? 'bg-pink-100' : ''}`}
                                onClick={() => {
                                    setSelectedChapter(chapter);
                                    GetSelectedChapterContent(index);
                                    if (contentRef.current) {
                                        contentRef.current.scrollTop = 0;
                                    }
                                }}
                            >
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Content Div */}
                <div className='flex-1 p-6 overflow-y-auto' ref={contentRef}>
                    <ChapterContent chapter={selectedChapter} content={chapterContent} />
                    
                    {/* Next Chapter or Take Test Button */}
                    <div className="mt-8">
                        {!isLastChapter ? (
                            <Button 
                                onClick={handleNextChapter}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                            >
                                Next Chapter
                            </Button>
                        ) : (
                            <Button 
                                onClick={handleTakeTest}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                            >
                                Take Final Test
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseStart

