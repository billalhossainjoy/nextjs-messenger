import { withAuth } from "next-auth/middleware";
import {NEXT_AUTH_SECRET} from "@/config/env.config";

export default withAuth({
    secret: NEXT_AUTH_SECRET,
    pages: {
        signIn: '/',
    },
});

export const config = {
    matcher: [
        '/users/:path*',
        '/conversations/:path*'
    ],
};