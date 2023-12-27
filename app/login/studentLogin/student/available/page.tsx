'use client'
import * as React from 'react'
import { db, auth } from "@/firebase/config"
import { onValue, ref, set } from "firebase/database"
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var now = new Date();

export default function Page() {
    const [schedule, setSchedule]:any[] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0);
    const [styling, setStyling]:any[] = React.useState([]);

    interface session{
        available:boolean,
        date:number,
        email:string,
        grade:number,
        name:string,
        subject:string,
        text:string,
        time:'',
        tutoree:string,
        // tutorer:null|{
        //     name:string,
        //     id:string
        // }
    }

    React.useEffect(()=>{
        var theAvailable: any[] = [];
        var theStyling: string[] = [];
        // setTimeout(()=>{
            onValue(ref(db, 'mhusd/sessions/'), (snapshot)=>{
                snapshot.forEach((id) =>{
                    if(id.key != auth.currentUser?.uid){
                      id.forEach((child)=>{
                        var value = child.val();
                        if(value.date >= now.getTime()){
                          if(value.available){
                            value.milliseconds = value.date;
                            value.date = new Date(value.date);
                            var indiv = {
                              key:[id.key, child.key],
                              value:value
                            }
                            theAvailable.push(indiv);
                          }
                        }
                      })
                    }
                  })
            })
        // }, 1000)
        setStyling(theStyling);
        setSchedule(theAvailable);
        // console.log(theSchedule)
    }, [refresh])
    React.useEffect(()=>{
        setTimeout(()=>setRefresh(refresh+1), 1000); 
    }, [])

    const Tab = (object:session, i:number) =>{
        var date = new Date(object.date);
        const open=()=>{
            var array = styling;
            array[i] = 'open';
            setStyling([...array]);
        } 
        const close=()=>{
            var array = styling;
            array[i] = 'close';
            setStyling([...array]);
        }

        if(styling[i] == 'open')return(
            <div className='relative flex h-96 transition hover:scale-105 hover:-translate-y-2'>
                <button onClick={open} className='flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-out ease-out'>
                    <div className='flex flex-col'>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-10'>{object.time}</text>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-8'>{object.subject}</text>
                        <text className='text-center text-slate-50 text-4xl ml-6 mt-8'>Grade Level:{' ' + object.grade}</text>
                    </div>
                    <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
                        <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
                        <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
                    </div>
                </button>
                <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-in animate-ease-in transition hover:scale-125 hover:-translate-y-1 pb-6'>
                    <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
                        <CloseIcon fontSize='large'/>
                    </button>
                    <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>Available</text>
                    <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-rose-700 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Cancel</button>
                </div>
            </div>
        )
        
        if(styling[i] == 'close')return(
            <div className='relative flex h-64 transition hover:scale-105 hover:-translate-y-2'>
                <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-out animate-ease-out pb-6'>
                    <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
                        <CloseIcon fontSize='large'/>
                    </button>
                    <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
                    <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
                    <text className='text-center text-3xl text-slate-50 mt-3'>Available</text>
                    <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-rose-700 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Cancel</button>
                </div>
                <button onClick={open} className='flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-in ease-in'>
                    <div className='flex flex-col'>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-10'>{object.time}</text>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-8'>{object.subject}</text>
                        <text className='text-center text-slate-50 text-4xl ml-6 mt-8'>Grade Level:{' ' + object.grade}</text>
                    </div>
                    <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
                        <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
                        <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
                    </div>
                </button>
            </div>
        )

        return(
            <div className='transition hover:scale-105 hover:-translate-y-2'>
                <button onClick={open} className='flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl relative animate-jump-in animate-ease-in'>
                    <div className='flex flex-col'>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-10'>{object.time}</text>
                        <text className='text-left text-slate-50 text-4xl ml-6 mt-8'>{object.subject}</text>
                        <text className='text-center text-slate-50 text-4xl ml-6 mt-8'>Grade Level:{' ' + object.grade}</text>
                    </div>
                    <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
                        <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
                        <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
                    </div>
                </button>

            </div>
        )
    }

    return(
        <div className='w-screen h-full flex flex-col'>
            <button onClick={()=>setRefresh(refresh+1)} className='self-end mt-6 mr-12 transition ease-in-out hover:scale-110 hover:-translate-y-2'>
                <CachedIcon sx={{fontSize:55}}/>
            </button>
            <div className='flex flex-wrap justify-center items-center gap-x-20 gap-y-20 w-full h-full pb-14'>
                {schedule.map((object:session, i:number)=>Tab(object, i))}
            </div>
        </div>
    )
}