'use client'
import {auth, db} from '@/firebase/config'
import { set, ref } from 'firebase/database';
import { Avatar, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react'
import { useRouter } from 'next/navigation';

const grades = [9, 10, 11, 12];
const schools = ["Ann Sobrato"];

export default function CreateAccount({params}:{params:{district:string}}){
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [grade, setGrade] = React.useState<number|null>(null);
    const [school, setSchool] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false);

    React.useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    const createAccount = ()=>{
        if(grade!= null && school != ""){
            setError(false);
            setLoading(true);
            set(ref(db, params.district + '/users/' + auth.currentUser?.uid + '/name'), auth.currentUser?.displayName);
            set(ref(db, params.district + '/users/' + auth.currentUser?.uid + '/district'), auth.currentUser?.email?.split('@')[1].split('.')[1]);
            set(ref(db, params.district + "/users/" + auth.currentUser?.uid + "/image"), auth.currentUser?.photoURL);
            set(ref(db, params.district + "/users/" + auth.currentUser?.uid + "/school"), school);
            set(ref(db, params.district + "/users/" + auth.currentUser?.uid + "/grade"), grade);
            setTimeout(()=>{
                router.push('/login/' + params.district + '/student');
            }, 1500)
        }else{
            setError(true);
        }
    }

    if(loading)return<div className='w-screen h-screen flex flex-col items-center justify-center'><CircularProgress size={100} thickness={1.5}/></div>

    return(
        <div className='flex flex-col w-screen min-h-screen h-fit items-center pt-14'>
            <div className="w-fit h-fit flex flex-col px-7 sm:px-14">
                <h2 className="text-4xl font-light text-center">We want to know a little bit more about you</h2>
                <div className='flex flex-row gap-x-4 flex-wrap gap-y-2 mt-8 items-center'>
                    <h2 className='text-2xl font-light text-slate-100 opacity-80'>Profile Picture:</h2>
                    <Avatar src={auth.currentUser?.photoURL} sx={{width:50, height:50}}/>
                </div>
                <h4 className='text-2xl font-light mt-8 text-slate-100'><span className='opacity-80'>Name:</span> {auth.currentUser?.displayName}</h4>
                <h4 className='text-2xl font-light mt-6 text-slate-100'><span className='opacity-80'>District:</span> {auth.currentUser?.email?.split('@')[1].split('.')[1].toUpperCase()}</h4>

                <h4 className='text-2xl font-light mt-6 text-slate-100 opacity-80'>Grade:</h4>
                <FormControl sx={{width:170, marginTop:1.5, marginLeft:3}} variant='outlined'>
                    <InputLabel id="grade_select_label">Grade</InputLabel>
                    <Select
                    labelId='grade_select_label'
                    id='grade_select'
                    value={grade}
                    label="Grade"
                    onChange={(event)=>{
                        setGrade(event.target.value as number);
                    }}
                    >
                        {grades.map((value)=>(<MenuItem key={value+'grade'} id={value+"grade"} value={value}>{value}</MenuItem>))}
                    </Select>
                </FormControl>

                <h4 className='text-2xl font-light mt-7 text-slate-100 opacity-80'>School:</h4>
                <FormControl sx={{width:220, marginTop:1.5, marginLeft:3}} variant='outlined'>
                    <InputLabel id="school_select_label">School</InputLabel>
                    <Select
                    labelId='school_select_label'
                    id='school_select'
                    value={school}
                    label="School"
                    onChange={(event)=>{
                        setSchool(event.target.value as string);
                    }}
                    >
                        {schools.map((value)=>(<MenuItem key={value + 'schools'} id={value+"school"} value={value}>{value}</MenuItem>))}
                    </Select>
                </FormControl>
                <button onClick={createAccount} className={error?"w-fit h-fit self-center mt-9 bg-gradient-radial from-red-300 to-rose-500 px-4 py-2 rounded-lg text-xl transition hover:opacity-80":'w-fit h-fit self-center mt-9 bg-gradient-radial from-green-300 to-emerald-500 px-4 py-2 rounded-lg text-xl transition hover:opacity-80'}>Join the Scholarly community</button>
            </div>
        </div>
    )
}