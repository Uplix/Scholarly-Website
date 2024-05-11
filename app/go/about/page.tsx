// import Link from 'next/link'
import UnderConstruction from "@/components/underConstruction"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
    return (
        <div className='flex min-h-screen flex-col items-start lg:items-center pb-28'>
            <div className=" lg:min-h-screen w-screen bg-gradient-conic from-transparent to-cyan-600 flex flex-col justify-center items-start lg:items-center shadow-2xl shadow-cyan-700 py-20 lg:py-16 px-6 lg:px-10">
                <div className="max-w-4x">
                    <h2 className="text-5xl lg:text-7xl font-semibold text-left lg:text-center">Created by students</h2>
                    <h2 className="text-5xl lg:text-7xl mt-6 lg:mt-12 font-semibold text-left lg:text-center">For students</h2>
                    <h5 className="text-xl lg:text-2xl mt-12 lg:mt-20 font-sans font-light text-left lg:text-center">Scholarly is dedicated to bettering the lives of students through the use of technology. We are strong believers in the power of peer tutoring and know how underutilized it is. We want every student to be able to take full advantage of peer tutoring, no matter their circumstances.</h5>
                    <h5 className="text-xl lg:text-2xl mt-8 font-sans font-light text-left lg:text-center">We partner directly with school districts to provide students with effortless, easy access to peer tutoring.</h5>
                </div>
            </div>
            <div className="max-w-xl px-6">
                <h3 className="text-left lg:text-center text-4xl lg:text-6xl font-semibold text-sky-100 mt-24">Our mission.</h3>
                <h6 className="text-left text-xl lg:text-2xl font-extralight lg:text-center mt-6">To create a peer tutoring driven environment for students of all backgrounds. One step every day can lead to a better future for everyone.</h6>
            </div>
            <div className="w-full h-fit px-8 md:px-20 lg:px-32 mt-24">
                <div className="h-0.5 opacity-40 rounded-full bg-cyan-600"/>
            </div>
            <div className="w-screen h-fit mt-24 flex flex-col items-start lg:items-center max-w-2xl px-6">
                <h3 className="font-semibold text-4xl lg:text-6xl text-emerald-300 text-left lg:text-center">Join our growing team</h3>
                <h6 className="text-left lg:text-center font-extralight text-xl lg:text-2xl mt-8">Help us create a better future for all students.</h6>
                <h6 className="text-left lg:text-center font-extralight text-xl lg:text-2xl mt-3">We are dedicated to the student-helping-student motto and will happily bring students into our team.</h6>
                <Link href={'/go/team'} className="mt-12 py-2 px-5 text-2xl text-center self-center rounded-md bg-gradient-to-br from-indigo-500 from-15% via-sky-500 via-40% to-emerald-500 transition-all hover:scale-105">Learn how</Link>
            </div>
        </div>
    )
}
