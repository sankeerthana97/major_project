import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Link href={'/'}>
        <div className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-transform'>
          ACADAMY
        </div>
      </Link>
      <Link href={'/dashboard'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Header
