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
                <DropdownMenuTrigger className="text-pink-600 hover:text-pink-700">
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-pink-50 border-pink-200">
                    <DropdownMenuItem 
                        onClick={() => setOpenAlert(true)}
                        className="text-pink-700 hover:bg-pink-100 focus:bg-pink-100"
                    >
                        <div className='flex items-center gap-1'>
                            <HiOutlineTrash className="text-pink-600" /> Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openAlert}>
                <AlertDialogContent className="bg-pink-50 border-pink-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-pink-800">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-pink-600">
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            onClick={() => setOpenAlert(false)}
                            className="bg-pink-100 text-pink-700 hover:bg-pink-200"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => {handleOnDelete(); setOpenAlert(false)}}
                            className="bg-pink-600 text-white hover:bg-pink-700"
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

