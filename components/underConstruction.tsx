import Image from "next/image"
export default function UnderConstruction(){
    return(
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <h2 className="text-center text-5xl md:text-7xl font-light font-sans px-3 sm:px-7 md:px-14 lg:px-28">This page is coming soon!</h2>
            <Image className="mt-4 mb-10" height={200} width={200} alt="Construction SVG" src={'/svgs/construction.svg'}/>
            <h4 className="text-center text-xl font-extralight font-serif px-3 sm:px-7 md:px-14 lg:px-28">Our team is hard at work creating this page. Don{"'"}t worry it{"'"}s on its way.</h4>
        </div>
    )
}