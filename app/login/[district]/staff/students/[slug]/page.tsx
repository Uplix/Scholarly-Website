'use client'
import * as React from 'react'
import { onValue, ref, set, remove } from 'firebase/database';
import { db } from '@/firebase/config';
import { Avatar, Rating, Modal, Collapse, Dialog, CircularProgress } from '@mui/material';
import {session} from '@/clientSide/interfaces'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined'

const colors = ["neutral", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];

function delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}

export default function IndivStudent({params}:{params:{slug:string, district:string}}){
    // alert(params.slug)
    const [user, setUser] = React.useState<any>(null);
    const [reports, setReports] = React.useState<any[]>([]);
    const [schedule, setSchedule] = React.useState<session[]>([]);
    const [modaleOpenArray, setModalOpenArray] = React.useState<boolean[]>([]);
    const [slideOpenArray, setSlideOpenArray] = React.useState<boolean[]>([]);
    const [reload, setReload] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(()=>{
        setLoading(true);
        let theUser:any = {}
        let theReports:any[] = []
        let theSchedule:session[] = []
        let theModalOpenArray:boolean[] =[]
        let theSlideOpenArray:boolean[] = []
        // let theColorStops = [];
        // for(var i = 0; i < 6; i++){
        //     if(i%2 == 0){
        //         theColorStops[i] = Math.round((Math.random() * 18));
        //     }else{
        //         theColorStops[i] = (3+Math.round((Math.random() * 3)))*100;
        //     }
        // }
        onValue(ref(db, params.district + '/users/' + params.slug), (snapshot)=>{
            theUser = snapshot.val();
            // console.log(theUser)
        })

        onValue(ref(db, params.district + "/reports/" + params.slug), (snapshot)=>{
            snapshot.forEach((report)=>{
                theReports.push(report.val())
            })
        })
        
        onValue(ref(db, params.district + "/schedule/" + params.slug), (snapshot)=>{
            snapshot.forEach((child)=>{
                theSchedule.push(child.val());
                theModalOpenArray.push(false)
                theSlideOpenArray.push(false)
            })
        })
        // console.log(theColorStops)
        // setColorStops(`bg-gradient-to-br from-${colors[theColorStops[0]]}-${theColorStops[1]} via-${colors[theColorStops[2]]}-${theColorStops[3]} to-${colors[theColorStops[4]]}-${theColorStops[5]} w-full h-56`)
        setTimeout(()=>{
            let ratingSum = 0;
            let ratingCount = 0;
            for(var i in theUser?.ratings){
                ratingSum += theUser?.ratings[i];
                ratingCount++
            }
            theUser.ratings = (ratingCount==0)?0:ratingSum/ratingCount;
            theUser.numRatings = ratingCount
            // console.log(theUser.ratings);
            setTimeout(async ()=>{
                setModalOpenArray(theModalOpenArray);
                setSlideOpenArray(theSlideOpenArray);
                setUser(theUser);
                setReports(theReports);
                setSchedule(theSchedule);
                await delay(600);
                setLoading(false);
            }, 600)
        }, 600)
    }, [reload])

    const ScheduleBlock =(object:session, i:number)=>{
        let date = new Date(object.date);
        const open = ()=>{
            let theModalOpen = modaleOpenArray;
            theModalOpen[i] = true;
            setModalOpenArray([...theModalOpen])

            setTimeout(()=>{
                let theSlideOpen = slideOpenArray;
                theSlideOpen[i] = true;
                setSlideOpenArray([...theSlideOpen])
            }, 350)
        }

        const close = ()=>{
            let theSlideOpen = slideOpenArray;
            theSlideOpen[i] = false;
            setSlideOpenArray([...theSlideOpen])

            setTimeout(()=>{
                let theModalOpen = modaleOpenArray;
                theModalOpen[i] = false;
                setModalOpenArray([...theModalOpen])
            }, 350)
        }
        
        return(
            <>
                <button onClick={open} className='w-fit h-fit' key={object.childKey}>
                    <div className='w-80 h-52 flex-col rounded-xl bg-[#131921] drop-shadow-lg outline outline-1 outline-zinc-700'>
                        <div className='w-full h-2/5 flex flex-row items-center justify-start bg-[#111720] px-6'>
                            <div className='p-1 outline rounded-lg outline-1 outline-zinc-500 -ml-1.5'>
                                {(object.location !== "Google Meets")?<RoomOutlinedIcon fontSize='large'/>:<SettingsInputAntennaOutlinedIcon fontSize='large'/>}
                            </div>
                            <h4 className='text-2xl ml-3'>{object.subject}</h4>
                        </div>
                        <div className='w-full h-3/5 flex flex-col px-8'>
                            <div className='flex-grow w-full flex flex-row items-center'>
                                <h4 className='text-lg opacity-90 font-light'>{date.toDateString()}</h4>
                            </div>
                            <div className='w-full h-0.5 rounded-lg bg-zinc-800'/>
                            <div className='flex-grow w-full flex flex-row items-center'>
                                <h4 className='text-lg opacity-90 font-light'>{object.time}</h4>
                            </div>
                        </div>
                    </div>
                </button>
                <Modal open={modaleOpenArray[i]} onClose={close}>
                    <div className='w-screen h-screen flex flex-row'>
                        <button onClick={close} className='flex-grow h-screen cursor-default'/>
                        <Collapse className='w-fit h-fit outline outline-l-1 outline-slate-300' sx={{overflow:'scroll'}} orientation='horizontal' in={slideOpenArray[i]} >
                            <div className='w-80 h-scren bg-[#121820] flex flex-col pt-7 pb-7 px-7 relative min-h-screen'>
                                <h3 className='text-lg opacity-50'>Posted by:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.name}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Tutor:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{((object.hasOwnProperty('tutorer'))?((object.tutorer.hasOwnProperty('name'))?object.tutorer.name:"No current tutor"):"No current tutor")}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Subject:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.subject}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Grade:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.grade}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Location:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.location}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Date:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{date.toDateString()}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Time:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.time}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Description:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.text}</h3>
                                {/* <button onClick={pressed} className='w-fit h-fit text-lg bg-red-500 font-light py-1.5 px-5 hover:bg-opacity-80 rounded-lg self-center mt-10'>Cancel Request</button> */}
                            </div>
                        </Collapse>
                    </div>
                </Modal>
            </>
        )
    }

    const makeTutor=()=>{
        set(ref(db, params.district + '/users/' + params.slug + '/isTutor'), true);
        setReload(reload+1);
    }

    const removeTutor=()=>{
        set(ref(db, params.district + '/users/' + params.slug + '/isTutor'), false);
        setReload(reload+1);
    }

    const blockStudent =()=>{
        if(user?.blocked){
            remove(ref(db, params.district + "/users/"  + params.slug + "/blocked"));
            set(ref(db, params.district + "/users/" + params.slug + "/district"), params.district);
        }else{
            set(ref(db, params.district + "/users/"  + params.slug + "/blocked"), true);
            set(ref(db, params.district + "/users/" + params.slug + "/district"), "blocked");
        }
        setReload(reload+1);
    }

    if(loading)return<Modal open><div className='w-screen h-screen flex flex-col items-center justify-center'><CircularProgress size={100} thickness={1.5}/></div></Modal>
    // console.log(user?.ratings)
    return(
        <div className='w-full h-full min-h-screen flex flex-col pl-0 px-1 lg:pl-2 lg:px-0'>
            <div className='bg-gradient-to-br from-sky-400 via-emerald-300 to-violet-500 w-full h-fit rounded-xl flex flex-col'>
                <div className='w-full h-48'/>
            </div>
            <div className='w-full h-fit flex flex-row flex-wrap gap-x-4'>
                <div className='w-full max-w-md h-fit flex flex-col'>
                    <div className='ml-16 -mt-14'>
                        {(user?.image == null || user?.image == "")?<CircularProgress sx={{color:'powderblue'}} thickness={1.5} size={70}/>:<Avatar src={user?.image} sx={{width:80, height:80}}/>}
                    </div>
                    <div className='ml-10 mt-4 flex flex-col'>
                        <h3 className='text-3xl font-bold font-sans'>{user?.name}</h3>
                        <div className='flex flex-row flex-wrap pr-6 mt-4 gap-x-20'>
                            <div className='flex flex-col'>
                                <h5 className='text-xl font-light text-opacity-75'>Grade: {user?.grade}</h5>
                                <h5 className='text-xl font-light text-opacity-75 mt-1.5'>Tutor: {user?.isTutor == undefined || user?.isTutor == null || user?.isTutor == false? "No":"Yes!"}</h5>
                            </div>
                            <div className='flex flex-col'>
                                <h5 className='text-xl font-light text-opacity-75'>District: {user?.district?.toUpperCase()}</h5>
                                <h5 className='text-xl font-light text-opacity-75 mt-1.5'>School: {user?.school}</h5>
                            </div>
                        </div>
                        {/* <h5 className='text-xl font-light text-opacity-75 mt-2'>UID: {params.slug}</h5> */}
                        <div className='mt-4 ml-6 w-fit h-fit flex flex-row gap-x-1.5 items-end'>
                            {user == null?null:<Rating size='large' value={user?.ratings} precision={0.1} readOnly={true}/>}
                            {user==null?null:<h5 className='text-base opacity-90'>{"("+user?.numRatings+")"}</h5>}
                        </div>
                        <div className='w-fit h-fit ml-12 flex flex-col items-center'>
                            <h3 className='text-2xl font-medium mt-8'>Reports</h3>
                            <div className='w-fit h-fit mt-2 border border-slate-200 border-opacity-50 rounded-lg px-4 py-2'>
                                {reports.length > 0? <div></div>:<h3 className='text-2xl text-center text-slate-200'>Nothing to report 👍</h3>}
                            </div>
                        </div>
                        <div className='w-fit h-fit mt-12 flex flex-row items-center gap-x-5'>
                            {user?.isTutor?<button onClick={removeTutor} className='bg-gradient-radial from-red-300 to-rose-500 px-4 py-2 rounded-lg text-xl transition hover:opacity-80'>Remove tutor</button>:<button onClick={makeTutor} className='bg-gradient-radial from-green-300 to-emerald-500 px-4 py-2 rounded-lg text-xl transition hover:opacity-80'>Upgrade to tutor</button>}
                            <button onClick={blockStudent} className='bg-gradient-radial from-rose-400 via-red-500 to-red-600 px-4 py-2 rounded-lg text-xl transition hover:opacity-80'>{user?.blocked == true?"Unblock student":"Block student"}</button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col min-w-fit flex-grow px-14 h-fit items-center'>
                    <h4 className='text-4xl font-medium mt-10'>Student Schedule</h4>
                    <div className='flex flex-col mt-3 w-fit h-fit gap-y-14 px-10 rounded-lg py-4 ml-16'>
                        {schedule.length > 0? schedule.map((value, index)=>ScheduleBlock(value, index)):<h3 className='text-2xl text-center text-slate-200'>Nothing in schedule🥺</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}