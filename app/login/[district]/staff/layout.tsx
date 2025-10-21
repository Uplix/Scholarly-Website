'use client'
import * as React from 'react'
import { Avatar, CircularProgress } from "@mui/material";
import {auth} from '@/firebase/config'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import {Modal, Alert, Collapse, Dialog} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { signOut as fullSignOut }  from "next-auth/react";
import Image from 'next/image';

export default function StudentLayout({
    children, params
}: {
    children: React.ReactNode,
    params:{district:string}
}){
    const pathName = usePathname();
    const router = useRouter();

    const [errorDisplay, setErrorDisplay] = React.useState<boolean|string>(false);

    const [windowWidth, setWindowWidth] = React.useState<number>(1200)
    const [loadingAvatar, setLoadingAvatar] = React.useState(true);
    const [menu, setMenu] = React.useState(false);
    const [menuClassName, setMenuClassName] = React.useState('absolute left-0 top-0 flex flex-col w-96 min-h-screen h-fit bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-in');
    const [active, setActive] = React.useState(menu);
    const [profilePopover, setProfilePopover] = React.useState(false);
    let thePage:string|string[] = '';
    if(pathName != undefined && pathName != null && pathName != ''){
        thePage= pathName.split('/')[4];
        if(thePage != undefined){
            thePage = thePage.split('')
            thePage[0] = thePage[0].toUpperCase();
            thePage = thePage.join('');
        }
    }
    const [page, setPage] = React.useState(thePage)
    const [mobileCollapse, setMobileCollapse] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const openMobileNav = ()=>{
        setMenu(true);
        setTimeout(()=>{
            setMobileCollapse(true);
        }, 100)
    }

    const closeMobileNav = ()=>{
        setMobileCollapse(false);
        setTimeout(()=>{
            setMenu(false);
        }, 200)
    }

    const handleProfilePopover = ()=>{
        if(profilePopover){
            setProfilePopover(false);
        }else{
            setProfilePopover(true);
        }
    }

    React.useEffect(()=>{
        window.addEventListener('resize', ()=> {
            setWindowWidth((window != undefined)? window.innerWidth:0)
        })
    })

    React.useEffect(()=>{
        if(pathName != undefined && pathName != null && pathName != ''){
            thePage= pathName.split('/')[4];
            if(thePage != undefined){
                thePage = thePage.split('')
                thePage[0] = thePage[0].toUpperCase();
                thePage = thePage.join('');
                setPage(thePage)
            }
            closeMobileNav();
            setErrorDisplay(false);
        }
    }, [pathName])

    const signingOut = async () =>{
        setLoading(true)
        await signOut(auth);
        // setReload(reload+1);
        await fullSignOut();
        // closeModal();
        router.push('/');
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setWindowWidth(window.innerWidth);
        }, 100)
        setTimeout(()=>{
            setLoadingAvatar(false);
        }, 700)
    }, [])

    const menuClick = () =>{
        setMenu(true);
        setActive(true);
    }
    const closeMenu = () =>{
        if(active){
            setMenuClassName('absolute left-0 top-0 flex flex-col w-96 min-h-screen h-fit bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-out animate-alternate-reverse');
            setActive(false);
            setTimeout(()=>{
                setMenu(false);
                setMenuClassName('absolute left-0 top-0 flex flex-col w-96 min-h-screen h-fit bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-in')
            }, 1000)   
        }
    }
    
    const TheMenu = () =>{
        return(
            // <Modal open={menu} onClose={closeMenu}>
            // <Modal open={menu} onClose={closeMenu}>
            <div className={menuClassName}>
                <div className='flex flex-row w-full h-full justify-end items-center mt-5 overflow-auto'>
                    <button className='mr-1 transition hover:scale-125' onClick={closeMenu}>
                        <CloseIcon fontSize='large' className='mr-6'/>
                    </button>
                </div>
                <Link href={'/'} className='self-center pb-3 mt-2 w-fit transition ease-in-out delay-150  text-7xl text-transparent bg-clip-text font-sans font-medium bg-gradient-to-r from-sky-200 to-violet-300 text-center hover:-translate-y-2 hover:scale-110  decoration-sky-500 underline-offset-8 hover:underline'>Scholarly</Link>
                <div className='mt-7 h-0.5 w-full bg-slate-50'></div>
                <Link href={'/login/' + params.district + '/staff/students'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Students</Link>
                <Link href={'/login/' + params.district + '/staff/upcomingSessions'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Sessions</Link>
                <Link href={'/login/' + params.district + '/staff/reports'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Reports</Link>
                <Link href={'/login/' + params.district + '/staff/options'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1 mb-5'>Options</Link>
            </div>
        )
    }

    const OldCode = () =>{
        return(
            <>
            <div className="flex flex-col h-full min-h-screen w-full">
                <div className="flex flex-row items-center h-20 w-screen bg-gradient-to-r from-slate-700 to-gray-900 border-b-2 border-slate-400">
                    {!active? <button className='ml-8 transition ease-in-out hover:scale-110 hover:-translate-y-0.5' onClick={menuClick}>
                        <MenuIcon fontSize="large"/>
                    </button>: null}
                    <div className="flex-grow"/>
                    {/* <Link href={'/login/student/settings'} className="mr-12 text-4xl transition delay-150 hover:-translate-y-1 hover:scale-110">Settings</Link> */}
                    {loadingAvatar?
                    <div className='mr-12'>
                        <CircularProgress />
                    </div>:
                    <div className="scale-125 rounded-full mr-12 border-2 border-slate-100">
                        <Avatar sx={{bgcolor:stringToColor(auth.currentUser?.displayName)}}>{(auth.currentUser?.displayName == undefined || auth.currentUser?.displayName == null)?'NA':auth.currentUser?.displayName?.charAt(0) + auth.currentUser?.displayName?.split(' ')[1].charAt(0)}</Avatar>
                    </div>}
                </div>
                <div>{children}</div>
            </div>
            <Modal open={menu} onClose={closeMenu}>
                <div className='w-fit h-fit'>
                    {menu?<TheMenu/>: null}
                </div>
            </Modal>
        </>
        )
    }

    return(
        <div className='w-screen max-w-full h-screen max-h-screen flex flex-col'>
        {(windowWidth < 1100)?
        <div className='w-screen h-fit py-4 flex flex-row items-center justify-start border-b-2 border-zinc-200'>
            <button onClick={openMobileNav} className='w-fit h-fit ml-7'>
                <MenuIcon fontSize='large'/>
            </button>
            <h4 className='text-2xl ml-9 font-light text-slate-200'>{page}</h4>
            <div className='flex-grow'/>
            <Avatar sx={{marginRight:3, width:40, height:40}} src={auth.currentUser?.photoURL}/>
        </div>:null}
        <div className='w-screen max-w-full h-screen max-h-screen flex flex-row justify-center'>
            <div>
                {(windowWidth > 1100)?
                    <Collapse in orientation='horizontal'>
                        <div className='w-72 h-screen bg-[#121820] flex flex-col rounded-lg shadow-lg shadow-slate-200'>
                            <div className='w-fit h-fit ml-4 mt-6'>
                                <Link href={'/'} className='w-fit h-fit'>
                                    <Image alt='scholarly-icon' src={'/images/sizedCircularScholarlyIcon.png'} width={60} height={60}/>
                                </Link>
                            </div>
                            <div className='w-full h-fit mt-9 pl-2 pr-4'>
                                <Link href={'/login/'+params.district +'/staff/sessions'} className={(page==="Sessions")?"w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><CalendarTodayOutlinedIcon className='mr-3' fontSize='large'/>Sessions</Link>
                                <Link href={'/login/'+params.district +'/staff/students'} className={(page==="Students")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><GroupsOutlinedIcon className='mr-3' fontSize='large'/>Students</Link>
                                {/* {isTutor?<Link href={'/login/'+params.district +'/student/available'} className={(page==="Available")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><PersonAddAltOutlinedIcon className='mr-3' fontSize='large'/>Available</Link>:null} */}
                                <Link href={'/login/'+params.district +'/staff/reports'} className={(page==="Reports")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><OutlinedFlagOutlinedIcon className='mr-3' fontSize='large'/>Reports</Link>
                                <Link href={'/login/'+params.district +'/staff/options'} className={(page==="Options")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><TuneOutlinedIcon className='mr-3' fontSize='large'/>Options</Link>
                            </div>
                            <div className='flex-grow'/>
                            <Collapse orientation='vertical' in={profilePopover}>
                                <div className='w-full h-fit px-8 flex flex-col items-center'>
                                    <button onClick={signingOut} className='w-full h-fit text-xl text-zinc-100 mb-3 bg-gradient-radial from-[#f17171] to-[#f03030] py-2 rounded-lg'>Sign out</button>
                                </div>
                            </Collapse>
                            <div className='w-full h-fit pl-1.5 mb-5 pr-2.5'>
                                <button onClick={handleProfilePopover} className='px-2 w-full h-fit text-md transition hover:bg-[#212936] text-zinc-100 flex flex-row items-center py-2 rounded-lg'><Avatar src={auth.currentUser?.photoURL} className='mr-3'/>{auth.currentUser?.displayName}</button>
                            </div>
                        </div>
                    </Collapse>
                    :
                    <>
                        {menu?<Modal open={menu} onClose={closeMobileNav}>
                            <div className='flex flex-row w-screen h-screen'>
                            <Collapse in={mobileCollapse} orientation='horizontal'>
                            <div className='w-72 h-screen bg-[#121820] flex flex-col rounded-lg shadow-lg shadow-slate-200'>
                            <div className='w-fit h-fit ml-4 mt-6'>
                                <Link href={'/'} className='w-fit h-fit'>
                                    <Image alt='scholarly-icon' src={'/images/sizedCircularScholarlyIcon.png'} width={60} height={60}/>
                                </Link>
                            </div>
                            <div className='w-full h-fit mt-9 pl-2 pr-4'>
                            <Link href={'/login/'+params.district +'/staff/sessions'} className={(page==="Sessions")?"w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><CalendarTodayOutlinedIcon className='mr-3' fontSize='large'/>Sessions</Link>
                                <Link href={'/login/'+params.district +'/staff/students'} className={(page==="Students")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><GroupsOutlinedIcon className='mr-3' fontSize='large'/>Students</Link>
                                {/* {isTutor?<Link href={'/login/'+params.district +'/student/available'} className={(page==="Available")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><PersonAddAltOutlinedIcon className='mr-3' fontSize='large'/>Available</Link>:null} */}
                                <Link href={'/login/'+params.district +'/staff/reports'} className={(page==="Reports")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><OutlinedFlagOutlinedIcon className='mr-3' fontSize='large'/>Reports</Link>
                                <Link href={'/login/'+params.district +'/staff/options'} className={(page==="Options")?"mt-3 w-full px-2.5 py-2 rounded-lg text-3xl flex flex-row items-center transition bg-[#212936] text-zinc-100":'mt-3 w-full px-2.5 py-2 rounded-lg text-3xl  flex flex-row items-center transition text-[#9da3ae] hover:bg-[#212936] hover:text-zinc-100'}><TuneOutlinedIcon className='mr-3' fontSize='large'/>Settings</Link>
                            </div>
                            <div className='flex-grow'/>
                            <Collapse orientation='vertical' in={profilePopover}>
                                <div className='w-full h-fit px-8 flex flex-col items-center'>
                                    <button onClick={signingOut} className='w-full h-fit text-xl text-zinc-100 mb-3 bg-gradient-radial from-[#f17171] to-[#f03030] py-2 rounded-lg'>Sign out</button>
                                </div>
                            </Collapse>
                            <div className='w-full h-fit pl-1.5 mb-5 pr-2.5'>
                                <button onClick={handleProfilePopover} className='px-2 w-full h-fit text-md transition hover:bg-[#212936] text-zinc-100 flex flex-row items-center py-2 rounded-lg'><Avatar src={auth.currentUser?.photoURL} className='mr-3'/>{auth.currentUser?.displayName}</button>
                            </div>
                        </div>
                            </Collapse>
                            <button onClick={closeMobileNav} className='flex-grow cursor-default relative'>
                                <button onClick={closeMobileNav} className='w-fit h-fit absolute left-3 top-3 p-2 rounded-full'>
                                    <CloseIcon fontSize='large'/>
                                </button>
                            </button>
                            </div>
                        </Modal>:null}
                    </>
                }
            </div>
            <div className='h-screen max-h-screen overflow-y-scroll flex flex-grow flex-col items-center'>
                {children}
            </div>
        </div>
        {(errorDisplay != false)?<Alert className='absolute right-1.5 lg:right-6 top-20 lg:top-3'  severity='error'>{errorDisplay}</Alert>:null}
        <Dialog open={((auth.currentUser?.uid == undefined || auth.currentUser?.uid == null)&&!loadingAvatar)}>
            {/* <div className='w-screen h-screen flex flex-col items-center justify-center'> */}
                {loading?null:<div className='bg-[#121820] shadow-lg shadow-zinc-300 w-fit h-fit px-10 py-8 flex flex-col items-center'>
                    <div className='w-fit h-fit p-2 rounded-full bg-red-300'>
                        <CloseIcon fontSize='large' sx={{color:'red'}}/>
                    </div>
                    <h3 className='text-lg font-bold mt-5 text-center'>Not Signed In!</h3>
                    <h5 className='text-base font-light text-opacity-70 text-center mt-4'>There is no current user signed in on this device. Please make your way back to the homepage 😁</h5>
                    <Link className='text-lg py-1 w-fit px-6 bg-rose-500 rounded-lg mt-6 transition hover:bg-opacity-80' href={'/'}>Go to home screen</Link>
                </div>}
            {/* </div> */}
        </Dialog>
        <Modal open={loading}>
            <div className='w-screen h-screen flex flex-col items-center justify-center'>
                <CircularProgress size={130} thickness={1}/>
            </div>
        </Modal>
    </div>
    )
}

function stringToColor(string:string|null|undefined) {
    let hash = 0;
    let i;
    let color = '#';

    if(string != undefined){
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
    }else{
        color = '#f1f1f1'
    }
    /* eslint-disable no-bitwise */
   
    /* eslint-enable no-bitwise */
  
    return color;
  }