'use client'
import { Footer } from "@/components/footer";
import { HomeNavigation } from "@/components/homeNavigation"
import { useEffect, useState } from 'react';

export default function GoLayout({children}:{children:React.ReactNode}){
    const [windowWidth, setWindowWidth] = useState<number>(1200)

    useEffect(()=>{
        window.addEventListener('resize', ()=> {
            setWindowWidth((window != undefined)? window.innerWidth:0)
        })
    })
    useEffect(()=>{
        setTimeout(()=>{
            setWindowWidth(window.innerWidth);
        }, 100)
    }, [])

    return(
        <div className="w-full h-full min-h-screen flex flex-col">
            <HomeNavigation width={windowWidth}/>
            {children}
            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    )
}