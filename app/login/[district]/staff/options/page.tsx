'use client'
import * as React from 'react'
import { db } from '@/firebase/config';
import { onValue, ref } from 'firebase/database';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container } from '@mui/material';
import Link from 'next/link';


export default function Options({params}:{params:{district:string}}){
    const [classes, setClasses]:any[] = React.useState([]);
    const [times, setTimes]:any = React.useState({
        physical:[],
        virtual:[]
    })
    const [grades, setGrades]:any[] = React.useState([]);
    const [locations, setLocations]:any[] = React.useState([]);
    const [counselors, setCounselors] = React.useState([]);
    const [reload, setReload] = React.useState(0);
    const [expanded, setExpanded] = React.useState(['Math'])

    React.useEffect(()=>{
        var theClasses:any[] = []

        onValue(ref(db, 'mhusd/requestInfo/subjects'), (snapshot)=>{
            snapshot.forEach((classed)=>{
                theClasses.push({
                    subj:classed.key,
                    classes:classed.val().split(',')
                })
            })
            snapshot.child('times')
        })

        setClasses(theClasses);
    }, [reload])

    React.useEffect(()=>{
        var theTimes = {
            physical:[],
            virtual:[]
        }

        onValue(ref(db, 'mhusd/requestInfo/times'), (snapshot)=>{
            if(snapshot.child('physicalTimes').exists()){
                theTimes.physical = snapshot.child('physicalTimes').val().split(',');
            }
            if(snapshot.child('videoTimes').exists()){
                theTimes.virtual = snapshot.child('videoTimes').val().split(',');
            }
        })

        setTimes(theTimes);
    }, [reload])

    React.useEffect(()=>{
        var theLocations:any[] = []

        onValue(ref(db, 'mhusd/requestInfo/locations'), (snapshot)=>{ 
            if(snapshot.exists()){
                theLocations = snapshot.val().split(',');
            }
        })

        setLocations(theLocations);
    }, [reload])

    React.useEffect(()=>{
        var theGrades:any[] = []

        onValue(ref(db, 'mhusd/requestInfo/grades'), (snapshot)=>{ 
            if(snapshot.exists()){
                theGrades = snapshot.val().split(',');
            }
        })

        setGrades(theGrades);
    }, [reload])


    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1);
        }, 1000)
    }, [])

    return(
        <div className='flex flex-col w-full h-fit items-center mb-16'>
            <text className='text-6xl text-center mt-12 px-8 md:leading-normal leading-snug font-bold'>Student Request Options</text>
            <div className='flex flex-row flex-wrap gap-x-14 px-12 gap-y-12 mt-20 w-full justify-center'>
                <div className='flex flex-col items-center w-fit h-fit'>
                    <text className='text-4xl'>Subjects</text>
                    <div className='pl-8 pr-5 mt-3 overflow-auto rounded-lg bg-gradient-to-br from-sky-400 to-sky-700 bg-opacity-60 mix-blend-lighten'>
                        <div className='flex flex-col items-center w-56 max-h-96'>
                            <div className='flex flex-col min-w-full min-h-full relative'>
                                
                                <div className='scale-150 h-max w-max'>
                                    <Container sx={{maxHeight:300}}>
                                        <Box sx={{ minHeight: 300, flexGrow: 1, maxWidth: 300, mt:12}}>
                                            <TreeView
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                // expanded={expanded}
                                            >
                                                {classes.map((item:{subj:string, classes:string[]})=>(<TreeItem key={item.subj+'classHead'} nodeId={item.subj} label={item.subj}>{item.classes.map((classer:string)=>(<TreeItem key={item.subj+classer} nodeId={item.subj + classer} label={classer}/>))}</TreeItem>))}
                                            </TreeView>
                                        </Box>
                                    </Container>
                                </div>
                                {/* <div className='flex flex-row justify-end w-full max-h-3'> */}
                                    <Link href={'/login/' + params.district + '/staff/options/subjects'} className='absolute top-4 right-4 transition delay-150 hover:scale-110 hover:-translate-y-1'><EditIcon fontSize='large'/></Link>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center w-fit h-fit'>
                    <text className='text-4xl'>Times</text>
                    <div className='pl-8 pr-5 mt-3 overflow-auto rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-700 bg-opacity-60 mix-blend-lighten'>
                        <div className='flex flex-col items-center w-56 max-h-96'>
                            <div className='flex flex-col min-w-full min-h-full relative'>
                                {/* <div className='flex flex-row justify-end w-full max-h-3'>
                                    <Link href={'/login/' + params.district + '/staff/options/subjects'} className='mr-5 mt-5 transition delay-150 hover:scale-110 hover:-translate-y-1'><EditIcon fontSize='large'/></Link>
                                </div> */}
                                <div className='scale-150 h-max w-max'>
                                    <Container sx={{maxHeight:300}}>
                                        <Box sx={{ minHeight: 300, flexGrow: 1, maxWidth: 300, mt:12}}>
                                            <TreeView
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                // expanded={expanded}
                                            >
                                                <TreeItem nodeId='virtual' label='Virtual'>
                                                    {times.virtual.map((timed:string)=>(<TreeItem key={'virtual'+timed} nodeId={'virtual' + timed} label={timed} />))}
                                                </TreeItem>
                                                <TreeItem nodeId='physical' label='Physical'>
                                                    {times.physical.map((timed:string)=>(<TreeItem key={'physical'+timed} nodeId={'physical' + timed} label={timed} />))}
                                                </TreeItem>
                                            </TreeView>
                                        </Box>
                                    </Container>
                                </div>
                                <Link href={'/login/' + params.district + '/staff/options/times'} className='absolute top-4 right-4 transition delay-150 hover:scale-110 hover:-translate-y-1'><EditIcon fontSize='large'/></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center w-fit h-fit'>
                    <text className='text-4xl'>Locations</text>
                    <div className='pl-8 pr-5 mt-3 overflow-auto rounded-lg bg-gradient-to-br from-violet-300 to-violet-700 bg-opacity-60 mix-blend-lighten'>
                        <div className='flex flex-col items-center w-56 h-96'>
                            <div className='flex flex-row justify-end w-full max-h-3'>
                                <Link href={'/login/' + params.district + '/staff/options/locations'} className='mr-5 mt-5 transition delay-150 hover:scale-110 hover:-translate-y-1'><EditIcon fontSize='large'/></Link>
                            </div>
                            <div className='flex flex-col items-start w-full h-fit mt-12 ml-10 gap-y-2'>
                                {locations.map((location:string)=>(<text key={location+'location'} className='text-2xl text-slate-50'>{"-   " + location}</text>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-fit w-96 items-center pt-12 relative'>
                <text className='text-4xl'>Grades</text>
                <div className='mt-3 py-6 px-9 h-fit w-fit max-w-5xl bg-gradient-to-br from-yellow-200 to-yellow-600 overflow-auto rounded-lg'>
                    <div className='flex flex-row justify-center items-center gap-x-8 '>
                        {grades.map((grade:string)=><text key={'grade'+grade} className='text-3xl'>{grade}</text>)}
                    </div>
                </div>
                <div className='flex flex-row justify-end w-full max-h-3 absolute top-9 right-6'>
                    {/* <Link href={'/login/' + params.district + '/staff/options/grades'} className='mr-5 mt-5 transition delay-150 hover:scale-110 hover:-translate-y-1'><EditIcon fontSize='large'/></Link> */}
                </div>
            </div>
        </div>
    )
}