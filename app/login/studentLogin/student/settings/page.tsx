'use client'
import { auth, db } from "@/firebase/config";
import { onValue, ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { signOut as fullSignOut }  from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react'
import Modal from "@mui/material/Modal";
import Rating from '@mui/material/Rating'
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Settings(){
    const [fetching, setFetching] = React.useState(true);
    const [reload, setReload] = React.useState(0);
    const [sure, setSure] = React.useState<suresees|null>(null)
    const [modalClassName, setModalClassName] = React.useState('bg-[#1e1e1e] items-center w-96 h-fit flex flex-col animate-jump-in animate-ease-in rounded-2xl');
    const [isTutor, setIsTutor] = React.useState(false);
    const [rating, setRating] = React.useState({
        numRatings:0,
        rating:0
    });
    const router = useRouter();

    interface suresees{
        state:string|null,
        click:()=>Promise<void>|null,
        text:string|null,
        fix:boolean
    }

    React.useEffect(()=>{
        var isATutor = false;
        if(auth.currentUser != undefined && auth.currentUser != null){
            onValue(ref(db, 'mhusd/users/' + auth.currentUser?.uid + '/isTutor'), (snapshot)=>{
                if(snapshot.exists() && snapshot.val() === true){
                    isATutor = snapshot.val();
                }
            })
            var theRating = 0;
            var numRatings = 0;
            onValue(ref(db, 'mhusd/users/' + auth.currentUser?.uid + '/ratings'), (snapshot)=>{
                snapshot.forEach((child)=>{
                    theRating += child.val();
                    numRatings++;
                })
            })
            setRating({
                numRatings:numRatings,
                rating:theRating
            })
            setIsTutor(isATutor)
            // console.log(theRating, numRatings)
            // console.log(isTutor);
        }
    }, [reload])

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1);
        }, 1000)
        setTimeout(()=>{
            setFetching(false);
        }, 1500)
    }, [])

    if(fetching)return(
        <div className="flex flex-col justify-center items-center w-full h-full">
            <CircularProgress size={100} thickness={2}/>
        </div>
    )
    
    const signingOut = async () =>{
        await signOut(auth);
        // setReload(reload+1);
        await signingOut();
        closeModal();
        router.push('/login');
    }

    const deleteAccount = async ()=>{
        await signingOut();
        closeModal();
    }

    const closeModal = ()=>{
        setModalClassName('bg-[#1e1e1e] items-center w-96 h-fit flex flex-col animate-jump-out animate-ease-out rounded-2xl')
        setTimeout(()=>{
            setSure(null)
            setModalClassName('bg-[#1e1e1e] items-center w-96 h-fit flex flex-col animate-jump-in animate-ease-in rounded-2xl')
        }, 500)
    }

    return(
        <div className="flex flex-col w-full h-full items-center mt-16">
            <div className="scale-150 rounded-full border-2 border-slate-100 w-fit h-fit animate-jump-in animate-ease-in">
                {(auth.currentUser == null || auth.currentUser == undefined)? <PersonIcon fontSize='large'/>:<Avatar alt={"Profile Image"} src={auth.currentUser.photoURL}/>}
            </div>
            <text className="text-slate-50 text-5xl text-center w-fit h-fit mt-8 mb-10 animate-jump-in animate-ease-in">Hi{" "+auth.currentUser?.displayName?.split(' ')[0] + " 👋"}</text>
            <div className="flex flex-col w-fit h-fit items-start px-5 animate-jump-in animate-ease-in">
                <ListItem display={'Full name: ' + auth.currentUser?.displayName}/>
                <ListItem display={"Email: "+auth.currentUser?.email}/>
                <ListItem display={"User ID: " + auth.currentUser?.uid}/>
                <ListItem display={'School District: MHUSD'}/>
                <ListItem display={'Currently a tutor: ' + (isTutor?'Yes':'No')}/>
                <ListItem display={'You have ' + rating.numRatings + ((rating.numRatings == 1)? ' rating':' ratings')}/>
            </div>
            <div className="mt-10 animate-jump-in animate-ease-in">
                <Rating sx={{fontSize:65}} defaultValue={(rating.numRatings == 0)?0:rating.rating/rating.numRatings} precision={0.1} readOnly/>
            </div>            
            <button onClick={()=>setSure({text:"Are you sure you want to sign out?", click:signingOut, fix:true, state:'open'})} className="text-center p-3 items-center font-light rounded-2xl text-3xl mt-12 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80">Sign Out</button>
            <button onClick={()=>setSure({text:"Are you sure you want to delete your account?", click:deleteAccount, fix:false, state:'open'})} className="text-center p-3 items-center font-light rounded-2xl text-3xl mt-12 mb-12 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80">Delete Account</button>
            {(sure!=null)?<Modal open onClose={closeModal}>
                <div className="flex w-full h-full justify-center items-center">
                    <div className={modalClassName}>
                        <text className="text-center text-4xl space-x-9 mt-12 px-6">{sure?.text}</text>
                        {sure?.fix?null:<text className="text-red-600 font-bold text-3xl text-center mt-8 px-4 ">This action cannot be undone</text>}
                        <button onClick={sure?.click} className="text-center p-3 items-center font-light rounded-2xl text-5xl mt-12 mb-8 bg-gradient-to-br from-rose-700 to-red-500 w-fit h-fit transition hover:scale-110 hover:-translate-y-2 hover:opacity-80">Confirm</button>
                        <button onClick={closeModal} className='absolute right-4 top-4 transition hover:scale-110 hover:-translate-y-1'><CloseIcon fontSize='large'/></button>
                    </div>
                </div>
            </Modal>:null}
        </div>
    )
}

const ListItem = ({display}:{display:string|null|undefined}) =>{
    return(
        <div className="flex flex-row w-fit h-fit items-center mt-3.5">
            <text className="text-center text-slate-300 text-4xl ml-3">-</text>
            <div className="w-6"/>
            <text className="text-center text-slate-100 text-2xl">{display}</text>
        </div>
    )
}