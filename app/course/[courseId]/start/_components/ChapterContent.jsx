import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};

function ChapterContent({ chapter, content, isLastChapter }) {
    const [showTest, setShowTest] = useState(false);

    useEffect(() => {
        // Show test button when it's the last chapter
        setShowTest(isLastChapter);
    }, [isLastChapter]);

    const handleStartTest = () => {
        window.open('https://xnhurfu2ealdnmle.vercel.app/', '_blank');
    };

    return (
        <div className='p-10'>
            <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
            <p className='text-gray-500'>{chapter?.about}</p>

            {/* Video Section */}
            <div className='flex justify-center my-6'>
                <YouTube
                    videoId={content?.videoId}
                    opts={opts}
                />
            </div>

            {/* Content Section */}
            <div>
                {content?.content?.map((item, index) => (
                    <div key={index} className='p-5 bg-purple-50 shadow-sm mb-3 rounded-lg'>
                        <h2 className='font-medium text-2xl'>{item.title}</h2>
                        <ReactMarkdown className='text-lg text-black leading-9'>{item?.description}</ReactMarkdown>
                        {item.codeExample &&
                            <div className='p-4 bg-black text-white rounded-md mt-3'>
                                <pre>
                                    <code>{item.codeExample.replace('<precode>', '').replace('</precode>', '')}</code>
                                </pre>
                            </div>}
                    </div>
                ))}
            </div>

            {/* Test Button/Dialog */}
            {showTest && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center w-full md:w-auto">
                            Take Final Assessment
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Ready for your final assessment?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You've completed all chapters! Test your knowledge with a comprehensive assessment. Click proceed to start the test.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Not yet</AlertDialogCancel>
                            <AlertDialogAction onClick={handleStartTest}>
                                Proceed to Test
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}

export default ChapterContent;
