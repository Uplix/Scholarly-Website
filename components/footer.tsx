import Image from "next/image"
import { YouTube, GitHub, Instagram, Facebook } from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
import Link from "next/link";
import AppStoreSVG from '@/components/download-on-the-app-store.svg'


export function Footer(){
    const appStoreClick = ()=>{
        alert("Scholarly is still in beta. Check back in later")
    }

    const googlePlayClick = ()=>{
        alert("Scholarly is still in beta. Check back in later")
    }

    return(
        <div className="w-screen flex flex-col h-fit bg-[#121826]">
            <div className="w-screen flex flex-row flex-wrap h-fit pt-12 pb-10 items-center justify-center gap-y-10">
                <div id="this is who we are" className="w-fit max-w-sm h-fit flex flex-col items-start ml-6">
                    <Image className="ml-1.5" alt="Logo" src={'/images/sizedCircularScholarlyIcon.png'} width={50} height={50}/>
                    <h5 className="text-lg text-start mt-3 opacity-70">Changing the realm of peer tutoring</h5>
                    <div className="max-w-max h-fit flex flex-row mt-2 space-x-4">
                        <Link href={'https://www.instagram.com/real_scholarly/'} className="w-fit h-fit transition hover:scale-110">
                            <Instagram sx={{color:'GrayText'}} fontSize="medium"/>
                        </Link>
                        <Link href={'https://twitter.com/RealScholarly'} className="w-fit h-fit transition hover:scale-110">
                            <XIcon sx={{color:'GrayText'}} fontSize="medium"/>
                        </Link>
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
                    <div className="flex flex-row w-full gap-x-2 justify-start items-center mt-4">
                        <button className='w-fit h-fit transition hover:scale-105' onClick={googlePlayClick}>
                            <Image alt='Google_PLay' src={'/images/googlePlayButton.png'} width={125} height={0}/>
                        </button>
                        <button className='w-fit h-fit transition hover:scale-105' onClick={appStoreClick}>
                            <Image alt='App-Store' src={AppStoreSVG} width={100} height={0}/>
                        </button>
                    </div>
                </div>
                <div id="where to go" className="w-screen justify-center items-start flex flex-row max-w-xl gap-x-10">
                    <div className="flex flex-col items-start">
                        <h4 className="text-lg text-left text-slate-100">Pages</h4>
                        <div className="flex flex-col items-start ml-1.5">
                            <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Home</Link>
                            <Link href={'/go/about'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">About Us</Link>
                            <Link href={'/go/contact'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Contact Us</Link>
                            <Link href={'/go/team'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Our Team</Link>
                            <Link href={'/login'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Login</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <h4 className="text-lg text-left text-slate-100">Legal</h4>
                        <div className="flex flex-col items-start ml-1.5">
                            <Link href={'/privacy_policy.HTML'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Privacy Policy</Link>
                            <Link href={'/eula.HTML'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">EULA</Link>
                            <Link href={'/terms.HTML'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Terms</Link>
                            {/* <Link href={'/'} className="text-md text-right opacity-80 transition hover:scale-105 hover:underline decoration-2 decoration-zinc-300 underline-offset-2">Our Team</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}