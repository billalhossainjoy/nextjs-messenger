import {NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser()
        const {userId, isGroup, members, name} = await req.json()

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("unauthorized", {status: 401})
        }

        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse("invalid data", {status: 400})
        }

        if(isGroup) {
            const newConversatin = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: {value: string}) => ({id: member.value}) ),
                            {id: currentUser.id}
                        ]
                    }
                },
                include:{
                    users: true
                }
            })

            return NextResponse.json(newConversatin)
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })

        const singleConversation = existingConversations[0]

        if(singleConversation) {
            return NextResponse.json(singleConversation)
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newConversation)
    } catch (err: unknown) {

    }

}