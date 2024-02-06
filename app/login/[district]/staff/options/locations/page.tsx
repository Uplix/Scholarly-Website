'use client'
import * as React from 'react'
import { Button, Modal, TextField } from "@mui/material"
import { db } from '@/firebase/config'
import { onValue, ref, set } from 'firebase/database'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function LocationEdit({params}:{params:{district:string}}){
    const [locations, setLocations]:any[] = React.useState([]);
    const [reload, setReload] = React.useState(0);
    const [addLocationButtonColor, setAddLocationButtonColor] = React.useState('primary');

    const router = useRouter();

    React.useEffect(()=>{
        var theLoc:string[] = [];
        onValue(ref(db, 'mhusd/requestInfo/locations/'), (snapshot)=>{
            theLoc = snapshot.val().split(',')
        })
        setLocations(theLoc)
    }, [reload]);

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1);
        }, 1500)
    }, [])

    const addLocation = ()=>{
        if(locations.length > 0 && locations[locations.length - 1] == undefined || locations[locations.length - 1] == null || locations[locations.length - 1] == ''){
            setAddLocationButtonColor('error');
        }else{
            setAddLocationButtonColor('primary');
            let theCurrent = locations;
            theCurrent[theCurrent.length] = '';
            setLocations([...theCurrent]);
        }
    }

    const publishChanges = ()=>{
        set(ref(db, 'mhusd/requestInfo/locations/'), locations.join(','))
        router.push('/login/' + params.district + '/staff/options');
    }

    const Indiv = ({value, index}:{value:string, index:number})=>{
        const [currentValue, setCurrentValue] = React.useState(value);

        const deleteIndiv=()=>{
            let theCurrent = locations;
            theCurrent.splice(index, 1);
            setLocations([...theCurrent]);
        }

        return(
            <div className='flex flex-row items-end'>
                <TextField
                value={currentValue} onChange={(event)=>setCurrentValue(event.target.value)} onBlur={()=>{
                    let theCurrent = locations;
                    theCurrent[index] = currentValue;
                    setLocations([...theCurrent]);
                }}/>
                <button onClick={deleteIndiv} className='mb-4 ml-2 scale-110 transition hover:scale-125 hover:-translate-y-1'>
                    <DeleteOutlineOutlined className='text-red-600' fontSize='medium'/>
                </button>
            </div>
        )
    }

    return(
        <div className='w-full h-full flex flex-col items-center'>
            <text className='text-5xl text-slate-100 font-semibold mt-8'>Edit Locations</text>
            <div className='flex flex-row w-full h-fit justify-center px-12 flex-wrap gap-y-5 mt-12'>
                    <Button color={addLocationButtonColor} onClick={addLocation} variant="outlined" className="w-52 h-18 text-2xl">Add Location</Button>
                    <Button onClick={()=>setReload(reload+1)} color='warning' variant='outlined' className='text-2xl ml-20'>Revert</Button>
                    <Button onClick={publishChanges} color='success' variant='outlined' className='text-2xl ml-6'>Apply Changes</Button>
                </div>
            <div className='flex flex-col mt-6 gap-y-4'>
                {locations.map((value:string, index:number)=><Indiv value={value} index={index}/>)}
            </div>
        </div>
    )
}