import { db, auth } from "@/firebase/config"
import { onValue, ref, set } from "firebase/database"
import { signOut } from "firebase/auth";

export async function databaseLogin(){
    var exists:null|boolean = null;
    var checking:number = 0;
    var done:boolean = false;
   
    onValue(ref(db, 'mhusd/users/' + auth.currentUser?.uid + '/name'), (snapshot)=>{
        exists = snapshot.exists();
    })

    checkDatabase();

    function checkDatabase(){
        setTimeout(()=>{
            if(exists != null && auth.currentUser?.displayName != undefined && auth.currentUser.displayName != null){
                if(exists == false){
                    set(ref(db, 'mhusd/users/' + auth.currentUser?.uid), {
                        name:auth.currentUser?.displayName,
                        district:auth.currentUser.email?.split('@')[1].split('.')[0]
                    })
                    done = true;
                }else{
                    done = true; 
                }
            }
            checking++;
            if(checking < 5 && !done){
                checkDatabase();
            }
            console.log(checking, exists)
        }, 500)
    }

    if(auth.currentUser?.uid == undefined || auth.currentUser.uid == null){
        signOut(auth);
        throw new Error("Can't find login information");
    }

    if(exists == null){
        signOut(auth);
        throw new Error("Database fetch error");
    }
}