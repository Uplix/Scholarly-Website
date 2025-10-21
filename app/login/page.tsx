'use client'
import * as React from 'react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import SchoolIcon from '@/components/schoolIcon.svg'
import { Autocomplete, Box, TextField, Collapse } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export default function District(){
    const [selected, setSelected] = React.useState('');
    const [options, setOptions] = React.useState<any[]>([]);
    const [arrowOpen, setArrowOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    const router = useRouter();

    React.useEffect(()=>{
        setTimeout(()=>{
            var theOptions:any[] = [];
            process.env.NEXT_PUBLIC_DISTRICTS?.split(',').forEach((value)=>{
                theOptions.push(value.split(':')[0].toUpperCase());
            })
            setOptions(theOptions);
            console.log(options, theOptions)
        }, 500)
    }, [])

    const continuer = ()=>{
       if(selected != undefined && selected != null && selected != ''){
            setError(false);
            router.push('/login/' + selected.toLowerCase())
       }else{
            setError(true);
       }
    }

    return(
        <div className="flex flex-row flex-wrap min-h-screen items-center justify-center">
            <title>Scholarly: Choose District</title>
            <div className="w-96 flex flex-col items-center">
                <Image alt="School-Icon" src={SchoolIcon} width={300} height={0}/>
            </div>
            <div className="w-full max-w-2xl flex flex-col items-center justify-center">
                <h2 className="text-4xl font-light text-center px-5">What is your school district?</h2>
                <div className='w-full max-w-xl px-20 mt-10'>
                    <Autocomplete 
                        value={selected}
                        onChange={(event: any, newValue: string | null) => {
                            setSelected((newValue == null)? '':newValue);
                          }}
                        id='district-choice'
                        fullWidth
                        options={options}
                        autoHighlight
                        getOptionLabel={(option)=>option}
                        renderOption={(props, option)=>(
                            <Box component='li' {...props}>
                                {option}
                            </Box>
                        )}
                        renderInput={(params)=>(
                            <TextField 
                                {...params}
                                label="District"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                                error={error}
                            />
                        )}
                    />
                </div>
                <button onClick={continuer} onFocus={()=>setArrowOpen(true)} onBlur={()=>setArrowOpen(false)} onMouseOver={()=>setArrowOpen(true)} onMouseLeave={()=>setArrowOpen(false)} className='flex flex-row mt-14 gap-x-3 justify-center items-center transition-all text-4xl font-light'>
                    <h4 className='opacity-90'>Continue</h4>
                    <Collapse in={arrowOpen} orientation='horizontal'>
                        <ArrowForwardOutlinedIcon fontSize='large'/>
                    </Collapse>
                </button>
            </div>
        </div>
    )
}