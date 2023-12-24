import {auth} from '@/firebase/config'

export default async function Page() {
    return(
        <div className="flex justify-center align-middle">
            <text className="text-4xl text-zinc-200">The current user: {auth.currentUser?.email}</text>
        </div>
    )
}
