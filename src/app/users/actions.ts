"use server"

import {getSession} from "@/app/actions";
import {prisma} from "@/lib/prisma";


export async function getUsers() {
    const session = await getSession()

    if(!session?.user?.email){
        return []
    }

    try {
        const users = await  prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })

        return users
    }catch(err: unknown){
        console.log(err)
        return []
    }
}