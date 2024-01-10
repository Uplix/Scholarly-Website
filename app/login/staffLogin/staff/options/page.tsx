'use client'
import * as React from 'react'
import { db } from '@/firebase/config';
import { onValue, ref } from 'firebase/database';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function Options(){
    const [classes, setClasses]:any[] = React.useState([]);
    const [times, setTimes]:any = React.useState({
        physical:null,
        virtual:null
    })
    const [grades, setGrades] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [counselors, setCounselors] = React.useState([]);
    const [reload, setReload] = React.useState(0);

    React.useEffect(()=>{
        var theClasses:any[] = []

        onValue(ref(db, 'mhusd/requestInfo'), (snapshot)=>{
            snapshot.child('subjects').forEach((classed)=>{
                theClasses.push({
                    subj:classed.key,
                    classes:classed.val().split(',')
                })
            })
        })

        setClasses(theClasses);
    }, [reload])

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1);
        }, 1000)
    }, [])

    return(
        <div className='flex flex-col w-full h-full items-center'>
            <text className='text-6xl text-center mt-12 px-8 md:leading-normal leading-snug font-bold'>Student Request Options</text>
            <div className='flex flex-row flex-wrap gap-x-8 px-12 gap-y-12 mt-20'>
                <div className='scale-150'>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {classes.map((item:{subj:string, classes:string[]})=>(<TreeItem nodeId={item.subj} label={item.subj}>{item.classes.map((classer:string)=>(<TreeItem nodeId={item.subj + classer} label={classer}/>))}</TreeItem>))}
                    </TreeView>
                </div>
            </div>
        </div>
    )
}