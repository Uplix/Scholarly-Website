import { ReactElement } from "react";

export interface session{
    tutorer: any;
    available:boolean,
    date:number,
    email:string,
    grade:number,
    name:string,
    subject:string,
    text:string,
    time:string,
    tutoree:string,
    location:string,
    idKey:string,
    childKey:string
    // tutorer:null|{
    //     name:string,
    //     id:string
    // }
}

export interface reportInterface{
    type:string,
    problems:string,
    date:number,
    reporter:{
        name:string,
        uid:string
    },
    key:string,
    student:string | undefined
}

export interface supportInterface{
    title:string,
    description:string,
    icon:ReactElement,
    buttonText:string,
    emailLink:string
}