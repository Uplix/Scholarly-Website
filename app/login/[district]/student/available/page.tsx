'use client'
import * as React from 'react'
import { db, auth } from "@/firebase/config"
import { onValue, ref, set } from "firebase/database"
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined';
import { Modal, CircularProgress, Collapse } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import {session} from '@/clientSide/interfaces'

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var now = new Date();

export default function Page({params}:{params:{district:string}}) {
    const [schedule, setSchedule]:any[] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0);
    // const [styling, setStyling]:any[] = React.useState([]);
    const [confirmState, setConfirmState] = React.useState('deactive');
    const [focused, setFocused] = React.useState<any>(null);
    const [cancelLoad, setCancelLoad] = React.useState(false);
    const { data:session } = useSession();
    const [modaleOpenArray, setModalOpenArray] = React.useState<boolean[]>([]);
    const [slideOpenArray, setSlideOpenArray] = React.useState<boolean[]>([]);

    

    React.useEffect(()=>{
        var theAvailable: any[] = [];
        // var theStyling: string[] = [];
        let theModalOpenArray: boolean[] = [];
        let theSlideOpenArray: boolean[] = [];
        // setTimeout(()=>{
            onValue(ref(db, params.district + '/sessions/'), (snapshot)=>{
                snapshot.forEach((id) =>{
                    if(id.key != auth.currentUser?.uid){
                      id.forEach((child)=>{
                        var value = child.val();
                        if(value.date >= now.getTime()){
                          if(value.available){
                            // value.milliseconds = value.date;
                            // value.date = new Date(value.date);
                            // var indiv = {
                            //   key:[id.key, child.key],
                            //   value:value
                            // }
                            value.idKey = id.key
                            value.childKey = child.key
                            theAvailable.push(value);
                            // theStyling.push('regular')
                            theModalOpenArray.push(false)
                            theSlideOpenArray.push(false)
                          }
                        }
                      })
                    }
                  })
            })
        // }, 1000)
        setModalOpenArray(theModalOpenArray);
        setSlideOpenArray(theSlideOpenArray);
        // setStyling(theStyling);
        setSchedule(theAvailable);
        // console.log(theSchedule)
    }, [refresh])
    React.useEffect(()=>{
        setTimeout(()=>setRefresh(refresh+1), 1000); 
    }, [])

    // const Tab = (object:session, i:number) =>{
    //     var date = new Date(object.date);

    //     const open=()=>{
    //         var array = styling;
    //         array[i] = 'open';
    //         setStyling([...array]);
    //     } 
    //     const close=()=>{
    //         var array = styling;
    //         array[i] = 'close';
    //         setStyling([...array]);
    //     }

    //     const pressed = () =>{
    //         setFocused(object)
    //         setConfirmState('active')
    //     }

    //     if(styling[i] == 'open')return(
    //         <div className='relative flex h-fit transition hover:scale-105 hover:-translate-y-2'>
    //             <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-out ease-out'>
    //                 <div className='flex flex-col'>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
    //                     <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
    //                 </div>
    //                 <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
    //                     <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
    //                     <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
    //                 </div>
    //             </button>
    //             <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-in animate-ease-in transition hover:scale-125 hover:-translate-y-1 pb-6'>
    //                 <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
    //                     <CloseIcon fontSize='large'/>
    //                 </button>
    //                 <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
    //                 {/* <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/> */}
    //                 {/* <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text> */}
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl mx-3 text-slate-50 mt-3'>{object.text}</text>
    //                 <button onClick={pressed} className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Accept</button>
    //             </div>
    //         </div>
    //     )
        
    //     if(styling[i] == 'close')return(
    //         <div className='relative flex h-64 transition hover:scale-105 hover:-translate-y-2'>
    //             <div className='flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-out animate-ease-out pb-6'>
    //                 <button onClick={close} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'>
    //                     <CloseIcon fontSize='large'/>
    //                 </button>
    //                 <text className='text-center text-3xl text-slate-50 mt-14'>{"Tutoree: " + object.name}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Subject: " + object.subject}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Grade: " + object.grade}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{"Time: " + object.time}</text>
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center text-3xl text-slate-50 mt-3'>{date.toDateString()}</text>
    //                 {/* <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/> */}
    //                 {/* <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text> */}
    //                 <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/>
    //                 <text className='text-center mx-3 text-3xl text-slate-50 mt-3'>{object.text}</text>
    //                 <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Accept</button>
    //             </div>
    //             <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-in ease-in'>
    //                 <div className='flex flex-col'>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
    //                     <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
    //                 </div>
    //                 <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
    //                     <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()] + '. '}{date.getDate()}</text>
    //                     <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
    //                 </div>
    //             </button>
    //         </div>
    //     )

    //     return(
    //         <div className='transition hover:scale-105 hover:-translate-y-2'>
    //             <button onClick={open} className='flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl relative animate-jump-in animate-ease-in'>
    //                 <div className='flex flex-col'>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-1'>{object.time}</text>
    //                     <text className='text-left text-slate-50 text-4xl ml-6 mt-7'>{object.subject}</text>
    //                     <text className='text-left text-slate-50 text-3xl ml-6 mt-5'>Location:{' ' + object.location}</text>
    //                 </div>
    //                 <div className='absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl'>
    //                     <text className='text-center text-3xl text-slate-50'>{months[date.getMonth()]+ '. '}{date.getDate()}</text>
    //                     <text className='text-center text-3xl text-slate-50'>{date.getFullYear()}</text>
    //                 </div>
    //             </button>

    //         </div>
    //     )
    // }

    const closer=()=>{
        if(!cancelLoad){
            setConfirmState('closing'); 
            setTimeout(()=>{
                setConfirmState('deactive');
                setFocused(null);
                setCancelLoad(false);
        }, 520)
        }
    }

    const signinAgain = async ()=>{
        await signIn('google');
    }

    // const accepter= async ()=>{
    //     var date = new Date(focused.date);
    //     setCancelLoad(true);
    //     if(focused != null && !cancelLoad && auth.currentUser != undefined && auth.currentUser != null){
    //         // change isAvailable initial val to false once this function for sure works
    //         var isAvailable;
    //         onValue(ref(db, params.district + "/sessions/" + focused.idKey + "/" + focused.childKey + "/available"), (snapshot)=>{
    //           isAvailable = snapshot.val();
    //         })
    //         if(isAvailable){
    //           var instDate = focused.date;
    //           var time = focused.time;
    //           var addedMills = 0;
    //           time = time.split(':');
    //           addedMills += parseInt(time[0]) * 3600000;
    //           addedMills += parseInt(time[1]) * 60000;
    //           time = time[1].split(' ');
    //           if(time[1] == "PM"){
    //             addedMills += 3600000 * 12;
    //           }else if(time[1] == "AM"){
    //           }else{
    //             alert("An error has occured when calculating the time. Please reload the site and try again.");
    //             return
    //           }

    //         //   instDate += 3600000 * 16;
    //         //   if(time == "4:30 PM"){
    //         //     instDate += 3600000 / 2;
    //         //   }else if(time == "5:00 PM"){
    //         //     instDate += 3600000;
    //         //   }else if(time == "5:30 PM"){
    //         //     instDate += 3600000 * 3/2;
    //         //   }else if(time == "6:00 PM"){
    //         //     instDate += 3600000 * 2;
    //         //   }else if(time == "6:30 PM"){
    //         //     instDate += 3600000 * 5/2;
    //         //   }else if(time == "7:00 PM"){
    //         //     instDate += 3600000 * 3;
    //         //   }else{
    //         //     alert("An error has occured when calculating the time. Please reload the app and try again");
    //         //     closer();
    //         //     return;
    //         //   }

    //           console.log(instDate);
    //           const start = new Date(instDate);
    //           const end = new Date(instDate + 3600000);
    //           var description = "Subject: " + focused.subject + "    Grade: " + focused.grade;
    //           var requestId = focused.childKey;
    //           requestId = requestId.substring(0, 7);
    //           const myeEvent = {
    //             'summary': "Tutor Session",
    //             'description': description,
    //             'start':{
    //               'dateTime':start.toISOString(),
    //               'timeZone':'America/Los_Angeles'
    //             },
    //             'end':{
    //               'dateTime':end.toISOString(),
    //               'timeZone':'America/Los_Angeles'
    //             },
    //             'attendees':[
    //               {'email':auth.currentUser?.email},
    //               {'email':focused.email}
    //             ],
    //             'conferenceData':{
    //               'conferenceSolution':{
    //                 'key':{'type':'hangoutsMeet'},
    //                 'name':'Google Meet'
    //               },
    //               'createRequest':{
    //                 'requestId':requestId,
    //                 'conferenceSolutionKey':{
    //                   'type':'hangoutsMeet'
    //                 }
    //               }
    //             },
    //             'guestsCanModify':true,
    //             'reminders':{
    //               'overides':[
    //                 {'method':"email", 'minutes':24*60},
    //                 {'method':"email", 'minutes':120}
    //               ]
    //             }
    //           }
    //           var name = auth.currentUser?.displayName.split(" ");
    //           console.log(start.toDateString());
    //           const token = session?.accessToken
              
    //           await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    //             method:"POST",
    //             headers:{
    //               'Authorization':'Bearer ' + token,
    //             },
    //             eventId:focused.childKey,
    //             body:JSON.stringify(myeEvent),
    //             conferenceDataVersion:1, 
    //             sendUpdates:"all",
                
    //           }).then((data)=>{
    //             if(data.ok){
    //               var displaying = focused;
    //               var name = auth.currentUser?.displayName.split(" ");
    //               set(ref(db, params.district + "/sessions/" + focused.idKey + "/" + focused.childKey + "/available"), false);
    //               set(ref(db, params.district + "/schedule/" + focused.idKey + "/" + focused.childKey + "/tutorer"), {
    //                 name:auth.currentUser?.displayName,
    //                 id:auth.currentUser?.uid
    //               });
    //               displaying.tutor = name[0];
    //             //   overlayInfo.setModalDisplay(false);
    //             //   overlayInfo.setOverlay(false);
    //               closer();
    //               set(ref(db, params.district + "/sessions/" + focused.idKey + "/" + focused.childKey + "/available"), false);
    //               set(ref(db, params.district + "/schedule/" + focused.idKey + "/" + focused.childKey + "/available"), false);
    //               var upload = focused
    //             //   upload.date = upload.milliseconds;
    //               upload.available = false;
    //               delete upload['childKey']
    //               delete upload['idKey']
    //             //   delete upload['milliseconds'];
    //               set(ref(db, params.district + "/schedule/" + auth.currentUser?.uid + "/" + focused.childKey), upload);
    //               var niceData = JSON.stringify(data);
    //               console.log(niceData);
    //               alert("Check your google calendar. An event was set for " + start.toDateString());
    //             //   overlayInfo.setLoading(false);
    //             //   overlayInfo.setExplain(true);
    //             }else{
    //             //   overlayInfo.setModalDisplay(false);
    //             //   overlayInfo.setOverlay(false);
    //             closer();
    //               alert("An error occured adding event to google calndar. You may not have given the app permision to access google calendar. To fix this: logout, sign back in, and give the app permision to acces your google calendar.")
    //               console.log(token);
    //             //   signinAgain();
    //             //   overlayInfo.setLoading(false);
    //             }
                
    //           }).catch((error)=>{
    //             console.log(error);
    //             alert("An error occured adding to calendar: " + error);
    //             // overlayInfo.setLoading(false);
    //             closer();
    //           })
    //         }else{
    //           alert("I'm sorry, it seems that somebody else has already taken this tutor session");
    //         //   overlayInfo.setLoading(false);
    //         closer();
    //         }
    //     }
    // }

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
      return(
        <>
            <button onClick={open} className='w-fit h-fit' key={object.childKey +'available'}>
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

    return(
        <div className='flex flex-col w-screen h-full pt-12 px-10 items-center'>
            <title>Scholarly: Available</title>
            {/* <button onClick={()=>setRefresh(refresh+1)} className='self-end mt-6 mr-12 transition ease-in-out hover:scale-110 hover:-translate-y-2'>
                <CachedIcon sx={{fontSize:55}}/>
            </button> */}
            <div className='flex flex-wrap gap-x-20 gap-y-14 pb-14 justify-center'>
                {schedule.map((object:session, i:number)=>Tab(object, i))}
            </div>
            {/* <div className='w-full h-28 bg-transparent'/> */}
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
                            <button onClick={accepter} className='text-center p-3 items-center font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Confirm</button>
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
                        <text className='text-slate-50 text-4xl text-center'>Are you sure you want to cancel?</text>
                        <text className='text-slate-50 text-3xl text-center mt-4'>Class:{" " + focused.subject}</text>
                        <text className='text-slate-50 text-3xl text-center'>{new Date(focused.date).toDateString()}</text>
                        <text className='text-slate-50 text-3xl text-center'>{focused.time}</text>
                        <text className='text-slate-50 text-3xl text-center'>{(focused.location == 'Google Meets')?null:"Location: "}{focused.location}</text>
                        <button className='text-center p-3 items-center font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Confirm</button>
                        <button className='absolute right-3 top-3 transition hover:scale-110 hover:-translate-y-1'><CloseIcon fontSize='large'/></button>
                    </div>
                </div>
            </Modal>:null} */}
        </div>
    )
}