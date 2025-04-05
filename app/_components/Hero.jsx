import React from 'react'

function Hero() {
  return ( 
    <>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

          <div className="flex justify-center">
            <a className="inline-flex items-center gap-x-2 bg-blue-50 border border-blue-200 text-sm text-blue-800 p-1 ps-3 rounded-full transition hover:border-blue-300 dark:bg-blue-900 dark:border-blue-700 dark:hover:border-blue-600 dark:text-blue-200" 
            href="dashboard" target="_blank">
              The Intelligent Tutor - Join Now
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-blue-100 font-semibold text-sm text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </a>
          </div>
         
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              AI Course
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-400 text-transparent"> Generator</span>
            </h1>
          </div>
         
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
            Revolutionize your Course creation with our AI-powered app, delivering engaging and high-quality courses in seconds.</p>
          </div>

         
          <div className="mt-8 gap-3 flex justify-center">
            <a className="inline-flex justify-center items-center 
            gap-x-3 text-center bg-gradient-to-tl from-blue-600
             to-violet-400 hover:from-blue-700 hover:to-violet-500 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 py-3 px-4 dark:focus:ring-offset-gray-800" 
             href="/dashboard">
              Get started
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
           
          </div>
         
        </div>
      </div>


      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">

          <a className="group flex flex-col justify-center hover:bg-blue-50 rounded-xl p-4 md:p-7 dark:hover:bg-blue-900" href="https://major-project-eosin-sigma.vercel.app/dashboard">
            <div className="flex justify-center items-center size-12 bg-blue-500 rounded-xl">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="10" height="14" x="3" y="8" rx="2"/><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"/><path d="M8 18h.01"/></svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-blue-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-blue-400">Adaptive Learning</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Smart pathways adjust to learning speed.</p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
          </a>
         
          <a className="group flex flex-col justify-center hover:bg-blue-50 rounded-xl p-4 md:p-7 dark:hover:bg-blue-900" href="https://major-project-eosin-sigma.vercel.app/dashboard">
            <div className="flex justify-center items-center size-12 bg-violet-500 rounded-xl">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-violet-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-violet-400">Personalized Content</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">AI customizes materials for each student.</p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-violet-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
          </a>
         
          <a className="group flex flex-col justify-center hover:bg-blue-50 rounded-xl p-4 md:p-7 dark:hover:bg-blue-900" href="https://major-project-eosin-sigma.vercel.app/dashboard">
            <div className="flex justify-center items-center size-12 bg-blue-500 rounded-xl">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-blue-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-blue-400">Personalized Testing</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Customized assessments measure student knowledge levels.</p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
          </a>
        
          <a className="group flex flex-col justify-center hover:bg-blue-50 rounded-xl p-4 md:p-7 dark:hover:bg-blue-900" href="https://major-project-eosin-sigma.vercel.app/dashboard">
            <div className="flex justify-center items-center size-12 bg-violet-500 rounded-xl">
              <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-violet-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-violet-400">Interactive Assessments</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Real-time quizzes enhance knowledge retention.</p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-violet-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
          </a>
         
        </div>
      </div>
    </>
  )
}

export default Hero

