import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Link href={'/'}>
        <div className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-950 to-red-900 hover:scale-105 transition-transform'>
          Learning
        </div>
      </Link>
      <Link href={'/dashboard'}>
        <Button variant="outline" className="border-red-950 text-red-950 hover:bg-red-100">Get Started</Button>
      </Link>
    </div>
  )
}

export default Header

