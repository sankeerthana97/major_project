import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
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
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function EditCourseBasicInfo({course, refreshData}) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setName(course?.courseOutput?.course?.name);
        setDescription(course?.courseOutput?.course?.description);
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.course.name = name;
        course.courseOutput.course.description = description;
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
        .returning({id: CourseList.id});

        refreshData(true)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <HiPencilSquare className="text-violet-600 hover:text-violet-700 transition-colors" />
            </DialogTrigger>
            <DialogContent className="bg-blue-50 border border-blue-200">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-violet-800">Edit Course Title & Description</DialogTitle>
                    <DialogDescription className="text-blue-600">
                        <div className='mt-3'>
                            <label className="text-violet-700 font-medium">Course Title</label>
                            <Input 
                                defaultValue={course?.courseOutput?.course?.name}
                                onChange={(event) => setName(event?.target.value)}
                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-violet-800"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-violet-700 font-medium">Description</label>
                            <Textarea 
                                className="h-40 border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-violet-800" 
                                defaultValue={course?.courseOutput?.course?.description}
                                onChange={(event) => setDescription(event?.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button 
                            onClick={onUpdateHandler}
                            className="bg-violet-600 hover:bg-violet-700 text-white transition-colors"
                        >
                            Update
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseBasicInfo
