"use server"


import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";

export const getConversationById = async (conversationId: string) => {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser?.email) {
            return null
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        return conversation;
    } catch (err: unknown) {
        console.log(err)
        return null
    }
}

export const getMessages = async (conversationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createAt: "asc"
            }
        })


        return messages;
    } catch (err: unknown) {
        console.log(err)
        return []
    }
}
