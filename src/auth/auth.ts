import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import {
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from "@/config/env.config";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginSchema} from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import NextAuth, {AuthOptions} from "next-auth";

export const authOption: AuthOptions = {
    adapter: PrismaAdapter(prisma), providers: [
        FacebookProvider({
            clientId: FACEBOOK_CLIENT_ID,
            clientSecret: FACEBOOK_CLIENT_SECRET,
        }),
        GoogleProvider({
        clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET,
    }), GithubProvider({
        clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET,
    }), CredentialsProvider({
        name: "credentials", credentials: {
            email: {label: "email", type: "text"}, password: {label: "password", type: "text"},
        }, async authorize(credentials) {
            const {email, password} = loginSchema.parse(credentials);

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user || !user.password) throw new Error("Invalid Credentials");

            const isCorrectPassword = await bcrypt.compare(password, user.password);

            if (!isCorrectPassword) throw new Error("Invalid Credentials");

            return user;
        },
    }),], // callbacks: {
    //     async signIn({user, account, profile}){
    //         if(account?.provider === "google"){
    //             const existingUser = await prisma.user.findUnique({
    //                 where: {email: profile?.email}
    //             })
    //         }
    //
    //         return true
    //     }
    // },
    debug: process.env.NODE_ENV === "development", session: {
        strategy: "jwt",
    }, secret: process.env.NEXT_AUTH_SECRET
}

export default NextAuth(authOption);
