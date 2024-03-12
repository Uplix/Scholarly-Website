'use client'
import { useRouter } from "next/navigation"
import * as React from 'react'
import { CircularProgress, Backdrop } from "@mui/material";
import {auth, db} from '@/firebase/config'
import { onValue, ref, set, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
// import {auth} from '@/firebase/config'
// import { signOut } from 'firebase/auth'
// import { signOut as signOutReactAuth } from 'next-auth/react'
const now = new Date();

export default function Page({params}:{params:{district:string}}) {
    // const signingOut = () =>{
    //     alert(auth.currentUser?.displayName);
    //     signOut(auth);
    //     signOutReactAuth();
    // }
    const router = useRouter();
    const [reload, setReload] = React.useState(0);

    React.useEffect(()=>{  
        console.log(reload)
        if(auth.currentUser != undefined && auth.currentUser != null){
            setTimeout(checker, 500)
            console.log(auth)
        }else{
            setTimeout(()=>setReload(reload+1), 500)
        }
    }, [reload])

    const checker = ()=>{
        onValue(ref(db, params.district + '/users/' + auth.currentUser?.uid + '/name'), (snapshot)=>{
            // setter(snapshot.exists()); 
              // router.push('/login/' + params.district + '/studentLogin/setupAccount');
              setter(snapshot.exists());
        })
        let done:any[] = []
        // onValue(ref(db, params.district + "/schedule/" + auth.currentUser?.uid), (snapshot)=>{
        //     snapshot.forEach((id)=>{
        //       var value = id.val();
        //       let dating = new Date(value.date);
        //       if(value.hasOwnProperty('tutorer')){
        //         if(value.tutorer.hasOwnProperty('canceled')){
        //           alert("Your tutor canceled the session. Don't worry, another tutor can still accept the session. (Subject: " + value.subject + ", Date: " + dating.toDateString() + ", Time: " + value.time + ")");
        //           remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + id.key + "/tutorer/canceled"));
        //         }
        //       }
              
        //       if(value.hasOwnProperty('studentCanceled') && value.studentCanceled == true){
        //         alert("The student canceled the session. Don't worry, there will always be more people who need help!  (Subject: " +value.subject + ", Date: " + dating.toDateString() + ", Time: " + value.time + ")");
        //         remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + id.key))
        //       }else{
        //         if(value.date < now.getTime()){
        //           if(value.tutoree == auth.currentUser?.uid){
        //             if(value.hasOwnProperty('tutorer')){
        //               if(value.tutorer.hasOwnProperty('id')){
        //                 done.push({
        //                   isTutor:false,
        //                   value:value,
        //                   key:id.key,
        //                   date:dating
        //                 })
        //               }else{
        //                 remove(ref(db, "mhusd/sessions/" + auth.currentUser?.uid + "/" + id.key));
        //                 remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + id.key));
        //                 alert("Your tutor request expired and was removed");
        //               }
        //             }else{
        //               remove(ref(db, "mhusd/sessions/" + auth.currentUser?.uid + "/" + id.key));
        //               remove(ref(db, "mhusd/schedule/" + auth.currentUser?.uid + "/" + id.key));
        //               alert("Your tutor request expired and was removed");
        //             }
        //           }else{
        //             done.push({
        //               isTutor:true,
        //               value:value, 
        //               key:id.key,
        //               date:dating
        //             });
        //           }
        //         }
        //       }
        //     })
        //     // setRate(done);
        // })
        // console.log('checker')
    }

    const setter = (exists:boolean)=>{
        console.log('setter')
        if(exists != null && auth.currentUser?.displayName != undefined && auth.currentUser.displayName != null){
            if(exists == false){
                // set(ref(db, params.district + '/users/' + auth.currentUser?.uid + '/name'), auth.currentUser?.displayName);
                // set(ref(db, params.district + '/users/' + auth.currentUser?.uid + '/district'), auth.currentUser.email?.split('@')[1].split('.')[1]);
                // set(ref(db, params.district + "/users/" + auth.currentUser?.uid + "/image"), auth.currentUser.photoURL);
                // setTimeout(change, 1000)
                // done = true;
                // console.log(exists)
                // return;
                router.push('/login/' + params.district + '/studentLogin/setupAccount');
            }else{
                setTimeout(change, 1000)
                // done = true; 
                // console.log(exists)
                // return;
            }
        }
    }

    const change = () =>{
        console.log('change')
        router.push('/login/'+params.district +'/student/schedule')
    }

    return(
        <div>
            <Backdrop open>
                <CircularProgress size={120} thickness={1.5}/>
            </Backdrop>
        </div>
    )
}
