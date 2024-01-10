'use client'
import * as React from 'react'
import { onValue, ref, query, orderByChild, startAt, endAt} from 'firebase/database'
import { db } from '@/firebase/config'

export default function Students(){
    const [letter, setLetter] = React.useState('a');
    const [students, setStudents] = React.useState([]);

    React.useEffect(()=>{
        const q = query(ref(db, 'mhusd/users/'), orderByChild('name'), startAt(letter), endAt(letter))
        onValue(q, (snapshot)=>{

        })
    }, [])

    return(
        <div>
            
        </div>
    )
}