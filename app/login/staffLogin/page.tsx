'use client'
import * as React from 'react'
import { TextField, Backdrop, CircularProgress } from "@mui/material"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function StaffLogin(){
    const [theEmail, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const [passwordInput, setPasswordInput]:any = React.useState(null);   
    const [loading, setLoading] = React.useState(false)   
    const router = useRouter();

    const validateEmail = (email:string) =>{
        if(email.includes('@') && email.split('@')[0] != undefined && email.split('@')[0] != null && email.split('@')[1] != undefined && email.split('@')[1] != null && email.split('@')[1].includes('.') && email.split('@')[1].split('.')[0] != undefined && email.split('@')[1].split('.')[0] != null && email.split('@')[1].split('.')[1] != undefined && email.split('@')[1].split('.')[1] != null){
            return true;
        }else{
            return false;
        }
    }

    const login = async () =>{
        setLoading(true)
        if(validateEmail(theEmail)){
            try{
                await signInWithEmailAndPassword(auth, theEmail, password);
                setLoading(false);
                router.push('/login/staffLogin/staff/upcomingSessions')
            }catch(e:any){
                alert('Login error: ' + e.message);
                setError(true);
                setLoading(false)
            }
        }else{
            setError(true);
            setLoading(false);
            alert('Invalid Email');
        }
        setLoading(false);
    }

    return(
        <>
            <div className="flex w-full flex-col h-screen justify-center items-center">
                <div className="flex flex-col bg-[#1e1e1e] w-96 h-fit md:w-1/2 xl:w-1/3 mt-4 mb-4 py-16 justify-center space-y-16 items-center focus:shadow-md focus:shadow-slate-600 rounded-3xl">
                    <text className='text-6xl'>Staff Login</text>
                    <div className="w-fit h-fit flex flex-col space-y-5">
                        <text className='text-3xl'>Email:</text>
                        <TextField onKeyDown={(key)=>{
                            if(key.code === 'Enter' && passwordInput != null){
                                passwordInput.focus();
                            }
                        }} onChange={(event)=>setEmail(event.target.value)} error={error} id='email-input' type='email' label='Your Email' sx={{width:300}}/>
                    </div>
                    <div className="w-fit h-fit flex flex-col space-y-5">
                        <text className='text-3xl'>Password:</text>
                        <TextField onKeyDown={(key)=>{
                            if(key.code === 'Enter'){
                                login();
                            }
                        }} inputRef={(input)=>{setPasswordInput(input)}} onChange={(event)=>setPassword(event.target.value)} error={error} id='password-input' type='password' label='Password' sx={{width:300}}/>
                    </div>
                    <button onClick={login} className='bg-gradient-to-br from-green-400 to-emerald-700 w-fit h-fit px-5 py-3 text-5xl rounded-xl transition-all duration-200 hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Login</button>
                </div>
            </div>
            <Backdrop open={loading}>
                <div className='flex flex-col w-screen h-screen justify-center items-center'>
                    <CircularProgress size={100} thickness={1.5}/>
                </div>
            </Backdrop>
        </>
    )
}