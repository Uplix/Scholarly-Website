'use client'
import * as React from 'react'
import { Avatar } from "@mui/material";
import {auth, db} from '@/firebase/config'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import { ref, onValue } from 'firebase/database';
// import Modal from '@mui/material/Modal';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}){
    auth.currentUser
    const [menu, setMenu] = React.useState(false);
    const [menuClassName, setMenuClassName] = React.useState('absolute left-0 top-0 flex flex-col w-96 h-full bg-gradient-to-b from-emerald-500 to-indigo-400 animate-fade-right ease-in');
    const [active, setActive] = React.useState(menu);
    const [reload, setReload] = React.useState(0);
    const [isTutor, setIsTutor] = React.useState(false);

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

    React.useEffect(()=>{
        onValue(ref(db, 'mhusd/users/' + auth.currentUser?.uid + '/isTutor'), (snapshot)=>{
            if(snapshot.exists()){
                setIsTutor(snapshot.val())
            }
        })
    }, [reload])
    
    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1)
        }, 700)
    }, [])

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
                {isTutor?<Link href={'/login/studentLogin/student/available'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Available</Link>:null}
                <Link href={'/login/studentLogin/student/request'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Request</Link>
                <Link href={'/login/studentLogin/student/schedule'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Schedule</Link>
                <Link href={'/login/studentLogin/student/settings'} onClick={()=>{setTimeout(()=>closeMenu(),50)}} className='self-center text-center text-white text-5xl mt-16 transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Settings</Link>
            </div>
        )
    }

    return(
        <>
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row items-center h-20 w-screen bg-gradient-to-r from-slate-700 to-gray-900 border-b-2 border-slate-400">
                    {!active? <button className='ml-8 transition ease-in-out hover:scale-110 hover:-translate-y-0.5' onClick={menuClick}>
                        <MenuIcon fontSize="large"/>
                    </button>: null}
                    <div className="flex-grow"/>
                    {/* <Link href={'/login/studentLogin/student/settings'} className="mr-12 text-4xl transition delay-150 hover:-translate-y-1 hover:scale-110">Settings</Link> */}
                    <div className="scale-125 rounded-full mr-12 ">
                        {(auth.currentUser == null || auth.currentUser == undefined)? <div className='border-2 border-slate-100 rounded-full'><PersonIcon fontSize='large'/></div>:<Avatar alt={auth.currentUser.displayName} src={auth.currentUser.photoURL}/>}
                        {/*  */}
                    </div>
                </div>
                <div>{children}</div>
            </div>
            {menu?<TheMenu/>: null}
        </>
    )
}