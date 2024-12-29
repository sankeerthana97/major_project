import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@headlessui/react';
import { HiPencilSquare } from 'react-icons/hi2';
import { Button, Input, Textarea } from './components'; // Assuming these components exist


const EditCourseModal = ({ course, onUpdateHandler }) => {
  const [name, setName] = useState(course?.courseOutput?.course?.name || '');
  const [description, setDescription] = useState(course?.courseOutput?.course?.description || '');

  return (
    <Dialog as="div" className="relative z-10" onClose={() => {}}>
      <DialogTrigger>
        <HiPencilSquare className="text-pink-600 hover:text-pink-700 transition-colors" />
      </DialogTrigger>
      <DialogContent className="bg-pink-50 border border-pink-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-800">Edit Course Title & Description</DialogTitle>
          <DialogDescription className="text-pink-600">
            <div className='mt-3'>
              <label className="text-pink-700 font-medium">Course Title</label>
              <Input 
                defaultValue={course?.courseOutput?.course?.name}
                onChange={(event)=>setName(event?.target.value)}
                className="border-pink-300 focus:border-pink-500 focus:ring-pink-500 bg-white text-pink-800"
              />
            </div>
            <div className="mt-3">
              <label className="text-pink-700 font-medium">Description</label>
              <Textarea 
                className="h-40 border-pink-300 focus:border-pink-500 focus:ring-pink-500 bg-white text-pink-800" 
                defaultValue={course?.courseOutput?.course?.description}
                onChange={(event)=>setDescription(event?.target.value)}
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
  );
};

export default EditCourseModal;

