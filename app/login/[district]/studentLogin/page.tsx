'use client'
import Image from "next/image";
import { auth, db, } from "@/firebase/config";
import { onValue, ref } from "firebase/database";
import { signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react'
import { GoogleAuthProvider,signInWithCredential } from "firebase/auth";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

// import { databaseLogin } from "@/clientSide/studentLoggedIn";

// import authentication from "@/serverFunctions/authentication";

// import { useRouter } from "next/navigation";

const now = new Date();

function delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}

export default function StudentLogin({params}:{params:{district:string}}){
    const checker = (string:string)=>{
        if(string.search(params.district) != -1){
            return string;
        }
    }

    const [loading, setLoading] = React.useState(true);
    const { data:session } = useSession();
    const router = useRouter();
    const [currentSigningIn, setCurrentSigningIn] = React.useState(false);
    const [windows, setWindows] = React.useState<number>(1200);
    const [districtIconRef, setDistrictIconRef] = React.useState(process.env.NEXT_PUBLIC_DISTRICTS?.split(',')?.find(checker)?.split(':')[2]);
    React.useEffect(()=>{
        setDistrictIconRef(process.env.NEXT_PUBLIC_DISTRICTS?.split(',')?.find(checker)?.split(':')[2])
    })

    React.useEffect(()=>{
        window.addEventListener('resize', ()=> {
            setWindows((window != undefined)? window.innerWidth:0)
        })
    })
    // onAuthStateChanged(auth, ()=>setUser(auth.currentUser));

    // console.log("reloaded, user variable =>", auth.currentUser?.displayName)

    React.useEffect(()=>{
        setLoading(true);
        setTimeout(async ()=>{
            
            if(session?.expires != undefined){
                try{
                    await delay(1000);
                    let expiring = session.expires.split('-');
                    if(Number(expiring[0]) < now.getFullYear() || Number(expiring[0]) < now.getMonth() || (Number(expiring[0]) == now.getMonth() && Number(expiring[0]) < now.getDay())){
                        alert("Session is out of date, need to sign back in")
                        await signOut();
                    }else{
                        if(auth.currentUser?.displayName != null && auth.currentUser.displayName != undefined && !currentSigningIn){
                            router.push("/login/" + params.district + '/student')
                        }else if(session?.user?.email?.split('@')[1] == signInEmail){
                            setCurrentSigningIn(true);
                            const credential = GoogleAuthProvider.credential(session?.id_token);
                            await signInWithCredential(auth, credential);
                            router.push('/login/' + params.district + '/student')
                            // await databaseLogin();
                            // setUser(true);
                            // alert(auth.currentUser?.email);
                        }else{
                            throw new Error("Please use your school Google account to login ending in " + signInEmail +". Your email: " + session?.user?.email);
                        }
                    }
                }catch(e){
                    alert("Login failed: "+e)
                    setLoading(false)
                }
            }else{
                // console.log('here', session?.user)
                setLoading(false);
            }
        }, 2000)
    }, [session])

    
    var signInEmail:undefined|string = process.env.NEXT_PUBLIC_DISTRICTS?.split(',')?.find(checker)?.split(':')[1]
    // alert(signInEmail)
    // onValue(ref(db, "mhusd/signinEmail"), (snapshot)=>{
    //     signInEmail = snapshot.val();
    //     // console.log("The sign in email: " + signInEmail)
    // })
    const login = async ()=>{
        setLoading(true);
        await delay(1000);
        try{
            if(signInEmail != undefined && signInEmail != null){
                await signIn('google');
                // await delay(1000);
                // if(session?.user?.email?.split('@')[1] == signInEmail){
                //     setCurrentSigningIn(true);
                //     const credential = GoogleAuthProvider.credential(session?.id_token);
                //     await signInWithCredential(auth, credential);
                //     // await databaseLogin();
                //     // setUser(true);
                //     // alert(auth.currentUser?.email);
                // }else{
                //     throw new Error("Please use your school Google account to login ending in " + signInEmail +". Your email: " + session?.user?.email);
                // }
            }else{
                throw new Error("Couldn't find sign in email. Check your distict!");
            }
        }catch(e){
            alert("Login failed: " + e + ". ");
            setCurrentSigningIn(true);
            setLoading(false);
        }
    }

    const LoginButton = () =>{
        if(loading)return<CircularProgress size={60} thickness={1.5} />
        return(
            <div className="w-fit h-fit animate-jump-in animate-ease-in-out">
                <button disabled={loading} onClick={login} className="flex flex-row w-fit h-fit transition-all hover:scale-105 hover:-translate-y-0.5 bg-[#f2f2f2] hover:bg-[#e4e4e4] rounded-lg shadow-lg shadow-black items-center justify-center pr-3">
                    <Image alt="g-icon" src={'/images/googleIcon.png'} width={60} height={60}/>
                    <h5 className="text-left text-xl text-zinc-800">
                        Sign in with
                        <span className="text-2xl">
                            <span className="text-[#4285F4]"> G</span>
                            <span className="text-[#EA4336]">o</span>
                            <span className="text-[#FBBC04]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4336]">e</span>
                        </span>
                    </h5>
                </button>
            </div>
        )
    }

    return(
        <div className="flex flex-row min-h-screen w-screen justify-center items-center">
            <title>Scholarly: Student Login</title>
            <div className="w-full h-full flex flex-col max-w-3xl items-center justify-center">
                <div className="h-fit w-52 flex flex-row justify-center items-center">
                    <Image alt='Scholarly' src={'/images/sizedCircularScholarlyIcon.png'} width={70} height={70}/>
                    <div className="flex-grow"/>
                    <Image alt="District-Logo" src={'/images/' + districtIconRef} width={70} height={70}/>
                </div>
                <h4 className="text-4xl text-center mt-6 font-light px-5">Sign in to your account</h4>
                <div className="w-fit h-fit mt-12">
                    <LoginButton />
                </div>
            </div>
            <div className="flex-grow"/>
            {(windows >= 1024)?<div className="flex w-1/2 relative h-screen">
                <div className="absolute w-full h-full overflow-auto">
                    <Image className="object-cover w-full h-full" alt="vertical-kids" fill={true} src={'/images/verticalKidsLogin.jpeg'} />
                </div>
            </div>:null}
        </div>
    )
}