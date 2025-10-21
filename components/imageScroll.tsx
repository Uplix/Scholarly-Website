import Image from "next/image"

export default function ImageScroller({images}:{images:string[]}){
    return(
        <div className="w-full mx-auto">
            <div className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory ">
                {images.map((image)=>(
                    <div key={image} className="mx-5 w-full max-w-3xl flex-shrink-0 snap-always snap-center">
                        <Image className=" scroll-my-8 w-full max-w-3xl" alt={image} src={image} width={300} height={20}/>
                    </div>
                ))}
            </div>
        </div>
    )
}