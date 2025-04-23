// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    {
        secret: process.env.NEXT_AUTH_SECRET,
        pages: {
            signIn: "/",
            signOut: "/"
        },
    }
)

export const config = {
    matcher: [
        '/users/:path*',
        '/conversations/:path*'
    ],
}
