import {getCurrentUser} from "@/app/actions";
import {prisma} from "@/lib/prisma";

export const getConversation = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser?.id) {
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return conversations;
    } catch (err: unknown) {
        return []
    }
}

