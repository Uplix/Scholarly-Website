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
import { Accordion, AccordionSummary, AccordionDetails, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import AppStoreSVG from '@/components/download-on-the-app-store.svg'
import { Footer } from '@/components/footer';
import ImageScroller from '@/components/imageScroll';


export default function Home() {
    const [windows, setWindows] = useState<number>(1200);
    const [arrowOpen, setArrowOpen] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setWindows(window.innerWidth);
        }, 100)
    }, [])

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
            {/* <HomeNavigation width={windows}/> */}
            <div className='flex flex-row flex-wrap w-full h-fit pb-10 justify-center gap-y-16' id='this-is-scholarly'>
                <div className='flex flex-col justify-center items-start pl-4 sm:pl-8 md:pl-16 flex-grow pr-6 xl:pr-0 mt-20 xl:mt-0'>
                    <Image alt='scholarly-icon' src={'/images/sizedCircularScholarlyIcon.png'} width={90} height={90}/>
                    <Link href={'/go/team'} className='hidden sm:flex sm:w-fit sm:h-fit py-0.5 px-2.5 ring-2 ring-zinc-800 ring-offset-1 rounded-xl mt-10 transition hover:translate-x-1'>We are looking for more designers.  <span className='text-sky-400'>Learn more <ArrowForwardIcon fontSize='small'/></span> </Link>
                    <h1 className='text-5xl sm:text-7xl font-bold text-left mt-6 max-w-xl'>Perfecting peer tutoring</h1>
                    <h4 className='text-lg sm:text-xl font-light text-left opacity-70 mt-5 max-w-xl'>Scholarly makes the proccess of peer tutoring easy and accessible to all. It has never been simpler for students to get the help that they need. Our suite of functions also allows for complete transperancy with your school district.</h4>
                    <div className='flex flex-row mt-6 items-center justify-center'>
                        <Link href={'/go/about'} className='w-fit h-fit px-3 py-1.5 rounded-md ring-1 ring-indigo-400 ring-offset-1 ring-offset-sky-400 transition hover:scale-105'>
                            <h4 className='text-3xl font-medium'>About us</h4>
                        </Link>
                        <Link onFocus={()=>setArrowOpen(true)} onBlur={()=>setArrowOpen(false)} onMouseOver={()=>setArrowOpen(true)} onMouseLeave={()=>setArrowOpen(false)} href={'/login'} className='flex flex-row w-fit h-fit ml-12 py-2 pl-3 pr-2 transition bg-gradient-to-tr from-sky-400 via-blue-500 to-violet-400 rounded-md items-center gap-x-1'>
                            <h4 className='text-3xl font-medium'>Login</h4>
                            <Collapse in={arrowOpen} orientation='horizontal'>
                                <ArrowForwardIcon fontSize='large'/>
                            </Collapse>
                        </Link>
                    </div>
                </div>
                {/* <div className='flex-grow'/> */}
                <div className='flex overflow-hidden lg:overflow-visible max-h-96 xl:h-auto flex-col items-center lg:items-end justify-center w-full lg:w-2/5 lg:max-h-screen relative'>
                    <Image width={500} height={500} className='w-full h-full object-cover'  src='/images/homePageImage.jpeg' alt='homepageimage'/>
                </div>
            </div>
            <div className='flex flex-col items-center px-12 w-full h-fit'>
                <div className='w-full max-w-6xl bg-white bg-opacity-10 h-0.5 rounded-xl'/>
            </div>
            <div className='w-full h-fit pt-24 px-9 pb-20 flex flex-col'>
                <h2 className='text-6xl font-bold'>Why Scholarly?</h2>
                <h5 className='text-xl text-opacity-60 font-thin max-w-md mt-3'>Scholarly is hassle free allowing you to do more learning and less stressing</h5>
                <div className='flex flex-col lg:flex-row justify-center gap-x-5 gap-y-12 mt-16'>
                    <div className='flex flex-col w-full lg:max-w-xl'>
                        <div className='w-fit h-fit rounded-lg bg-gradient-to-br from-sky-400 p-2'>
                            <FolderOpenIcon fontSize='large'/>
                        </div>
                        <h5 className='text-2xl mt-4'>Organization</h5>
                        <h6 className='text-lg opacity-70 mt-1.5'>Spreadsheets, forms, files, and everything else that you use for peer tutoring is easy to get jumbled and confusing. Scholarly is one easy access source to organize everything!</h6>
                    </div>
                    <div className='flex flex-col w-full lg:max-w-xl'>
                        <div className='w-fit h-fit rounded-lg bg-gradient-to-br from-violet-400 p-2'>
                                <CheckOutlinedIcon fontSize='large'/>
                            </div>
                            <h5 className='text-2xl mt-4'>Control</h5>
                            <h6 className='text-lg opacity-70 mt-1.5'>Your administration has complete access to all sessions, students, statistics, reports, and scheduling options. Administrators have complete control over student accounts, including: disabling, blocking, or making them a tutor.</h6>
                        </div>
                    <div className='flex flex-col w-full lg:max-w-xl'>
                        <div className='w-fit h-fit rounded-lg bg-gradient-to-br from-teal-400 p-2'>
                            <PeopleOutlineIcon fontSize='large'/>
                        </div>
                        <h5 className='text-2xl mt-4'>Flexibility</h5>
                        <h6 className='text-lg opacity-70 mt-1.5'>{"Current peer tutoring structures aren't flexible for the complicated lives of their students. Students that need to take the bus or work after school don't have the ability to participate. Scholarly allows students the option to have an online session with a tutor. Some students only need help a few times throughout the year, but peer tutoring clubs require active participation. Scholarly makes peer tutoring easily accessible in any case."}</h6>
                    </div>
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
                           {" A student posts a request with their: Class, Grade, Date and Time to meet, and Location if it's a physical request."}
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
                            {"Your district's verified peer tutors can see the request and choose to accept it if they are confident in that subject and are available at that date/time."}
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
            <div className='w-full h-fit py-4 rounded-lg px-3'>
                <ImageScroller images={['/images/image1.jpeg', '/images/image2.jpeg', '/images/image3.jpeg', '/images/image4.jpeg']}/>
            </div>
            <div className='w-screen h-fit bg-gradient-radial to-emerald-500 via-sky-500 from-violet-400 pt-12 pb-12'>
                <h2 className='text-6xl md:text-8xl font-semibold text-center text-zinc-100 px-12'>Get the app!</h2>
                <div className='flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 px-14 mt-12'>
                    <div className='flex flex-col mt-2.5 items-center'>
                        <Image alt='Apple Scholarly' src={'/images/AndroidMockupScreenshotVersion13.png'} width={172} height={350}/>
                        <button className='w-fit h-fit transition hover:scale-105 mt-2' onClick={googlePlayClick}>
                            <Image alt='Google_PLay' src={'/images/googlePlayButton.png'} width={250} height={100}/>
                        </button>
                    </div>
                    <div className='flex flex-col mt-2.5 items-center'>
                        <Image alt='Apple Scholarly' src={'/images/iPhoneMockupScreenshotVersion13.png'} width={180} height={350}/>
                        <button className='w-fit h-fit transition hover:scale-105 mt-7' onClick={appStoreClick}>
                            <Image alt='App-Store' src={AppStoreSVG} width={200} height={50}/>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

