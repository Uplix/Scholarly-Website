'use client'
import Link from 'next/link'
import {auth} from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import StudentIcon from '@/components/studentdesk.svg'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useSession } from 'next-auth/react'
import { signOut as fullSignOut } from 'next-auth/react'

export default function Home({params}:{params:{district:string}}) {
    const router = useRouter();
    const session = useSession();

    const studentLogin = async () =>{
        if(session.status != "authenticated"){
            router.push('/login/'+params.district +'/studentLogin');
        }else if(auth.currentUser != undefined && auth.currentUser != null){
            router.push('/login/'+params.district +'/student/schedule');
        }else{
            router.push('/login/' + params.district + '/studentLogin')
        }
    }

    const staffLogin = () =>{
        router.push('/login/' + params.district + '/staffLogin');
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-center w-screen py-5'>
            <title>Scholarly: Login</title>
            <h2 className='text-7xl font-semibold text-center'>Sign In</h2>
            <h5 className='text-4xl text-center mt-7 max-w-xl px-8'>What kind of account do you want to login to?</h5>
            <div className='flex flex-row flex-wrap items-center justify-center gap-x-16 gap-y-10 mt-12 px-8'>
                <button onClick={studentLogin} className='bg-gradient-to-br transition from-indigo-500 from-15% via-sky-500 via-40% to-emerald-500 hover:scale-110 w-48 h-64 rounded-lg flex flex-col items-center justify-end'>
                    <Image className='mb-8 scale-125' alt='Student Icon' src={StudentIcon} width={55} height={55}/>
                    <h4 className='text-4xl font-semibold mb-14'>Student</h4>
                </button>
                <button onClick={staffLogin} className='bg-gradient-to-bl transition from-indigo-500 from-15% via-sky-500 via-40% to-emerald-500 hover:scale-110 w-48 h-64 rounded-lg flex flex-col items-center justify-end'>
                    <SupervisorAccountIcon className='mb-1.5' sx={{fontSize:110}} />
                    <h4 className='text-4xl font-semibold mb-14'>Staff</h4>
                </button>
            </div>
        </main>
    )
}
