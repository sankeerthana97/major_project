import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
       <Link href={'/dashboard'}>
        <div className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-pink-700 to-pink-500 hover:scale-105 transition-transform'>
          LEARNING
        </div>
        </Link>
        <UserButton/>
    </div>
  )
}

export default Header

