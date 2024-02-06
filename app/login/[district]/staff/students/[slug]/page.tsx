'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { onValue, ref } from 'firebase/database';
import { db } from '@/firebase/config';

export default function IndivStudent({params}:{params:{slug:string, district:string}}){
    const router = useRouter();
    // alert(params.slug)

    React.useEffect(()=>{
        onValue(ref(db, 'mhusd/users/' + params.slug), (snapshot)=>{

        })
    }, [])

    return(
        <div>

        </div>
    )
}