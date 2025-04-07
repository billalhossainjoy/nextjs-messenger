import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/config/env.config";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password", type: "text"},
      },
      async authorize(credentials) {
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
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET
})

export default nextAuth;
