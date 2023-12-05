import Link from 'next/link'

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center space-y-8 p-24'>
            <Link href={"/"}>
                <h1 className='bg-gradient-to-br from-indigo-500 from-20% via-sky-500 via-40% to-emerald-500 text-2xl px-4 py-3 rounded-xl'>This is the <strong>Main</strong> Page</h1>
            </Link>
            <div className='flex flex-col space-y-2'>
                <Link href={"/contact"}>
                    <h2 className='bg-gradient-to-br from-fuchsia-600 from-20% to-red-400 to-80% text-md p-2 rounded-xl hover:p-4 hover:text-xl transition-all'>Contact Us</h2>
                </Link>
                <Link href={"/about"}>
                    <h2 className='bg-gradient-to-br from-fuchsia-600 from-20% to-red-400 to-80% text-md p-2 rounded-xl hover:p-4 hover:text-xl transition-all'>What We Can Do</h2>
                </Link>
                <Link href={"/login"}>
                    <h2 className='bg-gradient-to-br from-fuchsia-600 from-20% to-red-400 to-80% text-md p-2 rounded-xl hover:p-4 hover:text-xl transition-all'>Login</h2>
                </Link>
            </div>
        </main>
    )
}
