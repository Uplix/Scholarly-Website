'use client'
import UnderConstruction from "@/components/underConstruction"
import * as React from 'react';
import Link from "next/link";
import { db } from "@/firebase/config";
import { remove, onValue, ref } from "firebase/database";
import { Modal, CircularProgress, Dialog, Collapse } from "@mui/material";
import { reportInterface } from "@/clientSide/interfaces";
import { CampaignOutlined, WarningAmberOutlined, Close } from "@mui/icons-material";

function delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}

export default function Reports({params}:{params:{district:string}}){
    const [reports, setReports] = React.useState<any[]>([]);
    const [modaleOpenArray, setModalOpenArray] = React.useState<boolean[]>([]);
    const [slideOpenArray, setSlideOpenArray] = React.useState<boolean[]>([]);
    const [reportModalOpenArray, setReportModalOpenArray] = React.useState<boolean[]>([]);
    const [reportSlideOpenArray, setReportSlideOpenArray] = React.useState<boolean[]>([]);
    const [confimResolve, setConfirmResolve] = React.useState<boolean[]>();
    const [loading, setLoading] = React.useState(true);
    const [reload, setReload] = React.useState(0);
    
    React.useEffect(()=>{
        setLoading(true);
        let theReports:any[] = [];
        let theReportsOpenArray:boolean[] = [];
        let theReportSlideOpenArray:boolean[] = [];
        let theConfirmResolve:boolean[] = [];

        onValue(ref(db, params.district + "/reports/"), (snapshot)=>{
            snapshot.forEach((student)=>{
                student.forEach((report)=>{
                    let theReportingJSON = report.val();
                    theReportingJSON.key = report.key;
                    theReportingJSON.student = student.key
                    theReports.push(theReportingJSON)
                    theReportsOpenArray.push(false);
                    theReportSlideOpenArray.push(false);
                    theConfirmResolve.push(false);
                })
            })
        })

        setTimeout(async ()=>{
            setConfirmResolve(theConfirmResolve);
            setReportModalOpenArray(theReportsOpenArray);
            setReportSlideOpenArray(theReportSlideOpenArray);
            setReports(theReports);
            await delay(600);
            setLoading(false);
        }, 600)
    }, [reload])

    const ReportBlock=(object:reportInterface, i:number)=>{
        let date = new Date(object.date);
        const open = ()=>{
            let theModalOpen = reportModalOpenArray;
            theModalOpen[i] = true;
            setModalOpenArray([...theModalOpen])

            setTimeout(()=>{
                let theSlideOpen = reportSlideOpenArray;
                theSlideOpen[i] = true;
                setSlideOpenArray([...theSlideOpen])
            }, 350)
        }

        const close = ()=>{
            let theSlideOpen = reportSlideOpenArray;
            theSlideOpen[i] = false;
            setSlideOpenArray([...theSlideOpen])

            setTimeout(()=>{
                let theModalOpen = reportModalOpenArray;
                theModalOpen[i] = false;
                setModalOpenArray([...theModalOpen])
            }, 350)
        }

        const openConfirm = ()=>{
            if(confimResolve != undefined){
                let theConfirmResolve = confimResolve;
                theConfirmResolve[i] = true;
                setConfirmResolve([...theConfirmResolve]);
            }
        }

        const closeConfim = ()=>{
            if(confimResolve != undefined){
                let theConfirmResolve = confimResolve;
                theConfirmResolve[i] = false;
                setConfirmResolve([...theConfirmResolve]);
            }
        }

        const resolver = ()=>{
            remove(ref(db, params.district + "/reports/" + object.student + "/" + object.key));
            // console.log(params.district + "/reports/" + params.slug + "/" + object.key)
            setReload(reload + 1);
        }

        let reportArray = object.problems.split(',').filter((object)=>{
            return object.length!=0;
        });

        return(
            <>
                <button onClick={open} className='w-fit h-fit' key={object.key}>
                    <div className='w-80 h-52 flex-col rounded-xl bg-[#131921] drop-shadow-lg outline outline-1 outline-zinc-700'>
                        <div className='w-full h-2/5 flex flex-row items-center justify-start bg-[#111720] px-6'>
                            <div className='p-1 outline rounded-lg outline-1 outline-zinc-500 -ml-1.5'>
                                <CampaignOutlined fontSize='large' sx={{color:'red'}}/>
                            </div>
                            <h4 className='text-2xl ml-3'>Type: {object.type}</h4>
                        </div>
                        <div className='w-full h-3/5 flex flex-col px-8'>
                            <div className='flex-grow w-full flex flex-row items-center'>
                                <h4 className='text-lg opacity-90 font-light'>{date.toDateString()}</h4>
                            </div>
                            <div className='w-full h-0.5 rounded-lg bg-zinc-800'/>
                            <div className='flex-grow w-full flex flex-row items-center'>
                                <h4 className='text-lg opacity-90 font-light'>Problems: {reportArray.length}</h4>
                            </div>
                        </div>
                    </div>
                </button>
                <Modal open={modaleOpenArray[i]} onClose={close}>
                    <div className='w-screen h-screen flex flex-row'>
                        <button onClick={close} className='flex-grow h-screen cursor-default'/>
                        <Collapse className='w-fit h-fit outline outline-l-1 outline-slate-300' sx={{overflow:'scroll'}} orientation='horizontal' in={slideOpenArray[i]} >
                            <div className='w-80 h-scren bg-[#121820] flex flex-col pt-7 pb-7 px-7 relative min-h-screen'>
                                <h3 className='text-lg opacity-50'>Reported Studet:</h3>
                                <Link href={"/login/" + params.district + "/staff/students/" + object.student} className='text-base opacity-90 mt-0.5 ml-2.5 text-blue-500 transition hover:scale-105 hover:translate-x-2 hover:underline underline-offset-2'>{object.student}</Link>
                                <h3 className='text-lg opacity-50 mt-5'>Reporter:</h3>
                                <Link href={"/login/" + params.district + "/staff/students/" + object.reporter.uid} className='text-xl opacity-90 mt-0.5 ml-2.5 text-blue-500 transition hover:scale-105 hover:translate-x-2 hover:underline underline-offset-2'>{object.reporter.name}</Link>
                                <h3 className='text-lg opacity-50 mt-5'>Type:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{object.type}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Date reported:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{date.toDateString()}</h3>
                                <h3 className='text-lg opacity-50 mt-5'>Reports:</h3>
                                <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{reportArray.map((object, i)=>{
                                    if(reportArray[reportArray.length-1].includes("Other: ")){
                                        if(i < reportArray.length - 2){
                                            return object + ", ";
                                        }else if(i == reportArray.length - 2){
                                            return object;
                                        }
                                    }else{
                                        if(i < reportArray.length - 1){
                                            return object + ", ";
                                        }else if(i == reportArray.length - 1){
                                            return object;
                                        }
                                    }
                                    return "";
                                })}</h3>
                               {(reportArray[reportArray.length - 1].includes("Other: ")) && <>
                                    <h3 className='text-lg opacity-50 mt-5'>Description:</h3>
                                    <h3 className='text-lg opacity-90 mt-0.5 ml-2.5'>{reportArray[reportArray.length - 1].substring(6)}</h3>
                                </>}
                                <button onClick={openConfirm} className='w-fit h-fit text-xl bg-gradient-radial to-sky-400 to-70% from-20% from-violet-400 font-light py-1.5 px-5 hover:opacity-80 rounded-lg self-center mt-14'>Report Resolved</button>
                            </div>
                        </Collapse>
                    </div>
                </Modal>
                <Dialog open={confimResolve != undefined && confimResolve[i]}>
                    <div className='flex flex-row bg-[#121820] w-fit h-fit px-10 py-8 relative items-start justify-start'>
                        <div className='w-fit h-fit p-2 bg-rose-400 rounded-full mt-1'>
                            <WarningAmberOutlined sx={{color:'red'}} fontSize='large'/>
                        </div>
                        <div className='flex-grow flex flex-col h-fit ml-6'>
                            <h3 className='text-xl text-start font-bold'>This cannot be undone</h3>
                            <h5 className='text-base opacity-75 font-light mt-2'>Please make sure that you have resolved this student's report before you mark it as resolved. This report will be deleted.</h5>
                            <div className='w-full flex flex-row h-fit justify-end mt-4'>
                                <button onClick={closeConfim}  className='w-fit h-fit py-1 px-4 outline outline-1 outline-zinc-500 rounded-lg text-lg mr-5'>Cancel</button>
                                <button onClick={resolver} className='w-fit h-fit py-1 px-4 bg-red-500 text-lg rounded-lg'>Confirm</button>
                            </div>
                        </div>
                        <button onClick={closeConfim} className='absolute right-2.5 top-2.5'>
                            <Close sx={{fontSize:30, color:'GrayText'}}/>
                        </button>
                    </div>
                </Dialog>
            </>
        )
    }

    if(loading)return<Modal open><div className='w-screen h-screen flex flex-col items-center justify-center'><CircularProgress size={100} thickness={1.5}/></div></Modal>
    return(
        <div className='flex flex-col w-full h-full items-center pt-12'>
            <div className='flex flex-wrap justify-center gap-x-14 gap-y-16 px-16 pb-14'>
                {reports.map((object:reportInterface, i:number)=>ReportBlock(object, i))}
            </div>
        </div>
    )
}