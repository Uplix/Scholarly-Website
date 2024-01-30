'use client'
import Link from "next/link"
import Image from "next/image"
import Person from "@mui/icons-material/Person"
import { Menu, Close } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { Avatar, Collapse} from "@mui/material"
import {auth} from '@/firebase/config'
import { onAuthStateChanged } from "firebase/auth"

export function HomeNavigation({width}:{width:number}){
    const [open, setOpen] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setSignedIn(true);
            }
        })
    }, [])

    const LoginButton = ()=>{
        return(
            <Link className='flex flex-row  mr-14 text-4xl transition ease-in-out hover:scale-105' href={'/login'}>
                {signedIn?<>
                    <Avatar className="mr-4" alt={'User Image'} src={auth.currentUser?.photoURL}/>
                    <h4>Portal</h4>
                </>:<>
                    <Person fontSize='large' className='mr-6 mt-1 border-2 border-slate-200 rounded-full p-0.5 scale-125'/>
                    <h4>Login</h4>
                </>}
            </Link> 
        )
    }

    const ScholarlyIcon = ()=>{
        return(
            <div className='ml-6 w-0 h-0  md:ml-12 sm:w-fit sm:h-fit'>
                <Link href={'/'}>
                    <Image alt='Scholarly Logo' src={'/images/sizedCircularScholarlyIcon.png'} width={75} height={75}/>
                </Link>
            </div>
        )
    }

    const CloseIcon = ()=>{
        return(
            <div className="w-fit h-fit animate-spin animate-once animate-ease-out">
                <button onClick={()=>setOpen(false)} className="transition ease-in-out hover:scale-110 hover:-translate-y-0.5">
                    <Close sx={{fontSize:40}}/>
                </button>
            </div>
        )
    }

    const MenuIcon = ()=>{
        return(
            <div className="w-fit h-fit animate-rotate-y animate-once animate-ease-out">
                <button onClick={()=>setOpen(true)} className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110">
                    <Menu sx={{fontSize:40}}/>
                </button>
            </div>
        )
    }

    return(
        <div className="w-screen h-fit ">
            {(width>=1024)?<div className="w-0 h-0 lg:w-screen lg:h-fit invisible lg:visible">
                <div className='flex flex-row items-center w-full h-24 bg-blend-lighten bg-transparent shadow-lg shadow-sky-500'>
                    <ScholarlyIcon />
                    <div className='space-x-16 ml-20 h-full flex flex-row items-center justify-self-center'>
                        <Link className='text-4xl transition ease-in-out hover:scale-105 font-light' href={'/go/about'}>About</Link>
                        <Link className='text-4xl transition ease-in-out hover:scale-105 font-light' href={'/go/contact'}>Contact</Link>
                        <Link className='text-4xl transition ease-in-out hover:scale-105 font-light' href={'/go/team'}>Our Team</Link>
                    </div>
                    <div className='flex flex-grow'/>
                    <LoginButton />
                </div>                
            </div>:null}
            {(width<1024)?<div className="flex flex-col w-screen h-fit lg:invisible lg:w-0 lg:h-0">
                <div className="flex flex-row items-center w-full h-24 bg-blend-lighten bg-transparent shadow-lg shadow-sky-500">
                    <ScholarlyIcon />
                    <div className="ml-6">
                        {open?<CloseIcon />:<MenuIcon />}
                    </div>
                    <div className="flex-grow"/>
                    <LoginButton />
                </div>
                <div className="w-screen h-fit flex flex-col items-center">
                    <Collapse in={open}>
                        <div className="w-screen  pt-4 pb-6 h-fit flex flex-col items-center gap-y-5 bg-gradient-to-b from-sky-500 to-transparent" >
                            <Link className='text-5xl w-fit md:text-6xl transition ease-in-out hover:scale-110 text-center' href={'/go/about'}>About</Link>
                            <Link className='text-5xl w-fit md:text-6xl transition ease-in-out hover:scale-110 text-center' href={'/go/contact'}>Contact</Link>
                            <Link className='text-5xl w-fit md:text-6xl transition ease-in-out hover:scale-110 text-center' href={'/go/team'}>Our Team</Link>
                        </div>
                    </Collapse>
                </div>
            </div>:null}
        </div>
    )
}