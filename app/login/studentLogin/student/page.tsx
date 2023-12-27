'use client'
import {auth} from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { signOut as signOutReactAuth } from 'next-auth/react'
export default function Page() {
    const signingOut = () =>{
        alert(auth.currentUser?.displayName);
        signOut(auth);
        signOutReactAuth();
    }
    return(
        <div className="flex flex-col justify-center align-middle">
            <text className="text-4xl text-zinc-200 text-center">The current user: {auth.currentUser?.displayName}</text>
            <button className='mt-7 text-4xl' onClick={signingOut}>Sign Out</button>
        </div>
    )
}
