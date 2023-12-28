'use client'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { db, auth } from '@/firebase/config';
import { onValue, ref, set, push } from 'firebase/database';
import { FormHelperText } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import {useRouter} from 'next/navigation';

var moment = require('moment');
moment().format();

export default function Page() {
    const [reload, setReload] = React.useState(0);
    const [selectedSub, setSelectedSub]:any = React.useState("");
    const [requestSub, setRequestSub]:any[] = React.useState([]);
    const [selectedTime, setSelectedTime]:any = React.useState("");
    const [requestTime, setRequestTime]:any = React.useState({physical:[], virtual:[]});
    const [selectedGrade, setSelectedGrade]:any = React.useState(0);
    const [requestGrades, setRequestGrades]:any[] = React.useState([]);
    const [selectedLocation, setSelectedLocation]:any = React.useState("");
    const [requestLocations, setRequestLocations]:any[] = React.useState([]);
    const [physcial, setPhyscial] = React.useState(false);
    const [date, setDate]:any = React.useState(moment().add(2, 'days'));
    const [text, setText] = React.useState("");
    const [subError, setSubError] = React.useState(false);
    const [timeError, setTimeError] = React.useState(false);
    const [gradeError, setGradeError] = React.useState(false);
    const [locationError, setLocationError] = React.useState(false);
    const [textError, setTextError] = React.useState('good');
    const [current, setCurrent]:any = React.useState(undefined);
    const router = useRouter();

    React.useEffect(()=>{
        var theRequestSub:any[] = [];
        var theRequestTime:{physical:any[],virtual:any[]} = {
            physical:[],
            virtual:[]
        }
        var theRequestGrade:any[] = [];
        var theRequestLocation:any[] = [];
        onValue(ref(db, "mhusd/requestInfo/"), (snapshot)=>{
            snapshot.child('subjects').forEach((child)=>{
                theRequestSub.push({
                    subj:child.key,
                    classes:child.val().split(',')
                })
            })
            if(snapshot.child('times').hasChild('physicalTimes')){
                theRequestTime.physical = snapshot.child('times').child('physicalTimes').val().split(',')
            }
            if(snapshot.child('times').hasChild('videoTimes')){
                theRequestTime.virtual = snapshot.child('times').child('videoTimes').val().split(',')
            }
            theRequestGrade = snapshot.child('grades').val().split(',');
            theRequestLocation = snapshot.child('locations').val().split(',');
        })
        var currentDates:any[] = [];
        onValue(ref(db, 'mhusd/schedule/' + auth.currentUser?.uid), (snapshot)=>{
            snapshot.forEach((child)=>{
                currentDates.push(child.child('date').val())
            })
        })
        setCurrent(currentDates);
        setRequestSub(theRequestSub);
        setRequestTime(theRequestTime)
        setRequestGrades(theRequestGrade);
        setRequestLocations(theRequestLocation);
    }, [reload])

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload + 1);
        }, 1000)
    }, [])

    const Subjecting = () =>{
        const handleChange = (event: SelectChangeEvent) =>{
            setSelectedSub(event.target.value as string)
        }
        return(
            <FormControl error={subError} sx={{m:1, minWidth:250}}>
                <InputLabel htmlFor="subject-select">{(selectedSub == "")? "Subject":selectedSub}</InputLabel>
                <Select native defaultValue="" id='subject-select' label={(selectedSub == "")? "Subject":selectedSub} onChange={handleChange}>
                    <option aria-label="None" value="" />
                    {requestSub.map((object:{subj:string, classes:any[]})=>(
                        <optgroup label={object.subj}>
                            {object.classes.map((object2)=>(<option key={object.subj+object2} value={object2}>{object2}</option>))}
                        </optgroup>
                    ))}
                </Select>
                <FormHelperText>Subject you need help with</FormHelperText>
            </FormControl>
        )
    }

    const Timing = () =>{
        const handelChange = (event:SelectChangeEvent)=>{
            let val = event.target.value.split(',');
            setSelectedTime(val[1] as string);
            if(val[0] == 'physcial'){
                setPhyscial(true);
            }else{
                setPhyscial(false);
            }
        }

        return(
            <FormControl error={timeError} sx={{m:1, minWidth:250}}>
                <InputLabel htmlFor="time-select">{(selectedTime == "")? "Time":selectedTime}</InputLabel>
                <Select native defaultValue="" id='time-select' label={(selectedTime == "")? "Time":selectedTime} onChange={handelChange}>
                    <option aria-label='None' value="" />
                    {(requestTime.virtual == null || requestTime.virtual == undefined)? null:
                    <optgroup label='Virtual Times'>
                        {requestTime.virtual.map((object:string)=>(<option key={"virtual"+object} value={'virtual,'+object}>{object}</option>))}
                    </optgroup>}
                    {(requestTime.physical == null || requestTime.physical == undefined)? null:
                    <optgroup label='Physical Times'>
                        {requestTime.physical.map((object:string)=>(<option key={"physical"+object} value={'physcial,'+object}>{object}</option>))}
                    </optgroup>}
                </Select>
                <FormHelperText>Time to meet</FormHelperText>
            </FormControl>
        )
    }

    const Location = () =>{
        const handleChange = (event:SelectChangeEvent)=>{
            setSelectedLocation(event.target.value as string)
        }

        if(physcial)return(
            <FormControl error={locationError} sx={{m:1, minWidth:250}}>
                <InputLabel htmlFor="location-select">{(selectedLocation == "")?"Location":selectedLocation}</InputLabel>
                <Select native defaultValue="" id='location-select' label={(selectedLocation == "")?"Location":selectedLocation} onChange={handleChange}>
                    <option aria-label='None' value=""/>
                    {requestLocations.map((object:string)=>(<option key={object} value={object}>{object}</option>))}
                </Select>
                <FormHelperText>Location to meet</FormHelperText>
            </FormControl>
        )
    }

    const Grading = () =>{
        const handleChange = (event:SelectChangeEvent) =>{
            setSelectedGrade(event.target.value as string);
        }

        return(
            <FormControl error={gradeError} sx={{m:1, minWidth:250}}>
                <InputLabel htmlFor="grade-select">{(selectedGrade == "")? "Grade":"Grade: "+selectedGrade}</InputLabel>
                <Select native defaultValue="" id='grade-select' label={(selectedGrade == "")?"Grade":"Grade: "+selectedGrade} onChange={handleChange}>
                <option aria-label='None' value=""/>
                {requestGrades.map((object:number)=>(<option key={object} value={object}>{"Grade: "+object}</option>))}
                </Select>
                <FormHelperText>Your current grade</FormHelperText>
            </FormControl>
        )
    }

    const Dating = () =>{
        return(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer components={['DatePicker']}>
                    <DateCalendar onChange={(theDate)=>setDate(theDate)} value={date} minDate={moment().add(2, 'days')} maxDate={moment().add(1, 'M').add(2, 'd')}/>
                </DemoContainer>
            </LocalizationProvider>
        )
    }
    
    const submit =()=>{
        var myTime = date.startOf('day')
        var theDate = new Date(myTime);
        var theLocation = null;

        const checking = (dater:number) =>{
            return dater == theDate.getTime();
        }
        var theSubError, theTimeError, theGradeError, theTextError, theDateError, theLocationError;
        theSubError = theTimeError = theGradeError = theTextError = theDateError = theLocationError = true;
        // alert(theDate.getTime());
        if(selectedSub == undefined || selectedSub == null || selectedSub == ""){
            setSubError(true);
        }else{
            setSubError(false)
            theSubError = false;
        }
        if(selectedTime == undefined || selectedTime == null || selectedTime == ""){
            setTimeError(true);
        }else{
            setTimeError(false);
            theTimeError = false;
        }
        if(selectedGrade == undefined || selectedGrade == null || selectedGrade == 0){
            setGradeError(true);
            // alert("grade error")
        }else{
            setGradeError(false)
            theGradeError = false;
            // alert("no grade error")
        }
        if(text == undefined || text == null || text.length < 10){
            setTextError('short');
        }else if(text.length > 80){
            setTextError('long')
        }else{
            setTextError('good')
            theTextError = false;
        }
        if(theDate == undefined || theDate == null || theDate.toString() == ""){
            alert("Date picker error")
        }else{
            theDateError = false;
        }

        if(physcial){
            if(selectedLocation == undefined || selectedLocation == null || selectedLocation == ""){
                setLocationError(true);
            }else{
                setLocationError(false);
                theLocationError = false;
                theLocation = selectedLocation;
            }
        }else{
            theLocation = "Google Meets";
            theLocationError = false;
        }

        //if everything is filled out
        if(!(theSubError || theTimeError || theGradeError || theTextError || theDateError || theLocationError)){
            // alert(theSubError + " " + theTimeError + " " +theGradeError +" " + theTextError +" " + theDateError +" " + theLocationError)
            if(current == undefined){
                alert("Could not fetch your current schedule from server");
            }else if(current.find(checking) != undefined){
                alert("You already have a session on this day. Try changing the date.");
            }else{
                try{
                    var pushRef = push(ref(db, 'mhusd/sessions/' + auth.currentUser?.uid))
                    set(pushRef, {
                        name:auth.currentUser?.displayName,
                        subject:selectedSub,
                        grade:selectedGrade,
                        time:selectedTime,
                        date:theDate.getTime() as number,
                        text:text,
                        location:theLocation,
                        email:auth.currentUser?.email,
                        available:true,
                        tutoree:auth.currentUser?.uid
                    })
                    set(ref(db, 'mhusd/schedule/' + auth.currentUser?.uid + '/' + pushRef.key), {
                        name:auth.currentUser?.displayName,
                        subject:selectedSub,
                        grade:selectedGrade,
                        time:selectedTime,
                        date:theDate.getTime() as number,
                        text:text,
                        location:theLocation,
                        email:auth.currentUser?.email,
                        available:true,
                        tutoree:auth.currentUser?.uid
                    })
                }catch(e){
                    alert("An error occured while adding to database: " + e)
                }
                setSelectedSub('')
                setSelectedTime('')
                setText('')
                setDate(moment().add(2, 'days'))
                alert("Scheduled")
                router.push('/login/studentLogin/student/schedule');
            }
        }else{
            alert("You left one or more prompts blank")
            console.log(theSubError, theTimeError, theTextError, theDateError, theGradeError, theLocationError)
        }
    }

    return(
        <div className='w-full h-full pb-20 flex flex-col justify-center items-center'>
            <text className='text-slate-50 text-6xl mt-6 text-center font-light font-sans'>Request Help</text>
            <div className='flex flex-wrap flex-row gap-x-20 gap-y-10 justify-center mt-11 mx-20'>
                <div className='animate-jump-in ease-in'>
                    <Subjecting />
                </div>
                <div className='animate-jump-in ease-in'>
                    <Grading />
                </div>
            </div>
            <div className='flex flex-wrap flex-row gap-x-20 gap-y-10 justify-center mt-10 mx-20'>
                <div className='animate-jump-in ease-in'>
                    <Timing />
                </div>
               {physcial?<div className='animate-jump-in ease-in'>
                    <Location />
                </div>:null}
            </div>
            <div className='mt-10 animate-jump-in ease-in'>
                <Dating />
            </div>
            <div className='mt-10 animate-jump-in ease-in'>
            <TextField 
                    value={text} 
                    error={textError != 'good'} 
                    autoComplete='off'
                    id='extra-text' 
                    label="Description"
                    helperText={(textError == 'long')?"Must be shorter that 80 characters":"Must be at least 10 characters. Hopefully more :)"}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setText(event.target.value)}}
                />
            </div>
            <button onClick={submit} className='text-center text-4xl text-slate-50 mt-10 px-3 py-2 bg-gradient-to-br from-emerald-800 to-green-400 rounded-xl transition hover:scale-110 hover:-translate-y-2 hover:opacity-80'>Submit</button>
        </div>
    )
}