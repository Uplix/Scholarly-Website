'use client'
import Image from "next/image";
import { auth } from "@/firebase/config";
import GoogleProvider from "next-auth/providers/google";

export default function StudentLogin(){
    return(
        <div className="flex flex-col w-screen h-screen bg-gradient-to-b from-slate-700 to-gray-400 items-center">
            <div className="flex flex-row h-1/3 w-screen justify-center items-center">
                <div className="flex justify-center items-center w-1/3">
                    <Image className="" alt="scholarly logo" src={"/images/sizedCircularScholarlyIcon.png"} width={175} height={175}/>
                </div>
                <div className="flex justify-center items-center w-1/3">
                    <Image className="" alt="mhusd-logo" src={'/images/MHUSD_logo.webp'} width={175} height={175}/>
                </div>
            </div>
            <div className="flex h-1/3 justify-center">
                <button onClick={()=>alert(auth.currentUser)} className="w-3/4">
                    <text className="text-center text-6xl">
                        Sign in with{" "}
                        <text className="text-[#4285F4]">
                            G
                            <text className="text-[#EA4336]">o</text>
                            <text className="text-[#FBBC04]">o</text>
                            <text className="text-[#4285F4]">g</text>
                            <text className="text-[#34A853]">l</text>
                            <text className="text-[#EA4336]">e</text>
                        </text>
                    </text>
                </button>
            </div>
        </div>
    )
}