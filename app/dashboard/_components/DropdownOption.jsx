import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { HiOutlineTrash } from "react-icons/hi2";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

function DropdownOption({children, handleOnDelete}) {
    const [openAlert, setOpenAlert] = useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="text-violet-600 hover:text-violet-700">
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-violet-50 border-violet-200">
                    <DropdownMenuItem 
                        onClick={() => setOpenAlert(true)}
                        className="text-violet-700 hover:bg-violet-100 focus:bg-violet-100"
                    >
                        <div className='flex items-center gap-1'>
                            <HiOutlineTrash className="text-violet-600" /> Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openAlert}>
                <AlertDialogContent className="bg-violet-50 border-violet-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-violet-800">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-violet-600">
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            onClick={() => setOpenAlert(false)}
                            className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => {handleOnDelete(); setOpenAlert(false)}}
                            className="bg-violet-600 text-white hover:bg-violet-700"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DropdownOption

