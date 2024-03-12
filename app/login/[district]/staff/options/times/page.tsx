'use client'
import * as React from 'react'
import { Button, Modal, TextField } from "@mui/material"
import { db } from '@/firebase/config'
import { onValue, ref, set } from 'firebase/database'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function TimeEdit({params}:{params:{district:string}}){
    const [times, setTimes]:any = React.useState({
        virtual:[],
        physical:[]
    });
    const [reload, setReload] = React.useState(0);

    const router = useRouter();

    React.useEffect(()=>{
        var theTimes:any = {
            virtual:[],
            physical:[]
        };
        onValue(ref(db, 'mhusd/requestInfo/times/'), (snapshot)=>{
            if(snapshot.child('physicalTimes').exists()){
                theTimes.physical = snapshot.child('physicalTimes').val().split(',');
            }
            if(snapshot.child('videoTimes').exists()){
                theTimes.virtual = snapshot.child('videoTimes').val().split(',');
            }
        })
        setTimes(theTimes)
    }, [reload]);

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1);
        }, 1500)
    }, [])

    const publishChanges = () =>{
        let theTimes = {
            videoTimes:times.virtual.join(','),
            physicalTimes:times.physical.join(','),
        }
        // console.log(theTimes);
        set(ref(db, 'mhusd/requestInfo/times/'), theTimes)
        router.push('/login/' + params.district + '/staff/options')
    }

    const TimeHead = ({value, display}:{value:string, display:string}) => {
        const [currentValue, setCurrentValue] = React.useState(times[value]);
        const [textError, setTextError] = React.useState(false);
        const [modal, setModal] = React.useState(false)

        const addIndiv = () =>{
            let theCurrent = times;
            if(theCurrent[value].length != 0){
                if(theCurrent[value][theCurrent[value].length - 1] == undefined || theCurrent[value][theCurrent[value].length - 1] == null || theCurrent[value][theCurrent[value].length - 1] == ''){
                    setTextError(true);
                    // alert("Please fill in the last ")
                }else{
                    setTextError(false)
                    theCurrent[value].push('')
                    setTimes({...theCurrent})
                }
            }else{
                setTextError(false)
                theCurrent[value].push('')
                setTimes({...theCurrent})
            }
        }

        // const deleteSubj = () =>{
        //     let theCurrent = times;
        //     theCurrent.splice(index, 1)
        //     setTimes([...theCurrent]);
        // }

        return(
            <>
                <div key={display+'timeHead'}>
                    <div className='flex flex-row justify-start'>
                        {/* <TextField error={textError} value={currentValue} onChange={(event)=>setCurrentValue(event.target.value)} onBlur={()=>{
                            times[value] = currentValue;
                            setTimes([...array]);
                        }}/> */}
                        <text className='text-4xl text-slate-100 font-medium mb-2'>{display}</text>
                        <button onClick={addIndiv} className='ml-4 transition hover:scale-110 hover:-translate-y-1'>
                            <AddIcon className='text-emerald-400' fontSize='large'/>
                        </button>
                        {/* <button onClick={()=>setModal(true)} className='ml-1.5 transition hover:scale-110 hover:-translate-y-1'>
                            <DeleteOutlineOutlined className='text-red-600' fontSize='large'/>
                        </button> */}
                    </div>
                    <div className='flex flex-col ml-6'>
                        {times[value].map((theValue:string, theIndex:number)=><IndivClasses key={theValue+theIndex+'indivTime'} value={theValue} index={theIndex}  bigIndex={value}/>)}
                    </div>
                </div>
                {/* <Modal className='self-center' onClose={()=>setModal(false)} open={modal}>
                    <div className='w-screen h-screen flex flex-col justify-center items-center bg-transparent'>
                        <div  className='flex flex-col items-center py-8 gap-y-3 px-6 animate-duration-500 relative animate-jump-in ease-in h-fit w-96 bg-[#1e1e1e] rounded-2xl'>
                            <text className='text-4xl font-medium text-center text-slate-100'>This action cannot be undone</text>
                            <Button onClick={deleteSubj} className='text-3xl mt-8' variant='outlined' color='error'>Confirm</Button>
                        </div>
                    </div>
                </Modal> */}
            </>
        )
    }

    const IndivClasses = ({value, index, bigIndex}:{value:string, index:number, bigIndex:string}) => {
        const [currentValue, setCurrentValue] = React.useState(value);
        
        const deleteIndiv = () =>{
            let theCurrent = times;
            theCurrent[bigIndex].splice(index, 1);

            // console.log(bigArray);
            setTimes({...theCurrent});
        }
        return(
            <div key={value+index+'timeIndiv'} className='flex flex-row items-end'>
                <div className='flex flex-col items-start'>
                    <div className='w-0.5 h-16 bg-gray-700 bg-opacity-60'/>
                    <div className='w-14 h-0.5 bg-gray-700 bg-opacity-60'/>
                    <div className='w-0 h-3 bg-transparent'/>
                </div>
                <TextField
                //  type='time'
                 value={currentValue} onChange={(event)=>setCurrentValue(event.target.value)} onBlur={()=>{
                    let theCurrent = times;
                    theCurrent[bigIndex][index] = currentValue;
                    setTimes({...theCurrent});
                }}/>
                <button onClick={deleteIndiv} className='mb-4 ml-2 scale-110 transition hover:scale-125 hover:-translate-y-1'>
                    <DeleteOutlineOutlined className='text-red-600' fontSize='medium'/>
                </button>
            </div>
        )
    }

    return(
        <div className="flex flex-col w-full h-fit items-center pb-12">
            <text className='text-5xl text-slate-100 font-semibold mt-10'>Edit Times</text>
            <div className="flex flex-col w-full h-full mt-12 items-center">
                <div className='flex flex-row w-full h-fit justify-center px-12 flex-wrap gap-y-5'>
                    <Button onClick={()=>setReload(reload+1)} color='warning' variant='outlined' className='text-2xl ml-20'>Revert</Button>
                    <Button onClick={publishChanges} color='success' variant='outlined' className='text-2xl ml-12'>Apply Changes</Button>
                </div>
                <div className='flex flex-row gap-y-6 gap-x-10 mt-8 flex-wrap justify-center px-12'>
                    <TimeHead value='virtual' display='Virtual'/>
                    <TimeHead value='physical' display='Physical'/>
                </div>
            </div>
        </div>
    )
}