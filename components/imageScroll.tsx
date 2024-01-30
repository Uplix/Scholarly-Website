export default function ImageScroller({images}:{images:string[]}){
    return(
        <div className="w-full mx-auto">
            <div className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory">
                {images.map((image)=>(
                    <div key={image} className="snap-center mx-5 scroll-my-8 w-full max-w-3xl flex-shrink-0 snap-always">
                        <img alt={image} src={image}/>
                    </div>
                ))}
            </div>
        </div>
    )
}