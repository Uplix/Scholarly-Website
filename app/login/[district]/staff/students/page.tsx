'use client'

import * as React from 'react'
import { onValue, ref, query, orderByChild, startAt, endAt, limitToFirst} from 'firebase/database'
import { db } from '@/firebase/config'
import { FormControl, OutlinedInput, InputAdornment, IconButton, InputLabel, Rating } from '@mui/material'
import { SearchOutlined, Check, X } from '@mui/icons-material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams } from '@mui/x-data-grid'
import {CircularProgress} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Students({params}:{params:{district:string}}){
    const [letter, setLetter] = React.useState('a');
    const [students, setStudents]:any[] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [reload, setReload] = React.useState(0);

    const router = useRouter();

    interface rowType{
        id:string|null,
        name:string|null,
        rating:number|null,
        numRatings:number|null,
        isTutor:boolean|null
    }

    const columns:GridColDef[] = [
        {
            field:'id',
            headerName:'User ID',
            width:240
        },
        {
            field:'name',
            headerName:'Name',
            width:200,
        },
        {
            field:'rating',
            headerName:'Rating',
            renderCell:(params:GridRenderCellParams<any, number>)=>(
                <div>
                    <Rating sx={{fontSize:20}} defaultValue={params.value} precision={0.1} readOnly/>
                </div>
            ),
            width:120
        },
        {
            field:'numRatings',
            headerName:'# of Ratings',
            width:100,
            type:'number'
        },
        {
            field:'isTutor',
            headerName:'Is Tutor?',
            width:100,
            type:'boolean'
        }
    ]

    React.useEffect(()=>{
        databaseInitialization();
        const q = query(ref(db, 'mhusd/users/'), orderByChild('name'), startAt((search == undefined || search == null || search == '')?'A':search), limitToFirst(5))
        // setLoading(true)
        // setStudents([])
        var theStudents:rowType[] = []

        onValue(q, (snapshot)=>{
            snapshot.forEach((user)=>{
                var numRatings = 0;
                var sumRatings = 0;
                // console.log(user.val())
                if(user.child('ratings').exists()){
                    user.child('ratings').forEach((rated)=>{
                        numRatings++;
                        sumRatings+=rated.val();
                    })
                }
                const data:rowType = {
                    id:user.key,
                    name:user.child('name').val(),
                    rating:sumRatings,
                    numRatings:numRatings,
                    isTutor:(user.child('isTutor').exists())?user.child('isTutor').val():false
                }
                theStudents.push(data);
            })
        })
        // console.log(students);
        setStudents(theStudents)
        // setTimeout(()=>setLoading(false), 1000)
    }, [reload])

    const searchForStudent = () =>{
        if(search != undefined && search != null && search != ''){
            var theSearch:any = search.split(' ');
            for(var i = 0; i < theSearch.length; i++){
                theSearch[i] = theSearch[i].split('');
                theSearch[i][0] = theSearch[i][0].toUpperCase();
                theSearch[i] = theSearch[i].join('');
            }
            theSearch = theSearch.join(' ')
            // alert(theSearch)
            setSearch(theSearch)
            // alert("searching");
            setReload(reload+1);
        }else{
            alert("Please enter student's name");
        }
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setReload(reload+1)
        }, 500)
        
    }, [])

    const databaseInitialization = ()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }

    const studentClicked:GridEventListener<'rowDoubleClick'> = (params, event, details) =>{
        router.push('/login/' + params.district + '/staff/students/' + params.id)
    }

    return(
        <div className='flex flex-col w-full h-full items-center py-10 mb-5'>
            <text className='text-center text-6xl font-semibold mb-8'>Students</text>
            <FormControl size='medium' variant='outlined'>
                <InputLabel htmlFor='student-search'>Search</InputLabel>
                <OutlinedInput
                id='student-search'
                onKeyDown={(input)=>{
                    if(input.code === 'Enter'){
                        searchForStudent();
                    }
                }}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton edge='end' onClick={searchForStudent}>
                            <SearchOutlined />
                        </IconButton>
                    </InputAdornment>
                }
                label='Search'
                value={search}
                onChange={(event)=>setSearch(event.target.value)}
                />
            </FormControl>
            <div className='flex flex-col w-full h-full items-center mt-10'>
                {loading?
                <div className='flex flex-col w-full h-64 justify-center items-center'>
                    <CircularProgress size={125} thickness={1.5}/>
                </div>
                :
                <div>
                    <DataGrid 
                        columns={columns}
                        rows={students}
                        onRowDoubleClick={studentClicked}
                        initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                    />
                </div>}
            </div>
            
        </div>
    )
}