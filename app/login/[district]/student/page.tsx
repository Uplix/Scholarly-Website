"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { auth, db } from "@/firebase/config";
import { onValue, ref, set } from "firebase/database";

// import {auth} from '@/firebase/config'
// import { signOut } from 'firebase/auth'
// import { signOut as signOutReactAuth } from 'next-auth/react'
export default function Page({ params }: { params: { district: string } }) {
  // const signingOut = () =>{
  //     alert(auth.currentUser?.displayName);
  //     signOut(auth);
  //     signOutReactAuth();
  // }
  const router = useRouter();
  const [reload, setReload] = React.useState(0);

  React.useEffect(() => {
    console.log(reload);
    if (auth.currentUser != undefined && auth.currentUser != null) {
      setTimeout(checker, 500);
      console.log(auth);
    } else {
      setTimeout(() => setReload(reload + 1), 500);
    }
  }, [reload]);

  const checker = () => {
    onValue(
      ref(db, params.district + "/users/" + auth.currentUser?.uid + "/name"),
      (snapshot) => {
        setter(snapshot.exists());
      },
    );
    console.log("checker");
  };

  const setter = (exists: boolean) => {
    console.log("setter");
    if (
      exists != null &&
      auth.currentUser?.displayName != undefined &&
      auth.currentUser.displayName != null
    ) {
      if (exists == false) {
        set(
          ref(
            db,
            params.district + "/users/" + auth.currentUser?.uid + "/name",
          ),
          auth.currentUser?.displayName,
        );
        set(
          ref(
            db,
            params.district + "/users/" + auth.currentUser?.uid + "/district",
          ),
          auth.currentUser.email?.split("@")[1].split(".")[0],
        );
        setTimeout(change, 1000);
        // done = true;
        // console.log(exists)
        // return;
      } else {
        setTimeout(change, 1000);
        // done = true;
        // console.log(exists)
        // return;
      }
    }
  };

  const change = () => {
    console.log("change");
    router.push("/login/" + params.district + "/student/schedule");
  };

  return (
    <div>
      <Backdrop open>
        <CircularProgress size={120} thickness={1.5} />
      </Backdrop>
    </div>
  );
}
