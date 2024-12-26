import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <Link href={'/'}>
        <span className='text-2xl font-bold'>ACADAMY</span>
      </Link>
      <Link href={'/dashboard'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Header
