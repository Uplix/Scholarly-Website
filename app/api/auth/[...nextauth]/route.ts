import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const JWTSecret = String(process.env.NEXTAUTH_JWT_SECRET);
const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorizationUrl.searchParams.set("prompt", "consent");
authorizationUrl.searchParams.set("access_type", "offline");
authorizationUrl.searchParams.set("response_type", "code");

const scopes =[
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar.events"

]

const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
            // authorizationUrl:authorizationUrl,
            // scope: scopes.join(' '),
        }),
    ],
    secret:JWTSecret,
    jwt:{
        encryption:true,
        secret:JWTSecret
    },
    callbacks:{
        async jwt({token, account}:any){
            if(account){
                token.id_token = account?.id_token;
                // token.accessToken = account?.accessToken;
                // token.refreshToken = account?.refreshToken;
            }
            return token;
        },
        async session({session, token, user}:any){
            session.id_token = token.id_token;
            // session.accessToken = user?.accessToken;
            // session.refreshToken = user?.refreshToken;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}