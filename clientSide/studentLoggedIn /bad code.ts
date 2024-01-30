import { db, auth } from "@/firebase/config";
import { onValue, ref, set } from "firebase/database";
import { signOut } from "firebase/auth";

function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}

export async function databaseLogin() {
  let exists: null | boolean = null;
  let checking: number = 0;
  let done: boolean = false;
  await delay(1000);
  let promise = new Promise((resolve, reject) => {});
  console.log(1);
  for (let i = 0; i < 6; i++) {
    console.log("loop");
    exists = await checkDatabase(i);
    console.log("exists =>", exists);
    if (
      exists != null &&
      auth.currentUser?.displayName != undefined &&
      auth.currentUser.displayName != null
    ) {
      if (exists == false) {
        set(
          ref(db, "mhusd/users/" + auth.currentUser?.uid + "/name"),
          auth.currentUser?.displayName,
        );
        set(
          ref(db, "mhusd/users/" + auth.currentUser?.uid + "/district"),
          auth.currentUser.email?.split("@")[1].split(".")[0],
        );
        done = true;
        console.log(exists, done);
        return;
      } else {
        done = true;
        console.log(exists, done);
        return;
      }
    }
  }
  console.log("done");
  if (auth.currentUser?.uid == undefined || auth.currentUser.uid == null) {
    signOut(auth);
    throw new Error("Can't find login information");
  }

  if (exists == null) {
    signOut(auth);
    throw new Error("Database fetch error");
  }
  return new Promise();
}

async function checkDatabase(i: number) {
  let exists: null | boolean = null;
  onValue(
    ref(db, "mhusd/users/" + auth.currentUser?.uid + "/name"),
    (snapshot) => {
      exists = snapshot.exists();
    },
  );
  await delay(i * 300);
  return exists;
}