const Old = ()=>{
    return(
       <>
       <div className='flex flex-row flex-wrap w-full h-fit' id='this-is-scholarly'>
                <div className='flex flex-col w-full pt-16 pb-14 items-center px-7 md:px-12 lg:w-1/2 lg:items-start lg:px-0 animate-fade-right animate-ease-in-out'>
                    <h2 className='text-7xl text-blue-600 lg:ml-20 sm:text-9xl '>Scholarly</h2>
                    <h3 className='text-4xl text-slate-200 sm:text-5xl lg:ml-14 mt-2 lg:text-6xl'>Perfecting Peer Tutoring</h3>
                    <h6 className='text-lg sm:text-2xl text-slate-300 text-opacity-80 lg:ml-16 mt-5 text-center lg:text-start '>Scholarly makes the proccess of peer tutoring easy and accessible to all. It has never been simpler for students to get the help that they need. Our suite of functions also allows for complete transperancy with your school district.</h6>
                </div>
                <div className='flex flex-col justify-center items-end w-0 lg:w-1/2 animate-fade-left animate-ease-in-out'>
                    <Image alt='peer-tutoring' className='mr-3 xl:mr-10' src={'/images/peer-tutoring-placeholder.jpg'} width={100*2/5} height={50}/>
                </div>
            </div>
            <div className='flex flex-col items-center px-12 w-full h-fit'>
                <div className='w-full max-w-6xl bg-white bg-opacity-10 h-0.5 rounded-xl'/>
            </div>
       </>
    )
}