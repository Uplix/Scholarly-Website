import Image from "next/image"
import { YouTube, GitHub, Instagram, Facebook } from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
import Link from "next/link";

export function Footer(){
    return(
        <div className="w-screen flex flex-col h-fit bg-[#121826]">
            <div className="w-screen flex flex-row flex-wrap h-fit pt-12 pb-10 items-center justify-center gap-y-14">
                <div id="this is who we are" className="w-fit max-w-sm h-fit flex flex-col items-start ml-6">
                    <Image className="ml-1.5" alt="Logo" src={'/images/sizedCircularScholarlyIcon.png'} width={50} height={50}/>
                    <h5 className="text-lg text-start mt-3 opacity-70">Changing the realm of peer tutoring</h5>
                    <div className="max-w-max h-fit flex flex-row mt-2 space-x-4">
                        <button className="w-fit h-fit transition hover:scale-110">
                            <Instagram sx={{color:'GrayText'}} fontSize="medium"/>
                        </button>
                        <button className="w-fit h-fit transition hover:scale-110">
                            <XIcon sx={{color:'GrayText'}} fontSize="medium"/>
                        </button>
                        <button className="w-fit h-fit transition hover:scale-110">
                            <Facebook sx={{color:'GrayText'}} fontSize="medium"/>
                        </button>
                        <button className="w-fit h-fit transition hover:scale-110">
                            <GitHub sx={{color:'GrayText'}} fontSize="medium"/>
                        </button>
                        <button className="w-fit h-fit transition hover:scale-110">
                            <YouTube sx={{color:'GrayText'}} fontSize="medium"/>
                        </button>
                    </div>
                </div>
                <div id="where to go" className="w-screen justify-center items-start flex flex-row max-w-xl gap-x-10">
                    <div className="flex flex-col items-start">
                        <h4 className="text-lg text-left text-slate-100">Pages</h4>
                        <div className="flex flex-col items-start ml-1.5">
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Home</Link>
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">About Us</Link>
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Contact Us</Link>
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Our Team</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <h4 className="text-lg text-left text-slate-100">Legal</h4>
                        <div className="flex flex-col items-start ml-1.5">
                            <Link href={'/privacy_policy.HTML'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Privacy Policy</Link>
                            <Link href={'/privacy_policy.HTML'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">EULA</Link>
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Other</Link>
                            {/* <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Our Team</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}