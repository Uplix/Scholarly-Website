'use client'
import * as React from 'react'
import { Avatar } from "@mui/material";
import {auth} from '@/firebase/config'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}){
    auth.currentUser
    const [menu, setMenu] = React.useState(false);
    const [menuClassName, setMenuClassName] = React.useState('absolute left-0 top-0 flex flex-col w-96 h-full bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-in');
    const [active, setActive] = React.useState(menu);

    const menuClick = () =>{
        setMenu(true);
        setActive(true);
    }
    const closeMenu = () =>{
        if(active){
            setMenuClassName('absolute left-0 top-0 flex flex-col w-96 h-full bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-out animate-alternate-reverse');
            setActive(false);
            setTimeout(()=>{
                setMenu(false);
                setMenuClassName('absolute left-0 top-0 flex flex-col w-96 h-full bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-in')
            }, 1000)   
        }
    }
    
    const TheMenu = () =>{
        return(
            // <Modal open={menu} onClose={closeMenu}>
            // <Modal open={menu} onClose={closeMenu}>
            <div className={menuClassName}>
                <div className='flex flex-row w-full h-fit justify-end items-center mt-5'>
                    <button className='mr-1 transition hover:scale-125' onClick={closeMenu}>
                        <CloseIcon fontSize='large' className='mr-6'/>
                    </button>
                </div>
                <Link href={'/'} className='flex justify-center items-center self-center mt-4 w-fit transition ease-in-out delay-150 text-6xl text-teal-200 text-center hover:-translate-y-2 hover:scale-110  decoration-sky-500 underline-offset-8 hover:underline'>Scholarly</Link>
                <div className='mt-7 h-0.5 w-full bg-slate-50'></div>
                <Link href={'/login/staffLogin/staff/students'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Students</Link>
                <Link href={'/login/staffLogin/staff/upcomingSessions'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Sessions</Link>
                <Link href={'/login/staffLogin/staff/reports'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Reports</Link>
                <Link href={'/login/staffLogin/staff/options'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Options</Link>
            </div>
        )
    }

    return(
        <>
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row items-center h-20 w-screen bg-gradient-to-r from-slate-600 to-gray-400">
                    {!active? <button className='ml-8 transition ease-in-out hover:scale-110 hover:-translate-y-0.5' onClick={menuClick}>
                        <MenuIcon fontSize="large"/>
                    </button>: null}
                    <div className="flex-grow"/>
                    {/* <Link href={'/login/studentLogin/student/settings'} className="mr-12 text-4xl transition delay-150 hover:-translate-y-1 hover:scale-110">Settings</Link> */}
                    <div className="scale-125 rounded-full mr-12 border-2 border-slate-100">
                        <Avatar sx={{bgcolor:stringToColor(auth.currentUser?.displayName)}}>{(auth.currentUser == null || auth.currentUser == undefined)?'NA':auth.currentUser?.displayName?.charAt(0) + auth.currentUser?.displayName?.split(' ')[1].charAt(0)}</Avatar>
                    </div>
                </div>
                <div>{children}</div>
            </div>
            {menu?<TheMenu/>: null}
        </>
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
        color = '#1b1b1b'
    }
    /* eslint-disable no-bitwise */
   
    /* eslint-enable no-bitwise */
  
    return color;
  }