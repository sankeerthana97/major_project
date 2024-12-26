"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'

interface ChapterStatus {
  name: string;
  completed: boolean;
  timeSpent: number; // in seconds
}

function CourseStart({params}: {params: {courseId: string}}) {
    const [course, setCourse] = useState<any>(null);
    const [selectedChapter, setSelectedChapter] = useState<any>(null);
    const [chapterContent, setChapterContent] = useState<any>(null);
    const [chapterStatuses, setChapterStatuses] = useState<ChapterStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);
    
    useEffect(() => {
        GetCourse();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [])

    useEffect(() => {
        if (selectedChapter) {
            startChapterTimer();
        }
    }, [selectedChapter]);

    const GetCourse = async () => {
        setIsLoading(true);
        try {
            const result = await db.select().from(CourseList)
                .where(eq(CourseList.courseId, params.courseId));
            if (result && result.length > 0) {
                setCourse(result[0]);
                if (result[0]?.courseOutput?.course?.chapters?.length > 0) {
                    const initialChapterStatuses = result[0].courseOutput.course.chapters.map((chapter: any) => ({
                        name: chapter.name,
                        completed: false,
                        timeSpent: 0
                    }));
                    setChapterStatuses(initialChapterStatuses);
                    setSelectedChapter(result[0].courseOutput.course.chapters[0]);
                    GetSelectedChapterContent(0);
                }
            }
        } catch (error) {
            console.error("Error fetching course:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const GetSelectedChapterContent = async (chapterId: number) => {
        try {
            const result = await db.select().from(Chapters)
                .where(and(eq(Chapters.chapterId, chapterId),
                    eq(Chapters.courseId, course?.courseId)));
            if (result && result.length > 0) {
                setChapterContent(result[0]);
            }
        } catch (error) {
            console.error("Error fetching chapter content:", error);
        }
    }

    const startChapterTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTimeRef.current!) / 1000);
            setChapterStatuses(prevStatuses => {
                if (!prevStatuses) return [];
                const newStatuses = [...prevStatuses];
                const currentChapterIndex = course?.courseOutput?.course?.chapters?.findIndex(
                    (chapter: any) => chapter.name === selectedChapter?.name
                );
                if (currentChapterIndex !== undefined && currentChapterIndex !== -1 && newStatuses[currentChapterIndex]) {
                    newStatuses[currentChapterIndex].timeSpent = elapsedSeconds;
                }
                return newStatuses;
            });
        }, 1000);
    }

    const handleNextChapter = () => {
        if (!course?.courseOutput?.course?.chapters) return;
        
        const currentIndex = course.courseOutput.course.chapters.findIndex(
            (chapter: any) => chapter.name === selectedChapter?.name
        );
        if (currentIndex !== -1) {
            setChapterStatuses(prevStatuses => {
                const newStatuses = [...prevStatuses];
                if (newStatuses[currentIndex]) {
                    newStatuses[currentIndex].completed = true;
                }
                return newStatuses;
            });
            if (currentIndex < course.courseOutput.course.chapters.length - 1) {
                const nextChapter = course.courseOutput.course.chapters[currentIndex + 1];
                setSelectedChapter(nextChapter);
                GetSelectedChapterContent(currentIndex + 1);
                if (contentRef.current) {
                    contentRef.current.scrollTop = 0;
                }
            }
        }
    }

    const handleTakeTest = () => {
        window.location.href = 'https://xnhurfu2ealdnmle.vercel.app/';
    }

    const isLastChapter = selectedChapter && course?.courseOutput?.course?.chapters &&
        course.courseOutput.course.chapters.indexOf(selectedChapter) === 
        course.courseOutput.course.chapters.length - 1;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const CompletionStatusBar = () => {
        if (!chapterStatuses || chapterStatuses.length === 0) return null;

        const completedChapters = chapterStatuses.filter(chapter => chapter.completed).length;
        const totalChapters = chapterStatuses.length;
        const progressPercentage = (completedChapters / totalChapters) * 100;
        const currentChapterIndex = course?.courseOutput?.course?.chapters?.findIndex(
            (chapter: any) => chapter.name === selectedChapter?.name
        ) ?? -1;

        return (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Course Progress</h3>
                    <span>{completedChapters} / {totalChapters} Chapters</span>
                </div>
                <Progress value={progressPercentage} className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chapterStatuses.map((chapter, index) => (
                        <div 
                            key={index} 
                            className={`p-2 rounded ${
                                chapter.completed 
                                    ? 'bg-green-100 text-green-800' 
                                    : index === currentChapterIndex 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            <div className="font-medium">{chapter.name}</div>
                            <div className="text-sm">
                                {chapter.completed 
                                    ? `Completed in ${formatTime(chapter.timeSpent)}` 
                                    : index === currentChapterIndex 
                                        ? 'In progress' 
                                        : 'Not started'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const ChapterListCard = ({ chapter, index }: { chapter: any, index: number }) => (
        <div className="p-4 border-b">
            <h3 className="font-medium">{chapter.name}</h3>
            <p className="text-sm text-gray-500">Chapter {index + 1}</p>
        </div>
    );

    const ChapterContent = ({ chapter, content }: { chapter: any, content: any }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">{chapter?.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: content?.chapterContent }} />
        </div>
    );

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!course || !course.courseOutput || !course.courseOutput.course) {
        return <div className="flex justify-center items-center h-screen">Course not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Back Button */}
            <div className="p-4 border-b">
                <Link href="https://major-project-eosin-sigma.vercel.app/">
                    <Button variant="ghost" className="flex items-center gap-2">
                        ← Back to Courses
                    </Button>
                </Link>
            </div>
            
            <div className="flex flex-1">
                {/* Chapter list Side Bar */}
                <div className='w-72 hidden md:block h-[calc(100vh-65px)] border-r shadow-sm overflow-y-auto'>
                    <h2 className='font-medium text-lg bg-primary p-4 text-white'>
                        {course.courseOutput.course.name}
                    </h2>
                    <div>
                        {course.courseOutput.course.chapters.map((chapter: any, index: number) => (
                            <div 
                                key={index} 
                                className={`cursor-pointer hover:bg-purple-50 
                                ${selectedChapter?.name === chapter?.name ? 'bg-purple-100' : ''}`}
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
                    {/* Completion Status Bar */}
                    <CompletionStatusBar />

                    <ChapterContent chapter={selectedChapter} content={chapterContent} />
                    
                    {/* Next Chapter or Take Test Button */}
                    <div className="mt-8">
                        {!isLastChapter ? (
                            <Button 
                                onClick={handleNextChapter}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Next Chapter
                            </Button>
                        ) : (
                            <Button 
                                onClick={handleTakeTest}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
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

