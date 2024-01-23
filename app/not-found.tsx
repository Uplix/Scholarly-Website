'use client'
import { HomeNavigation } from "@/components/homeNavigation"
import { useEffect, useState } from "react"

export default function ErrorPage(){
    const [windows, setWindows] = useState<number>((window != undefined)? window.innerWidth:0);

    useEffect(()=> {
        window.addEventListener('resize', ()=> {
            setWindows((window != undefined)? window.innerWidth:0)
            // console.log(windows)
        })
    }, [])

    return(
        <div className="flex flex-col w-screen h-screen items-center">
            <HomeNavigation width={windows}/>
            <h1 className="text-9xl mt-20 text-center">OH NO!</h1>
            <h2 className="text-7xl text-center mt-16">This is a page not found page😭</h2>
            <h4 className="text-5xl mt-12">We could not find your specified url</h4>
        </div>
    )
}