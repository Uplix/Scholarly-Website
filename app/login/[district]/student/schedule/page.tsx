'use client'
import * as React from 'react'
import { db, auth } from "@/firebase/config"
import { onValue, ref, set, remove, push } from "firebase/database"
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined';
import { Modal, CircularProgress, Dialog, Collapse, Rating, Checkbox, FormControlLabel, TextField} from '@mui/material';
import { session } from '@/clientSide/interfaces';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';

import { AlertContext } from '../layout';
import { error } from 'console';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = new Date();
const ratingLabels = ["Useless", "Poor", "Ok", "Good", "Excellent!"]

export default function Page({params}:{params:{district:string}}) {
    const alerter = React.useContext(AlertContext);

    const [schedule, setSchedule]:any[] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0);
    // const [styling, setStyling]:any[] = React.useState([]);

// ⬇ this should be set to schedule|null but because i am too lazy to mess with the interface right now i will leave as any. Please come back and fix type session to account for what could possibly be undefined or null and what has to be there :)
    const [focused, setFocused]= React.useState<any>(null);

    const [cancelLoad, setCancelLoad] = React.useState(false);
    const [cancelDialog, setCancelDialog] = React.useState(false);
    const [modaleOpenArray, setModalOpenArray] = React.useState<boolean[]>([]);
    const [slideOpenArray, setSlideOpenArray] = React.useState<boolean[]>([]);
    const [rater, setRater] = React.useState<any[]>([]);
    
    React.useEffect(()=>{
        let theSchedule: any[] = [];
        let theModalOpenArray: boolean[] = [];
        let theSlideOpenArray: boolean[] = [];
        let theRater: any[] = [];
        // console.log(refresh)
        // console.log(auth.currentUser?.uid)
        // setTimeout(()=>{
        onValue(ref(db, params.district + '/schedule/' + auth.currentUser?.uid), (snapshot)=>{
            // console.log(snapshot.val())
            snapshot.forEach((child)=>{
                // var aChild:session = child.toJSON();
                // aChild.design = "flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl relative transition hover:scale-110 hover:-translate-y-4"

                var theJSON:any = child.toJSON();
                theJSON.key = child.key;
                // let theDate = new Date(theJSON.date);
                if(theJSON.hasOwnProperty('tutorer') && theJSON.tutorer.hasOwnProperty('canceled')){
                    alerter.setErrorDisplay("Your tutor canceled the session. Don't worry, another tutor can still accept the session. (Subject: " + theJSON.subject + ", Date: " + new Date(theJSON.date).toDateString() + ", Time: " + theJSON.time + ")");
                    remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + child.key + "/tutorer/canceled"));
                }else if(theJSON.hasOwnProperty("studentCanceled") && theJSON.studentCanceled == true){
                    alerter.setErrorDisplay("The student canceled the session. Don't worry, there will always be more people who need help!  (Subject: " +theJSON.subject + ", Date: " + new Date(theJSON.date).toDateString() + ", Time: " + theJSON.time + ")");
                    remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + child.key))
                }else if(theJSON.date < now.getTime()){
                    if(theJSON.tutoree == auth.currentUser?.uid){
                        if(theJSON.hasOwnProperty('tutorer')){
                          if(theJSON.tutorer.hasOwnProperty('id')){
                            theRater.push({
                              isTutor:false,
                              value:theJSON,
                              key:child.key,
                              date:new Date(theJSON.date)
                            })
                          }else{
                            remove(ref(db, "mhusd/sessions/" + auth.currentUser?.uid + "/" + child.key));
                            remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + child.key));
                            alerter.setErrorDisplay("Your tutor request expired and was removed");
                          }
                        }else{
                          remove(ref(db, "mhusd/sessions/" + auth.currentUser?.uid + "/" + child.key));
                          remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + child.key));
                          alerter.setErrorDisplay("Your tutor request expired and was removed");
                        }
                      }else{
                        theRater.push({
                          isTutor:true,
                          value:theJSON, 
                          key:child.key,
                          date:new Date(theJSON.date)
                        });
                      }
                }else{
                    theSchedule.push(theJSON);
                    theModalOpenArray.push(false)
                    theSlideOpenArray.push(false)
                }
                // console.log(theJSON)
               
                // theStyling.push('flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl relative transition hover:scale-110 hover:-translate-y-4');
                // console.log("child:", child.toJSON())
                
                // console.log(theSchedule)
            })
        })
        // }, 1000)
        // console.log(theStyling)
        setTimeout(()=>setSchedule([...theSchedule]), 200)
        setTimeout(()=>setModalOpenArray([...theModalOpenArray]), 200)
        setTimeout(()=>setSlideOpenArray([...theSlideOpenArray]), 200)
        setTimeout(()=>setRater([...theRater]), 200)
        // setStyling(theStyling);
        // setSchedule(theSchedule);
        // console.log(theSchedule)
    }, [refresh])
    React.useEffect(()=>{
        setTimeout(()=>setRefresh(refresh+1), 1000); 
    }, [])

    const Tab = (object:session, i:number) =>{
        var date = new Date(object.date);

        // const [modalOpen, setModalOpen] = React.useState(false);
        // const [slideOpen, setSlideOpen] = React.useState(false);
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

        // const open=()=>{
        //     var array = styling;
        //     array[i] = 'open';
        //     setStyling([...array]);
        // } 
        // const close=()=>{
        //     var array = styling;
        //     array[i] = 'close';
        //     setStyling([...array]);
        // }

        const pressed = () =>{
            setFocused(object)
            setCancelDialog(true)
        }

        // if(styling[i] == 'open')return(
        //     <div className='relative flex h-fit transition hover:scale-105 hover:-translate-y-2'>
        //         <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-out ease-out'>
        //             <div className='flex flex-col'>
        //                 <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
        //                 <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
        //                 <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
        //             </div>
        //             <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
        //                 <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
        //                 <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
        //             </div>
        //         </button>
        //         <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-in animate-ease-in transition hover:scale-125 hover:-translate-y-1 pb-6'>
        //             <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
        //                 <CloseIcon fontSize='large'/>
        //             </button>
        //             <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl mx-3 text-slate-50 mt-3'>{object.text}</text>
        //             <button onClick={pressed} className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Cancel</button>
        //         </div>
        //     </div>
        // )
        
        // if(styling[i] == 'close')return(
        //     <div className='relative flex h-64 transition hover:scale-105 hover:-translate-y-2'>
        //         <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-out animate-ease-out pb-6'>
        //             <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
        //                 <CloseIcon fontSize='large'/>
        //             </button>
        //             <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text>
        //             <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
        //             <text className='text-center mx-3 text-3xl text-slate-50 mt-3'>{object.text}</text>
        //             <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Cancel</button>
        //         </div>
        //         <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-in ease-in'>
        //             <div className='flex flex-col'>
        //                 <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
        //                 <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
        //                 <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
        //             </div>
        //             <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
        //                 <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
        //                 <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
        //             </div>
        //         </button>
        //     </div>
        // )
        // const OldCode = () =>{
        //     return( <div className='transition hover:scale-105 hover:-translate-y-2'>
        //     <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl relative animate-jump-in animate-ease-in'>
        //         <div className='flex flex-col'>
        //             <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
        //             <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
        //             <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
        //         </div>
        //         <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
        //             <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()]+ '. '}{date.getDate()}</text>
        //             <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
        //         </div>
        //     </button>

        // </div>)
        // }
        

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
                                <button onClick={pressed} className='w-fit h-fit text-lg bg-red-500 font-light py-1.5 px-5 hover:bg-opacity-80 rounded-lg self-center mt-10'>Cancel Request</button>
                            </div>
                        </Collapse>
                    </div>
                </Modal>
            </>
        )
    }

    const canceler=()=>{
        setCancelLoad(true);
        if(focused != null && !cancelLoad){
            let date = new Date(focused.date);
            if(!focused.available){
                if(now.getMonth() < date.getMonth() || now.getDate() + 2 < date.getDate()){
                    if(focused.tutoree == auth.currentUser?.uid){
                        remove(ref(db, params.district + "/sessions/" + auth.currentUser?.uid + "/" + focused.key));
                        remove(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + focused.key));
                        set(ref(db, params.district + "/schedule/" + focused.tutorer.id + "/" + focused.key + "/studentCanceled"), true);
                        alerter.setErrorDisplay("Successfully Canceled")
                    }else{
                        remove(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + focused.key));
                        set(ref(db, params.district + "/sessions/" + focused.tutoree + "/" + focused.key + "/available"), true);
                        set(ref(db, params.district + "/schedule/" + focused.tutoree + "/" + focused.key + "/available"), true);
                        set(ref(db, params.district + "/schedule/" + focused.tutoree + "/" + focused.key + "/tutorer"), {canceled:true});
                        alerter.setErrorDisplay("Successfully Canceled")
                    }
                }else{
                    setCancelDialog(false);
                    alerter.setErrorDisplay("Cannot cancel session!")
                    alert("I'm sorry but you can't cancel within two days of your set date when the session is taken. You can contact the other student directly through the google calendar event if you need to.");
                }
            }else{
                remove(ref(db, params.district + "/sessions/" + auth.currentUser?.uid + "/" + focused.key));
                remove(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + focused.key));
                alerter.setErrorDisplay("Successfully Canceled")
            }
            setTimeout(()=>{
                setRefresh(refresh+1);
                setCancelLoad(false);
                // closer();
                setCancelDialog(false)
                setFocused(null)
                
            }, 2000)
        }else{
            setCancelDialog(false);
            alerter.setErrorDisplay("ERROR: Nothing is in focus");
            
        }
    }



    const [rateValue, setRateValue] = React.useState<number|null>(null);
    const [rateHover, setRateHover] = React.useState(-1);
    const [submitCollapse, setSubmitCollapse] = React.useState(false);
    const [rateError, setRateError] = React.useState(false);
    const [rateLoading, setRateLoading] = React.useState(false);
    const [reportStudent, setReportStudent] = React.useState(false);
    // const [reportOptions, setReportOptions] = React.useState({
    //     language:false,
    //     noShow: false,
    //     harrassment:false,
    //     noKnowledge:false,
    //     other:false
    // })
    const [reportOptions, setReportOptions] = React.useState([
        {
            label:"Language",
            selected:false
        },
        {
            label:"No Show",
            selected:false
        },
        {
            label:"Harassment",
            selected:false
        },
        {
            label:"No Knowledge",
            selected:false
        },
        {
            label:"Other",
            selected:false,
            selectColapse:false
        }
    ])
    const [reportOtherText, setReportOtherText] = React.useState({
        text:"",
        error:{
            active:false,
            label:""
        }
    });

    const sendReport = async ()=>{
        let theReportTextSend:string|string[] = await reportOptions.map((value, index)=>{
            if(value.selected){
                if(index == reportOptions.length -1){
                    if(reportOtherText.text.length < 10){
                        setReportOtherText({...{text:reportOtherText.text, error:{active:true, label:"Must be longer than 10 characters"}}})
                    }else if(reportOtherText.text.includes(",")){
                        setReportOtherText({...{text:reportOtherText.text, error:{active:true, label:"Cannot include: \",\""}}})
                    }else{
                        return "Other: " + reportOtherText.text;
                    }
                }else{
                    return value.label;
                }
            }
            return "";
        });
        theReportTextSend = theReportTextSend.join(",");
        // alert(theReportTextSend);
        if(!reportOtherText.error.active){
            let nowTime = now.getTime();
            setTimeout(()=>{
                let theID = rater[0].isTutor?rater[0].value.tutoree:rater[0].value.tutorer.id
                set(ref(db, "/" + params.district + "/reports/" + theID +"/" + rater[0].key), {
                    type:"Session",
                    problems:theReportTextSend,
                    // badUser:{
                    //     name:rater[0].isTutor?rater[0].value.name:rater[0].value.tutorer.name,
                    //     id:rater[0].isTutor?rater[0].value.tutoree:rater[0].value.tutorer.id
                    // },
                    date:nowTime,
                    reporter:{
                        name:auth.currentUser?.displayName,
                        uid:auth.currentUser?.uid
                    }
                })
                // let json = {
                //     type:"Session",
                //     problems:theReportTextSend,
                //     // badUser:{
                //     //     name:rater[0].isTutor?rater[0].value.name:rater[0].value.tutorer.name,
                //     //     id:rater[0].isTutor?rater[0].value.tutoree:rater[0].value.tutorer.id
                //     // },
                //     date:nowTime,
                //     reporter:auth.currentUser?.uid
                // }
                // alert("push => " + params.district + "/reports/" +theID+"/" + rater[0].key)
                // alert("pushing => "+ Object.values(json))
                if(!rater[0].isTutor){
                    remove(ref(db, params.district + "/sessions/" + auth.currentUser?.uid + "/" + rater[0].key));
                }
                remove(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + rater[0].key))
                setReportStudent(false)
                setRateLoading(true);
                setRefresh(refresh+1);
                setTimeout(()=>setRateLoading(false), 1000);
            }, 1000)
        }
    }

    const sendRating=()=>{
        let theID = rater[0].isTutor?rater[0].value.tutoree:rater[0].value.tutorer.id
        if(rateValue == null || rateValue < 1 || rateValue > 5){
            // alerter.setErrorDisplay("Please select a rating");
            setRateError(true)
        }else{
            // alerter.setErrorDisplay(false);
            setRateError(false)
            if(!rater[0].isTutor){
                remove(ref(db, params.district + "/sessions/" + auth.currentUser?.uid + "/" + rater[0].key));
            }
            remove(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + rater[0].key))
            set(push(ref(db, params.district + "/users/" + theID + "/ratings")), rateValue);
            setRateLoading(true);
            setRefresh(refresh+1);
            setTimeout(()=>setRateLoading(false), 1000);
        }
    }

    return(
        <div className='flex flex-col w-full h-full items-center pt-12'>
            <title>Scholarly: Schedule</title>
            {/* <button onClick={()=>setRefresh(refresh+1)} className='self-end mt-6 mr-12 transition ease-in-out hover:scale-110 hover:-translate-y-2'>
                <CachedIcon sx={{fontSize:55}}/>
            </button> */}
            <div className='flex flex-wrap justify-center gap-x-14 gap-y-16 px-16 pb-14'>
                {schedule.map((object:session, i:number)=>Tab(object, i))}
            </div>
            {/* <div className='w-full h-28 bg-transparent'/> */}
            <Dialog onClose={()=>{
                setCancelDialog(false);
                setFocused({});
            }}  open={cancelDialog}
            >
                {/* <div className='w-screen h-fit px-4'> */}
                    <div className='flex flex-row bg-[#121820] w-fit h-fit px-10 py-8 relative items-start justify-start'>
                        <div className='w-fit h-fit p-2 bg-rose-400 rounded-full mt-1'>
                            <WarningAmberOutlinedIcon sx={{color:'red'}} fontSize='large'/>
                        </div>
                        <div className='flex-grow flex flex-col h-fit ml-6'>
                            <h3 className='text-xl text-start font-bold'>Cancel Request</h3>
                            <h5 className='text-base opacity-75 font-light mt-2'>This action cannot be undone, please review what you are canceling.{' Class: ' + focused?.subject + ', ' + new Date(focused?.date).toDateString() + ', Time: ' + focused?.time  + ', Location: ' + focused?.location}</h5>
                            <div className='w-full flex flex-row h-fit justify-end mt-4'>
                                <button onClick={()=>{
                                    setCancelDialog(false);
                                    setFocused({});
                                }}  className='w-fit h-fit py-1 px-4 outline outline-1 outline-zinc-500 rounded-lg text-lg mr-5'>Cancel</button>
                                <button onClick={canceler} className='w-fit h-fit py-1 px-4 bg-red-500 text-lg rounded-lg'>Confirm</button>
                            </div>
                        </div>
                        <button onClick={()=>{
                            setCancelDialog(false);
                            setFocused({});
                        }} className='absolute right-2.5 top-2.5'>
                            <CloseIcon sx={{fontSize:30, color:'GrayText'}}/>
                        </button>
                    </div>
                {/* </div> */}
            </Dialog>
            {(rater[0] != undefined && rater[0] != null)?<Dialog open={rater[0] != undefined && rater[0] != null}>
                <div className='w-full h-fit bg-[#121820] flex flex-col px-8 py-6 items-center relative'>
                   {rateLoading?<CircularProgress size={120} thickness={1}/>:<>
                   <button onClick={()=>setReportStudent(true)} className='absolute right-4 top-4 hover:opacity-70'><FlagIcon sx={{color:'salmon'}} fontSize='large'/></button>
                    <h3 className='text-2xl text-slate-200 text-center font-bold font-serif'>Rate your {rater[0].isTutor? "student":"tutor"}!</h3>
                    <div className='flex flex-row w-full h-fit mt-6'>
                        <div className='flex flex-col w-1/2 h-fit items-start font-serif'>
                            <h5 className='text-lg font-light'><span className='opacity-80'>{rater[0].isTutor? "Student":"Tutor"}:</span> <span>{rater[0].isTutor?rater[0].value.name:rater[0].value.tutorer.name}</span></h5>
                            <h5 className='text-lg font-light mt-3'><span className='opacity-80'>Grade:</span> <span>{rater[0].value.grade}</span></h5>
                        </div>
                        <div className='py-2 px-2 h-auto'>
                            <div className='w-0.5 h-full bg-zinc-800 bg-opacity-70 rounded-xl'/>
                        </div>
                        <div className='flex flex-col w-1/2 h-fit items-start font-serif'>
                            <h5 className='text-lg font-light'><span className='opacity-80'>Location:</span> <span>{rater[0].value.location}</span></h5>
                            <h5 className='text-lg font-light mt-2'><span className='opacity-80'>Time:</span> <span>{rater[0].value.time}</span></h5>
                            <h5 className='text-lg font-light mt-2'><span className='opacity-80'>Date:</span> <span>{rater[0].date.toDateString()}</span></h5>
                        </div>
                    </div>
                    <div className='flex flex-row items-center mt-6 '>
                        <Rating name='rater' 
                        value={rateValue} 
                        precision={1}
                        getLabelText={getRateLabel}
                        onChange={(event, newValue)=>setRateValue(newValue)}
                        onChangeActive={(event, newHover)=>setRateHover(newHover)}
                        size='large'
                        className='scale-110'
                        />
                        <Collapse orientation='horizontal' in={rateValue !== null || rateHover !== -1}>
                            <h4 className='text-lg ml-5 w-14'>{ratingLabels[rateHover !== -1?rateHover-1:(rateValue== null)?-1:rateValue-1]}</h4>
                        </Collapse>
                    </div>
                    <button onClick={sendRating} onFocus={()=>setSubmitCollapse(true)} onBlur={()=>setSubmitCollapse(false)} onMouseOver={()=>setSubmitCollapse(true)} onMouseLeave={()=>setSubmitCollapse(false)} className={rateError?"w-fit h-fit rounded-lg bg-gradient-radial from-rose-300 to-red-600 py-1.5 px-5 flex flex-row mt-6 items-center":"w-fit h-fit rounded-lg bg-gradient-radial from-emerald-300 to-green-600 py-1.5 px-5 flex flex-row mt-6 items-center"}><span className='text-2xl font-light'>Send</span> <Collapse orientation='horizontal' in={submitCollapse}><SendIcon className='ml-3' fontSize='medium'/></Collapse></button>
                    </>}
                </div>
                <Dialog open={reportStudent}>
                    <div className='flex flex-row bg-[#121820] w-fit h-fit px-10 py-8 relative items-start justify-start'>
                        <div className='w-fit h-fit p-2 bg-rose-400 rounded-full mt-1'>
                            <FlagIcon sx={{color:'red'}} fontSize='large'/>
                        </div>
                        <div className='flex-grow flex flex-col h-fit ml-6'>
                            <h3 className='text-xl text-start font-bold'>Report {rater[0].isTutor? "student":"tutor"}</h3>
                            <div className='w-full h-fit items-center flex-row flex-wrap px-7 gap-x-4 gap-y-4 mt-2 mb-2'>
                                {reportOptions.map((value, index)=><FormControlLabel
                                key={value.label + index + 'reporter'}
                                control={<Checkbox checked={value.selected} 
                                onChange={()=>{
                                    let theReportOptions = reportOptions;
                                    if(index == reportOptions.length - 1){
                                        if(theReportOptions[index].selected){
                                            theReportOptions[index].selectColapse = false;
                                            setTimeout(()=>{
                                                theReportOptions[index].selected = false;
                                                setReportOptions([...theReportOptions]);
                                            }, 200)
                                        }else{
                                            theReportOptions[index].selected = true;
                                            setTimeout(()=>{
                                                theReportOptions[index].selectColapse = true;
                                                setReportOptions([...theReportOptions]);
                                            }, 25)
                                        }
                                    }else{
                                        theReportOptions[index].selected = !reportOptions[index].selected;
                                    }
                                    setReportOptions([...theReportOptions]);
                                }}/>} 
                                label={value.label}/>)}
                            </div>
                            {reportOptions[reportOptions.length - 1].selected&&(
                                <Collapse in={reportOptions[reportOptions.length-1].selectColapse} className='self-center w-full px-5 flex-col'>
                                    <TextField sx={{marginTop:0.5, marginBottom:1}} className='w-full' error={reportOtherText.error.active} value={reportOtherText.text} onChange={(event)=>setReportOtherText({text:event.target.value, error:{active:false, label:""}})} variant='outlined' label="Description"  onKeyDown={(event)=>{
                                        if(event.key == "Enter"){
                                            sendReport();
                                        }
                                    }}/>
                                    <h5 className='text-red-500 text-opacity-70 text-base ml-3'>{reportOtherText.error.active &&reportOtherText.error.label}</h5>
                                </Collapse>
                            )}
                            <div className='w-full flex flex-row h-fit justify-end mt-4'>
                                <button onClick={()=>{
                                    setReportStudent(false);
                                }}  className='w-fit h-fit py-1 px-4 outline outline-1 outline-zinc-500 rounded-lg text-lg mr-5 transition hover:opacity-80'>Cancel</button>
                                <button onClick={sendReport} className='w-fit h-fit py-1 px-4 bg-red-500 text-lg rounded-lg transition hover:opacity-80'>Send</button>
                            </div>
                        </div>
                        <button onClick={()=>{
                            setReportStudent(false)
                        }} className='absolute right-2.5 top-2.5'>
                            <CloseIcon sx={{fontSize:30, color:'GrayText'}}/>
                        </button>
                    </div>
                </Dialog>
            </Dialog>:null}
            {/* {(confirmState != 'deactive')?(confirmState == 'active')?<Modal open onClose={closer}>
                <div 
                // onClick={()=>{setConfirmState('closing'); setTimeout(()=>setConfirmState('deactive'), 500)}} 
                className='flex w-full h-full justify-center items-center'>
                    <div className='flex flex-col items-center justify-center pt-12 pb-6 gap-y-3 px-6 relative animate-jump-in ease-in h-fit w-96 bg-[#1e1e1e] rounded-2xl'>
                        <text className='text-slate-50 text-4xl text-center'>Are you sure you want to cancel?</text>
                        <text className='text-slate-50 text-3xl text-center mt-4'>Class:{" " + focused.subject}</text>
                        <text className='text-slate-50 text-3xl text-center'>{new Date(focused.date).toDateString()}</text>
                        <text className='text-slate-50 text-3xl text-center'>{focused.time}</text>
                        <text className='text-slate-50 text-3xl text-center'>{(focused.location == 'Google Meets')?null:"Location: "}{focused.location}</text>
                        {cancelLoad?
                            <CircularProgress size={70} thickness={2}/>:
                            <button onClick={canceler} className='text-center p-3 items-center font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Confirm</button>
                        }
                        <button className='absolute right-3 top-3 transition hover:scale-110 hover:-translate-y-1' onClick={closer}><CloseIcon fontSize='large'/></button>
                    </div>
                </div>
            </Modal>:
            <Modal open>
                <div 
                // onClick={()=>{setConfirmState('closing'); setTimeout(()=>setConfirmState('deactive'), 500)}} 
                className='flex w-full h-full justify-center items-center'>
                    <div className='flex flex-col items-center justify-center pt-12 pb-6 gap-y-3 px-6 animate-duration-500 relative animate-jump-out ease-out h-fit w-96 bg-[#1e1e1e] rounded-2xl'>
                        <text className='text-slate-50 text-4xl text-center'>Are you sure you want to cancel? This cannot be undone</text>
                        <text className='text-slate-50 text-3xl text-center mt-4'>Class:{" " + focused.subject}</text>
                        <text className='text-slate-50 text-3xl text-center'>{new Date(focused.date).toDateString()}</text>
                        <text className='text-slate-50 text-3xl text-center'>{focused.time}</text>
                        <text className='text-slate-50 text-3xl text-center'>{(focused.location == 'Google Meets')?null:"Location: "}{focused.location}</text>
                        <button className='text-center p-3 items-center font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Confirm</button>
                        <button className='absolute right-3 top-3 transition hover:scale-110 hover:-translate-y-1'><CloseIcon fontSize='large'/></button>
                    </div>
                </div>
            </Modal>:null} */}
        </div>
    )
}

function getRateLabel(value:number){
    return `${value} Star${value !== 1 ? 's' : ''}, ${ratingLabels[value]}`;
}