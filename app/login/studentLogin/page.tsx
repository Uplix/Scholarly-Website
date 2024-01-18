'use client'
import Image from "next/image";
import { auth, db, } from "@/firebase/config";
import { onValue, ref } from "firebase/database";
import { signIn, useSession } from "next-auth/react";
import * as React from 'react'
import { GoogleAuthProvider,signInWithCredential } from "firebase/auth";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
// import { databaseLogin } from "@/clientSide/studentLoggedIn";

// import authentication from "@/serverFunctions/authentication";

// import { useRouter } from "next/navigation";

function delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}

export default function StudentLogin(){
    const [loading, setLoading] = React.useState(true);
    const { data:session } = useSession();
    const router = useRouter();
    const [currentSigningIn, setCurrentSigningIn] = React.useState(false);
    // onAuthStateChanged(auth, ()=>setUser(auth.currentUser));

    // console.log("reloaded, user variable =>", auth.currentUser?.displayName)

    React.useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            if(auth.currentUser?.displayName != null && auth.currentUser.displayName != undefined && !currentSigningIn){
                router.push('/login/studentLogin/student');
                // console.log(auth.currentUser);
            }else{
                setLoading(false);
            }
        }, 2000)
    }, [])

    var signInEmail:null|string = null

    onValue(ref(db, "mhusd/signinEmail"), (snapshot)=>{
        signInEmail = snapshot.val();
        // console.log("The sign in email: " + signInEmail)
    })
    const login = async ()=>{
        setLoading(true);
        await delay(1000);
        try{
            if(signInEmail != null){
                await signIn('google');
                if(session?.user?.email?.split('@')[1] == signInEmail){
                    setCurrentSigningIn(true);
                    const credential = GoogleAuthProvider.credential(session?.id_token);
                    await signInWithCredential(auth, credential);
                    // await databaseLogin();
                    // setUser(true);
                    // alert(auth.currentUser?.email);
                }else{
                    throw new Error("Please use your school Google account to login ending in " + signInEmail +". Your email: " + session?.user?.email);
                }
            }else{
                throw new Error("Couldn't fetch from server");
            }
        }catch(e){
            alert("Login failed: " + e + ". ");
            setCurrentSigningIn(true);
            setLoading(false);
        }
    }

    const LoginButton = () =>{
        return(
            <div>
                <button disabled={loading} onClick={login} className="p-6 rounded-3xl hover:backdrop-brightness-110">
                    {loading? 
                        <CircularProgress size={100} thickness={2}/>:
                        <div className="flex flex-col">
                            <text className="text-center text-6xl text-white">
                                Login in with{" "}
                            </text>
                            <text className="text-[#4285F4] text-center text-6xl mt-4">
                                G
                                <text className="text-[#EA4336]">o</text>
                                <text className="text-[#FBBC04]">o</text>
                                <text className="text-[#4285F4]">g</text>
                                <text className="text-[#34A853]">l</text>
                                <text className="text-[#EA4336]">e</text>
                            </text>
                        </div>
                    }
                </button>
                {/* <button onClick={()=>logout()}>Sign Out</button> */}
            </div>
        )
    }

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
            <div className="flex h-1/3 justify-center p-16">
                <LoginButton />
            </div>
        </div>
    )
}