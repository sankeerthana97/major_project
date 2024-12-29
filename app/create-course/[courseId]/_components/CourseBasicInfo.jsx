import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseBasicInfo({course, refreshData, edit=true}) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if(course) {
      setSelectedFile(course?.courseBanner)
    }
  }, [course])

  const onFileSelected = async(event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    const fileName = Date.now() + '.jpg'
    const storageRef = ref(storage, 'ai-course/' + fileName);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Upload File Complete')
    }).then(resp => {
      getDownloadURL(storageRef).then(async(downloadUrl) => {
        console.log(downloadUrl);

        await db.update(CourseList).set({
          courseBanner: downloadUrl
        }).where(eq(CourseList.id, course?.id))
      })
    })
  }

  return (
    <div className='p-10 border border-pink-200 rounded-xl shadow-sm mt-5 relative bg-pink-50'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='font-bold text-3xl text-pink-800'>
                  {course?.courseOutput?.course?.name} 
                  {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}
                </h2>
                <p className='text-sm text-pink-600 mt-3'>{course?.courseOutput?.course?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-pink-700'>
                  <HiOutlineRectangleStack className="text-pink-600" />
                  {course?.category}
                </h2>
                {!edit && (
                  <Link href={'/course/' + course?.courseId + "/start"}>
                    <Button className="w-full mt-5 bg-pink-600 hover:bg-pink-700 text-white">Start</Button>
                  </Link>
                )}
            </div>
            <div>
                <label htmlFor='upload-image'>
                  <Image 
                    src={selectedFile ? selectedFile : '/placeholder.png'} 
                    width={300} 
                    height={300}
                    alt="Course Banner"
                    className='w-full rounded-xl h-[250px] object-cover cursor-pointer border-4 border-pink-300 hover:border-pink-400 transition-colors'
                  />
                </label>
                {edit && (
                  <input 
                    type="file" 
                    id="upload-image" 
                    className='opacity-0' 
                    onChange={onFileSelected} 
                  />
                )}
            </div>
        </div>
    </div>
  )
}

export default CourseBasicInfo

