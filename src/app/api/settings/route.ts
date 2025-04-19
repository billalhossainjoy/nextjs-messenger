import {getCurrentUser} from "@/app/actions";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";


export async function POST(req : NextRequest) {
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()
        const {name, image} = body

        if(!currentUser) {
            return new Response("Unauthorized", {status: 401})
        }

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image,
                name
            }
        })

        return NextResponse.json(updateUser)
    } catch (err: unknown) {
        console.log(err)
        return new Response("Internal Error", {status: 500})
    }
    
}