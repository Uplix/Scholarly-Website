"use client";
import * as React from "react";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/config";
import CloseIcon from "@mui/icons-material/Close";
import { session } from "@/clientSide/interfaces";
import CachedIcon from "@mui/icons-material/Cached";

const now = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function UpcomingSessions() {
  const [schedule, setSchedule]: any[] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [styling, setStyling]: any[] = React.useState([]);

  React.useEffect(() => {
    let theSchedule: any[] = [];
    let theStyling: string[] = [];

    onValue(ref(db, "mhusd/sessions/"), (snapshot) => {
      snapshot.forEach((id) => {
        id.forEach((child) => {
          let value = child.val();
          if (value.date >= now.getTime()) {
            theSchedule.push(value);
            theStyling.push("regular");
          }
        });
      });
    });

    setSchedule(theSchedule);
    setStyling(theStyling);
  }, [refresh]);

  React.useEffect(() => {
    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 700);
  }, []);

  const Tab = (object: session, i: number) => {
    let date = new Date(object.date);

    const open = () => {
      let array = styling;
      array[i] = "open";
      setStyling([...array]);
    };
    const close = () => {
      let array = styling;
      array[i] = "close";
      setStyling([...array]);
    };

    if (styling[i] == "open")
      return (
        <div className="relative flex h-fit transition hover:scale-105 hover:-translate-y-2">
          <button
            onClick={open}
            className="flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-out ease-out"
          >
            <div className="flex flex-col">
              <text className="text-left text-slate-50 text-4xl ml-6 mt-1">
                {object.time}
              </text>
              <text className="text-left text-slate-50 text-4xl ml-6 mt-7">
                {object.subject}
              </text>
              <text className="text-left text-slate-50 text-3xl ml-6 mt-5">
                Location:{" " + object.location}
              </text>
            </div>
            <div className="absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl">
              <text className="text-center text-3xl text-slate-50">
                {months[date.getMonth()] + ". "}
                {date.getDate()}
              </text>
              <text className="text-center text-3xl text-slate-50">
                {date.getFullYear()}
              </text>
            </div>
          </button>
          <div className="flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-in animate-ease-in transition hover:scale-125 hover:-translate-y-1 pb-6">
            <button
              onClick={close}
              className="absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1"
            >
              <CloseIcon fontSize="large" />
            </button>
            <text className="text-center text-3xl text-slate-50 mt-12">
              {"Tutoree: " + object.name}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Subject: " + object.subject}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Grade: " + object.grade}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Time: " + object.time}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {date.toDateString()}
            </text>
            {/* <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/> */}
            {/* <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text> */}
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {object.hasOwnProperty("tutorer")
                ? object.tutorer.hasOwnProperty("name")
                  ? object.tutorer.name
                  : "No current tutor"
                : "No current tutor"}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl mx-3 text-slate-50 mt-3 mb-4">
              {object.text}
            </text>
            {/* <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Accept</button> */}
          </div>
        </div>
      );

    if (styling[i] == "close")
      return (
        <div className="relative flex h-64 transition hover:scale-105 hover:-translate-y-2">
          <div className="flex flex-col justify-center items-center w-96 h-fit bg-[#1c1c1c] rounded-2xl animate-jump-out animate-ease-out pb-6">
            <button
              onClick={close}
              className="absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1"
            >
              <CloseIcon fontSize="large" />
            </button>
            <text className="text-center text-3xl text-slate-50 mt-14">
              {"Tutoree: " + object.name}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Subject: " + object.subject}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Grade: " + object.grade}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {"Time: " + object.time}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {date.toDateString()}
            </text>
            {/* <div className='mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full'/> */}
            {/* <text className='text-center text-3xl text-slate-50 mt-3'>{((object.hasOwnProperty('tutorer'))? ((object.tutorer.hasOwnProperty('name'))? object.tutorer.name:"No current tutor"):"No current tutor")}</text> */}
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {object.hasOwnProperty("tutorer")
                ? object.tutorer.hasOwnProperty("name")
                  ? object.tutorer.name
                  : "No current tutor"
                : "No current tutor"}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center mx-3 text-3xl text-slate-50 mt-3 mb-8">
              {object.text}
            </text>
            {/* <button className='text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-emerald-700 to-green-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Accept</button> */}
          </div>
          <button
            onClick={open}
            className="flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl absolute transition hover:scale-110 hover:-translate-y-4 left-0 top-0 animate-jump-in ease-in"
          >
            <div className="flex flex-col">
              <text className="text-left text-slate-50 text-4xl ml-6 mt-1">
                {object.time}
              </text>
              <text className="text-left text-slate-50 text-4xl ml-6 mt-7">
                {object.subject}
              </text>
              <text className="text-left text-slate-50 text-3xl ml-6 mt-5">
                Location:{" " + object.location}
              </text>
            </div>
            <div className="absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl">
              <text className="text-center text-3xl text-slate-50">
                {months[date.getMonth()] + ". "}
                {date.getDate()}
              </text>
              <text className="text-center text-3xl text-slate-50">
                {date.getFullYear()}
              </text>
            </div>
          </button>
        </div>
      );

    return (
      <div className="transition hover:scale-105 hover:-translate-y-2">
        <button
          onClick={open}
          className="flex flex-row w-96 h-fit py-10 bg-[#1b1b1b] rounded-2xl relative animate-jump-in animate-ease-in"
        >
          <div className="flex flex-col">
            <text className="text-left text-slate-50 text-4xl ml-6 mt-1">
              {object.time}
            </text>
            <text className="text-left text-slate-50 text-4xl ml-6 mt-7">
              {object.subject}
            </text>
            <text className="text-left text-slate-50 text-3xl ml-6 mt-5">
              Location:{" " + object.location}
            </text>
          </div>
          <div className="absolute right-4 top-4 flex flex-col justify-center items-center space-y-2 bg-emerald-700 p-3 rounded-xl">
            <text className="text-center text-3xl text-slate-50">
              {months[date.getMonth()] + ". "}
              {date.getDate()}
            </text>
            <text className="text-center text-3xl text-slate-50">
              {date.getFullYear()}
            </text>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen h-full justify-center items-center">
      <button
        onClick={() => setRefresh(refresh + 1)}
        className="self-end mt-6 mr-12 transition ease-in-out hover:scale-110 hover:-translate-y-2"
      >
        <CachedIcon sx={{ fontSize: 55 }} />
      </button>
      <div className="flex flex-wrap justify-center gap-x-20 gap-y-14 mx-10 h-full pb-14">
        {schedule.map((object: session, i: number) => Tab(object, i))}
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
  );
}
