import {NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";

interface IParams {
    conversationId: string;
}

export async function DELETE(req: NextRequest, {params} : {params: IParams})  {
    try {
        const {conversationId} = params
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new Response("Unauthorized", {status: 401})
        }
        const existingUserConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if(!existingUserConversation) {
            return new Response("Invalid ID", {status: 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (err: unknown) {
        console.log(err)
        return new Response("Internal Error", {status: 500})
    }

}