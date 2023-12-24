'use client'
import Image from "next/image";
import { auth, db, } from "@/firebase/config";
import { onValue, ref } from "firebase/database";
import { signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react'
import { GoogleAuthProvider,onAuthStateChanged,signInWithCredential, signInWithCustomToken } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


// import authentication from "@/serverFunctions/authentication";

// import { useRouter } from "next/navigation";

export default function StudentLogin(){
    const [loading, setLoading] = React.useState(true);
    const { data:session } = useSession();
    const router = useRouter();
    // onAuthStateChanged(auth, ()=>setUser(auth.currentUser));

    console.log("reloaded, user variable =>", auth.currentUser?.displayName)

    React.useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            if(auth.currentUser?.displayName != null && auth.currentUser.displayName != undefined){
                router.push('/login/studentLogin/student');
            }else{
                setLoading(false);
            }
        }, 500)
    }, [])

    var signInEmail:null|string = null

    onValue(ref(db, "mhusd/signinEmail"), (snapshot)=>{
        signInEmail = snapshot.val();
        // console.log("The sign in email: " + signInEmail)
    })
    const login = ()=>{
        try{
            setLoading(true);
            setTimeout(async ()=>{
                try{
                    if(signInEmail != null){
                        await signIn('google');
                        if(session?.user?.email?.split('@')[1] == signInEmail){
                            const credential = GoogleAuthProvider.credential(session?.id_token);
                            await signInWithCredential(auth, credential);
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
                    setLoading(false);
                }
                
            }, 250)
        }catch(e){
            alert("Login failed: " + e + ". Please try again.");
            setLoading(false);
        }
    }

    const logout = () =>{
    //    signOut();
        alert(auth.currentUser?.email)
    }

    const LoginButton = () =>{
        return(
            <div className="flex h-1/3 justify-center">
                <button disabled={loading} onClick={login} className="w-3/4">
                    {loading? 
                        <div className="animate-spin inline-block w-20 h-20 border-[5px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
                            <span className="sr-only">Loading...</span>
                        </div>:
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
            <LoginButton />
        </div>
    )
}