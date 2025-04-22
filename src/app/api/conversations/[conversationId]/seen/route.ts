import {NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";
import {Trigger} from "@radix-ui/react-select";
import {pusherServer} from "@/pusher";

interface Params {
    conversationId: string;
}

export async function POST(req: NextRequest, {params} : { params: Promise<Params> }) {
    try {
        const currentUser = await getCurrentUser()
        const {conversationId} = await params

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("unauthorized", {status: 401})
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true
            }
        })

        if(!conversation) {
            return new NextResponse("invalid id ", {status: 400})
        }

        const lastMessage = conversation.messages[conversation.messages.length -1]

        if(!lastMessage) {
            return NextResponse.json(conversation)
        }

        const updatedMessages = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        })

        await pusherServer.trigger(currentUser.email, "conversation:update", {
            id: conversationId,
            messages: [updatedMessages]
        })

        if(lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId!, "message:update", updatedMessages)

        return NextResponse.json(updatedMessages)
    } catch (err: unknown) {
        console.log(err, "error_messages_seen")
        return new NextResponse("Internal error", {status: 500})
    }
}