import {type NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";


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
                    seen: true
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
                    messages: {
                        include: {
                            seen: true
                        }
                    }
                }
            })

            return newMessage
        })


        return NextResponse.json(newMessage)
    } catch (err: unknown) {
        console.log(err, "error messages")
        return new NextResponse("internal error ", {status: 500})
    }
}