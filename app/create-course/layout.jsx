"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'

function CreateCourseLayout({children}) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-violet-50 min-h-screen">
      <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
        <>
          <Header />
          <main className="text-violet-900">
            {children}
          </main>
        </>
      </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout
