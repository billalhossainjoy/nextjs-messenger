import {type NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";
import {pusherServer} from "@/pusher";


export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        const {message, image, conversationId} = await req.json()

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("unauthorized", {status: 401})
        }

        const newMessage = await  prisma.$transaction(async (tx) => {
            const newMessage = await tx.message.create({
                data: {
                    body: message,
                    image,
                    conversation: {
                        connect: {
                            id: conversationId
                        }
                    },
                    sender: {
                        connect: {
                            id: currentUser.id
                        }
                    },
                    seen: {
                        connect: {
                            id: currentUser.id
                        }
                    }
                },
                include: {
                    seen: true,
                    sender: true
                }
            })

            const updatedConversation = await tx.conversation.update({
                where: {
                    id: conversationId
                },
                data: {
                    lastMessageAt: new Date(),
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                },
                include: {
                    users: true,
                    messages: {
                        include: {
                            seen: true,
                        }
                    }
                }
            })


            await pusherServer.trigger(conversationId, "messages:new", newMessage)

            const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

            updatedConversation.users.map(user => {
                pusherServer.trigger(user.email!, "conversation:update", {
                    id: conversationId,
                    messages: [lastMessage]
                })
            })

            return newMessage
        })


        return NextResponse.json(newMessage)
    } catch (err: unknown) {
        console.log(err, "error messages")
        return new NextResponse("internal error ", {status: 500})
    }
}