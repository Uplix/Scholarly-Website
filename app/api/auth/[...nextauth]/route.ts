import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET
        }),
    ],
    callbacks:{
        async jwt({token, account}:any){
            if(account){
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({session, token}:any){
            session.id_token = token.id_token;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}