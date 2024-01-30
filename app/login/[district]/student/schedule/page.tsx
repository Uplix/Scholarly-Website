"use client";
import * as React from "react";
import { db, auth } from "@/firebase/config";
import { onValue, ref, set, remove } from "firebase/database";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Modal, CircularProgress, Dialog } from "@mui/material";
import { session } from "@/clientSide/interfaces";

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
const now = new Date();

export default function Page({ params }: { params: { district: string } }) {
  const [schedule, setSchedule]: any[] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [styling, setStyling]: any[] = React.useState([]);
  const [confirmState, setConfirmState] = React.useState("deactive");
  const [focused, setFocused]: session | null = React.useState(null);
  const [cancelLoad, setCancelLoad] = React.useState(false);
  const [cancelDialog, setCancelDialog] = React.useState(false);

  React.useEffect(() => {
    let theSchedule: any[] = [];
    let theStyling: string[] = [];
    console.log(refresh);
    console.log(auth.currentUser?.uid);
    // setTimeout(()=>{
    onValue(
      ref(db, params.district + "/schedule/" + auth.currentUser?.uid),
      (snapshot) => {
        // console.log(snapshot.val())
        snapshot.forEach((child) => {
          // let aChild:session = child.toJSON();
          // aChild.design = "flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl relative transition hover:scale-110 hover:-translate-y-4"
          let theJSON: any = child.toJSON();
          theJSON.key = child.key;
          // console.log(theJSON)
          theSchedule.push(theJSON);
          // theStyling.push('flex flex-row w-96 h-64 bg-[#1b1b1b] rounded-2xl relative transition hover:scale-110 hover:-translate-y-4');
          // console.log("child:", child.toJSON())
          theStyling.push("regular");
          console.log(theSchedule);
        });
      },
    );
    // }, 1000)
    console.log(theStyling);
    setTimeout(() => setSchedule(theSchedule), 100);
    setTimeout(() => setStyling(theStyling), 100);
    // setStyling(theStyling);
    // setSchedule(theSchedule);
    // console.log(theSchedule)
  }, [refresh]);
  React.useEffect(() => {
    setTimeout(() => setRefresh(refresh + 1), 1000);
  });

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

    const pressed = () => {
      setFocused(object);
      setCancelDialog(true);
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
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {object.hasOwnProperty("tutorer")
                ? object.tutorer.hasOwnProperty("name")
                  ? object.tutorer.name
                  : "No current tutor"
                : "No current tutor"}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl mx-3 text-slate-50 mt-3">
              {object.text}
            </text>
            <button
              onClick={pressed}
              className="text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80"
            >
              Cancel
            </button>
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
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center text-3xl text-slate-50 mt-3">
              {object.hasOwnProperty("tutorer")
                ? object.tutorer.hasOwnProperty("name")
                  ? object.tutorer.name
                  : "No current tutor"
                : "No current tutor"}
            </text>
            <div className="mt-1.5 bg-slate-800 opacity-50 h-0.5 w-full" />
            <text className="text-center mx-3 text-3xl text-slate-50 mt-3">
              {object.text}
            </text>
            <button className="text-center p-3 font-light rounded-2xl text-4xl mt-7 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80">
              Cancel
            </button>
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

  const closer = () => {
    if (!cancelLoad) {
      setConfirmState("closing");
      setTimeout(() => {
        setConfirmState("deactive");
        setFocused(null);
      }, 520);
    }
  };

  const canceler = () => {
    let date = new Date(focused.date);
    setCancelLoad(true);
    if (focused != null && !cancelLoad) {
      if (!focused.available) {
        if (
          now.getMonth() < date.getMonth() ||
          now.getDate() + 2 < date.getDate()
        ) {
          if (focused.tutoree == auth.currentUser?.uid) {
            remove(
              ref(
                db,
                params.district +
                  "/sessions/" +
                  auth.currentUser?.uid +
                  "/" +
                  focused.key,
              ),
            );
            remove(
              ref(
                db,
                params.district +
                  "/schedule/" +
                  auth.currentUser?.uid +
                  "/" +
                  focused.key,
              ),
            );
            set(
              ref(
                db,
                params.district +
                  "/schedule/" +
                  focused.tutorer.id +
                  "/" +
                  focused.key +
                  "/studentCanceled",
              ),
              true,
            );
          } else {
            remove(
              ref(
                db,
                params.district +
                  "/schedule/" +
                  auth.currentUser?.uid +
                  "/" +
                  focused.key,
              ),
            );
            set(
              ref(
                db,
                params.district +
                  "/sessions/" +
                  focused.tutoree +
                  "/" +
                  focused.key +
                  "/available",
              ),
              true,
            );
            set(
              ref(
                db,
                params.district +
                  "/schedule/" +
                  focused.tutoree +
                  "/" +
                  focused.key +
                  "/available",
              ),
              true,
            );
            set(
              ref(
                db,
                params.district +
                  "/schedule/" +
                  focused.tutoree +
                  "/" +
                  focused.key +
                  "/tutorer",
              ),
              { canceled: true },
            );
          }
        } else {
          alert(
            "I'm sorry but you can't cancel within two days of your set date when the session is taken. You can contact the other student directly through the google calendar event if you need to.",
          );
        }
      } else {
        remove(
          ref(
            db,
            params.district +
              "/sessions/" +
              auth.currentUser?.uid +
              "/" +
              focused.key,
          ),
        );
        remove(
          ref(
            db,
            params.district +
              "/schedule/" +
              auth.currentUser?.uid +
              "/" +
              focused.key,
          ),
        );
      }
      setTimeout(() => {
        setCancelLoad(false);
        closer();
        setRefresh(refresh + 1);
      }, 2000);
    } else {
      alert("ERROR: Nothing is in focus");
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
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
      <Dialog
        onClose={() => {
          setCancelDialog(false);
          setFocused({});
        }}
        open={cancelDialog}
      >
        {/* <div className='w-screen h-fit px-4'> */}
        <div className="flex flex-row bg-[#121820] w-fit h-fit px-10 py-8 relative items-start justify-start">
          <div className="w-fit h-fit p-2 bg-rose-400 rounded-full mt-1">
            <WarningAmberOutlinedIcon sx={{ color: "red" }} fontSize="large" />
          </div>
          <div className="flex-grow flex flex-col h-fit ml-6">
            <h3 className="text-xl text-start font-bold">Cancel Request</h3>
            <h5 className="text-base opacity-75 font-light mt-2">
              This action cannot be undone, please review what you are
              canceling.
              {" Class: " +
                focused?.subject +
                ", " +
                new Date(focused?.date).toDateString() +
                ", Time: " +
                focused?.time +
                ", Location: " +
                focused?.location}
            </h5>
            <div className="w-full flex flex-row h-fit justify-end mt-4">
              <button
                onClick={() => {
                  setCancelDialog(false);
                  setFocused({});
                }}
                className="w-fit h-fit py-1 px-4 outline outline-1 outline-zinc-500 rounded-lg text-lg mr-5"
              >
                Cancel
              </button>
              <button
                onClick={canceler}
                className="w-fit h-fit py-1 px-4 bg-red-500 text-lg rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setCancelDialog(false);
              setFocused({});
            }}
            className="absolute right-2.5 top-2.5"
          >
            <CloseIcon sx={{ fontSize: 30, color: "GrayText" }} />
          </button>
        </div>
        {/* </div> */}
      </Dialog>
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
