'use client'
import Image from "next/image"
import { useState } from "react"

export default function Pigeon(){
    const [pressed, setPressed] = useState(false);

    return(
        <div className="w-screen h-screen flex flex-col bg-white max-h-screen">
            {pressed?
                <div className="flex flex-col w-screen h-screen self-center justify-center items-center relative bg-[url('/images/oldNote.png')] bg-no-repeat bg-center bg-contain bg-local">
                    {/* <Image alt="letter" className="px-32 h-screen max-h-screen self-center" src={'/images/oldNote.png'} width={912} height={980}/> */}
                    <div className="flex flex-col h-fit px-20 max-w-lg ">
                        <h2 className="text-lg sm:text-2xl font-bold font-serif text-slate-800">Sir Tony of the BFR,</h2>
                        <h4 className="text-sm sm:text-lg pt-8 font-serif text-slate-800">I, Andrew of the Burbank clan, a humble peasant of the Freshman, seek to gain your audience in an interview. I am very interested in your brotherhood the BFR. In my time of the free I find myself riding to neighboring lands, competing in jousts, and designing websites. I know a knight of your stature is very busy doing tasks, but I would greatly appreciate just a swords width of time with thee.</h4>
                        <h3 className="text-lg sm:text-xl pt-6 font-bold font-serif text-slate-800 ">In service and honor,</h3>
                        <h3 className="text-lg sm:text-xl pt-1 font-bold font-serif text-slate-800">Andrew</h3>
                    </div>
                </div>
                :
                <div className="flex flex-col w-screen h-screen">
                    <h1 className="text-center text-2xl font-serif font-semibold pt-24 text-zinc-900">You have a new message! (hint: click the pigeon)</h1>
                    <img className="self-center" onClick={()=>setPressed(true)} src='https://media1.tenor.com/m/zxJMTNCOhbkAAAAC/pegion.gif' width="500" height="500" alt="pigeongif"/>
                </div>
            }
        </div>
    )
}