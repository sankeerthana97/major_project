"use client"

import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function CourseStart({params}) {
    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState(0)
    const [chapterContent, setChapterContent] = useState()
    const router = useRouter()

    useEffect(() => {
        GetCourse()
    }, [])

    /**
     * Used to get Course Info by Course Id
     */
    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(result[0])
        if (result[0]?.courseOutput?.course?.chapters.length > 0) {
            setSelectedChapter(result[0].courseOutput.course.chapters[0])
            GetSelectedChapterContent(0)
        }
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(
                eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)
            ))

        setChapterContent(result[0])
    }

    const handleNextChapter = () => {
        const currentIndex = course.courseOutput.course.chapters.findIndex(
            chapter => chapter.name === selectedChapter.name
        )
        if (currentIndex < course.courseOutput.course.chapters.length - 1) {
            const nextChapter = course.courseOutput.course.chapters[currentIndex + 1]
            setSelectedChapter(nextChapter)
            GetSelectedChapterContent(currentIndex + 1)
        }
    }

    const isLastChapter = selectedChapter?.name === course?.courseOutput?.course?.chapters[course?.courseOutput?.course?.chapters.length - 1]?.name

    return (
        <div>
            {/* Chapter list Side Bar  */}
            <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-primary p-4 text-white'>
                    {course?.courseOutput?.course?.name}
                </h2>

                <div>
                    {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                        <div 
                            key={index} 
                            className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.name === chapter?.name ? 'bg-purple-100' : ''}`}
                            onClick={() => {
                                setSelectedChapter(chapter)
                                GetSelectedChapterContent(index)
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Content Div  */}
            <div className='md:ml-72'>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
                <div className="p-4">
                    {!isLastChapter ? (
                        <Button onClick={handleNextChapter}>NEXT CHAPTER</Button>
                    ) : (
                        <Button onClick={() => router.push('https://xnhurfu2ealdnmle.vercel.app/')}>TAKE TEST</Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseStart

