'use client'
import Link from 'next/link'
import Image from 'next/image'
// import Person from '@mui/icons-material/Person'
import { HomeNavigation } from '@/components/homeNavigation'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import AppStoreSVG from '@/components/download-on-the-app-store.svg'
import { Footer } from '@/components/footer';


export default function Home() {
    const [windows, setWindows] = useState<number>((window != undefined)? window.innerWidth:0);

    useEffect(()=> {
        window.addEventListener('resize', ()=> {
            setWindows((window != undefined)? window.innerWidth:0)
            // console.log(windows)
        })
    }, [])

    const ArrowIcon = ()=>{
        if(windows >= 1188)return(
            <div className='w-0 h-0 invisible lg:w-fit lg:h-fit lg:visible'>
                <ArrowForwardIcon sx={{fontSize:80}}/>
            </div>
        )
    }

    const googlePlayClick = ()=>{
        alert("Scholarly is still in beta. Check back in later")
    }

    const appStoreClick = ()=>{
        alert("Scholarly is still in beta. Check back in later")
    }

    return (
        <main className='flex min-h-screen h-full w-full flex-col items-center'>
            <HomeNavigation width={windows}/>
            <div className='flex flex-row flex-wrap w-full h-fit' id='this-is-scholarly'>
                <div className='flex flex-col w-full pt-16 pb-14 items-center px-7 md:px-12 lg:w-1/2 lg:items-start lg:px-0 animate-fade-right animate-ease-in-out'>
                    <h2 className='text-7xl text-blue-600 lg:ml-20 sm:text-9xl'>Scholarly</h2>
                    <h3 className='text-4xl text-slate-200 sm:text-5xl lg:ml-14 mt-2 lg:text-6xl'>Perfecting Peer Tutoring</h3>
                    <h6 className='text-lg sm:text-2xl text-slate-300 text-opacity-80 lg:ml-16 mt-5 text-center lg:text-start '>Scholarly makes the proccess of peer tutoring easy and accessible to all. It has never been simpler for students to get the help that they need. Our suite of functions also allows for complete transperancy with your school district.</h6>
                </div>
                <div className='flex flex-col justify-center items-end w-0 lg:w-1/2 animate-fade-left animate-ease-in-out'>
                    <Image alt='peer-tutoring' className='mr-3 xl:mr-10' src={'/images/peer-tutoring-placeholder.jpg'} width={windows*2/5} height={50}/>
                </div>
            </div>
            <div className='flex flex-col items-center w-full h-fit mt-4 pt-10 pb-12 bg-gradient-to-br from-indigo-500 from-15% via-sky-500 via-40% to-emerald-500'>
                {/* <div className='h-40 w-20 bg-red' /> */}
                <h2 className='text-6xl font-semibold text-center text-zinc-100 px-12'>How Scholarly Works</h2>
                <div className='flex flex-row flex-wrap w-full h-fit justify-center items-center mt-12 gap-x-6 gap-y-9 px-4'>
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Student Posts Request</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-lime-400 mb-4'>
                            <DevicesIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26}}
                            >
                            Student Request
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18}}>
                            A student posts a request with their: Class, Grade, Date and Time to meet, and Location if it's a physical request.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <ArrowIcon />
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Peer Tutor Accepts</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-fuchsia-400 mb-4'>
                            <CheckOutlinedIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26}}
                            >
                            Peer Tutor Accepts
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18}}>
                            Your district's verified peer tutors can see the request and choose to accept it if they are confident in that subject and are available at that date/time.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <ArrowIcon />
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Students Meet</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-amber-300 mb-4'>
                            <PeopleOutlineIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26}}
                            >
                            Students Meet
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18}}>
                            The student and peer tutor meet on their specified date/time at the location. If it is a virtual session both will join the Google Meet that was automatically added to their Google Calendar. Their calendars will send them reminders of the session beforehand.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className='flex flex-row max-w-6xl h-96 py-16 scroll-auto scroll-pl-6 snap-center snap-x overflow-x-scroll'>
                <div className='snap-start ml-12'>
                    <Image alt='Tutoring' src={'/images/peer-tutoring-placeholder.jpg'} width={400} height={100}/>
                </div>
                <div className='snap-start ml-12'>
                    <Image alt='Tutoring' src={'/images/peer-tutoring-placeholder.jpg'} width={400} height={100}/>
                </div>
                
            </div>
            <div className='w-screen h-fit bg-gradient-to-bl from-lime-400 via-teal-300 to-fuchsia-400 pt-9 pb-8'>
                <h2 className='text-6xl md:text-8xl font-semibold text-center text-zinc-100 px-12'>Get the app!</h2>
                <div className='flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 px-14 mt-12'>
                    <div className='flex flex-col mt-2.5'>
                        <Image alt='Apple Scholarly' src={'/images/androidMockUp.png'} width={230} height={400}/>
                        <button className='w-fit h-fit transition hover:scale-105 mt-1.5' onClick={googlePlayClick}>
                            <Image alt='Google_PLay' src={'/images/googlePlayButton.png'} width={250} height={100}/>
                        </button>
                    </div>
                    <div className='flex flex-col mt-2.5'>
                        <Image alt='Apple Scholarly' src={'/images/iPhoneMockUp2.png'} width={200} height={400}/>
                        <button className='w-fit h-fit transition hover:scale-105 mt-5' onClick={appStoreClick}>
                            <Image alt='App-Store' src={AppStoreSVG} width={200} height={50}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center w-full h-fit pt-10 pb-12 bg-gradient-to-br from-red-400 from-15% via-amber-300 via-40% to-emerald-300'>
                {/* <div className='h-40 w-20 bg-red' /> */}
                <h2 className='text-6xl font-semibold text-center text-zinc-100 px-12'>Why Scholarly???</h2>
                <div className='flex flex-row flex-wrap w-full h-fit justify-center items-center mt-12 gap-x-6 gap-y-9 px-4'>
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Student Posts Request</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-sky-400 mb-4'>
                            <FolderOpenIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26, color:'#1b1b1b'}}
                            >
                            Organization
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18, color:'#1b1b1b'}}>
                            Spreadsheets, forms, files, and everything else that you use for peer tutoring is easy to get jumbled and confusing. Scholarly is one easy access source to organize everything!
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <ArrowIcon /> */}
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Peer Tutor Accepts</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-violet-400 mb-4'>
                            <CheckOutlinedIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26, color:'#1b1b1b'}}
                            >
                            Control
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18, color:'#1b1b1b'}}>
                                Your administration has complete access to all sessions, students, statistics, reports, and scheduling options. Administrators have complete control over student accounts, including: disabling, blocking, or making them a tutor.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <ArrowIcon /> */}
                    <div className='flex flex-col gap-y-1.5 justify-center items-center animate-fade-right animate-ease-in'>
                        {/* <h4 className='text-3xl font-medium text-center'>Students Meet</h4> */}
                        <div className='w-fit h-fit rounded-full p-6 bg-gradient-to-br from-teal-400 mb-4'>
                            <PeopleOutlineIcon sx={{fontSize:100}}/>
                        </div>
                        <Accordion sx={{width:300, backgroundColor:'transparent'}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign:'center', fontSize:26, color:'#1b1b1b'}}
                            >
                            Flexibility
                            </AccordionSummary>
                            <AccordionDetails sx={{textAlign:'center', fontSize:18, color:'#1b1b1b'}}>
                                Current peer tutoring structures aren't flexible for the complicated lives of their students. Students that need to take the bus or work after school don't have the ability to participate. Scholarly allows students the option to have an online session with a tutor. Some students only need help a few times throughout the year, but peer tutoring clubs require active participation. Scholarly makes peer tutoring easily accessible in any case.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}