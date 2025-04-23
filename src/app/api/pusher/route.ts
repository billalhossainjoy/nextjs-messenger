import {getServerSession} from "next-auth";
import {authOption} from "@/auth/auth";
import {NextRequest} from "next/server";
import {pusherServer} from "@/pusher";


export async function POST (req: NextRequest) {

    const formData = await req.formData();
    const socket_id = formData.get("socket_id") as string;
    const channel_name = formData.get("channel_name") as string;

    const session = await getServerSession(authOption)

    if(!session?.user?.email) {
        return new Response("unauthorized")
    }

    const data = {
        user_id: session.user.email
    }

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data);

    return Response.json(authResponse)
}