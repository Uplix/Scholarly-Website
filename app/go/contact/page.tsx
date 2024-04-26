import { supportInterface } from "@/clientSide/interfaces"
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BugReportIcon from '@mui/icons-material/BugReport';
import ComputerIcon from '@mui/icons-material/Computer';

var supports:supportInterface[] = [
    {
        title:"Interested in Scholarly",
        description:"Are you interested in bringing Scholarly to your school district? Let us know!",
        buttonText:"Contact us",
        emailLink:'',
        icon:<SchoolIcon />
    },
    {
        title:"Bug Reports",
        description:"Scholarly is still in beta so we expect bugs to be found. If you have found one please let us know so that we can fix it.",
        buttonText:"Report bug",
        emailLink:'',
        icon:<BugReportIcon />
    },
    {
        title:"Tech Support",
        description:"Are you having some trouble with our app or website? We are always happy to help on your journey through peer tutoring.",
        buttonText:"Help Me",
        emailLink:'',
        icon:<ComputerIcon />
    }
]

export default function ContactUs() {
    return (
        <div className='flex flex-col pt-8 pb-32 px-10 items-center min-h-screen'>
            <title>Contact Us</title>
            <h1 className="text-5xl md:text-6xl text-center font-sans">Contact Us</h1>
            <h2 className="text-xl opacity-80 mt-5 font-light mb-6 text-center z-0">We{"'"}re here to help. What can we do for you?</h2>
            {supports.map((object, i)=>(
                <div className="flex flex-row mt-16 w-fit h-fit max-w-xl" key={i}>
                    <div className="w-fit h-fit pr-7">
                        <div className="w-fit h-fit p-1 scale-125 bg-gradient-to-br from-sky-400 to-indigo-300 rounded-md">
                            {object.icon}
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow items-start">
                        <h4 className="text-xl font-semibold">{object.title}</h4>
                        <h6 className="text-lg mt-4 opacity-75 font-light">{object.description}</h6>
                        <a href={object.emailLink} className="text-lg mt-5 text-indigo-400 hover:translate-x-1 transition-all w-fit h-fit flex flex-row items-center gap-x-2">{object.buttonText} <ArrowForwardIcon fontSize="small"/></a>
                    </div>
                </div>
            ))}
        </div>
    )
}
