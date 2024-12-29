import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';

function EditChapters({course, index, refreshData}) {
    const Chapters = course?.courseOutput?.course?.chapters;
    const [name, setName] = useState();
    const [about, setAbout] = useState();

    useEffect(() => {
        setName(Chapters[index].name);
        setAbout(Chapters[index].about)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.course.chapters[index].name = name;
        course.courseOutput.course.chapters[index].about = about;

        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
        .returning({id: CourseList.id});

        console.log(result);
        refreshData(true)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <HiPencilSquare className="text-pink-600 hover:text-pink-700 transition-colors" />
            </DialogTrigger>
            <DialogContent className="bg-pink-50 border border-pink-200">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-pink-800">Edit Chapter</DialogTitle>
                    <DialogDescription className="text-pink-600">
                        <div className='mt-3'>
                            <label className="text-pink-700 font-medium">Course Title</label>
                            <Input 
                                defaultValue={Chapters[index].name}
                                onChange={(event) => setName(event?.target.value)}
                                className="border-pink-300 focus:border-pink-500 focus:ring-pink-500 bg-white text-pink-800"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-pink-700 font-medium">Description</label>
                            <Textarea 
                                className="h-40 border-pink-300 focus:border-pink-500 focus:ring-pink-500 bg-white text-pink-800" 
                                defaultValue={Chapters[index].about}
                                onChange={(event) => setAbout(event?.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button 
                            onClick={onUpdateHandler}
                            className="bg-pink-600 hover:bg-pink-700 text-white transition-colors"
                        >
                            Update
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditChapters

