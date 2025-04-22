"use client"

import React, {useCallback, useMemo} from 'react';
import {useRouter} from "next/navigation";
import {FullConversationType} from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import Avatar from "@/components/avatar";
import {format} from "date-fns";
import AvatarGroup from "@/components/avatarGroup";

type Props = {
    data:FullConversationType;
    selected: boolean;
};
const ConversationBox: React.FC<Props> = ({data, selected}) => {
    const router = useRouter()
    const otherUser = useOtherUser(data)
    const session = useSession()


    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    },[data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    },[session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || []
        if(!userEmail) {
            return false;
        }

        return seenArray.filter(user => user.email !== userEmail)
    }, [lastMessage, userEmail])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image) {
            return "Sent an image"
        }
        if(lastMessage?.body) {
            return lastMessage.body
        }

        return "Started a conversation"
    },[lastMessage])




    return (
        <div onClick={handleClick} className={cn(`
            w-full
            relative
            flex
            items-center
            space-x-3
            hover:bg-neutral-100
            rounded-lg
            cursor-pointer
            p-2
        `,
            selected ? "bg-neutral-100": "bg-white",
            )}>
            {data.isGroup ? (
                <AvatarGroup users={data.users}/>
            ): (<Avatar user={otherUser} />)}
            <div className={"min-w-0 flex-1"}>
                <div className={"focus:outline-none"}>
                    <div className={"flex justify-between items-center mb-1"}>
                        <p className={"text-md font-semibold text-gray-900"}>
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createAt && (
                            <p className={"text-xs text-gray-400 font-light"}>
                                {format(new Date(lastMessage.createAt), "p")}
                            </p>
                        )}
                    </div>
                    <p className={cn("truncate text-sm",
                        hasSeen ? "text-gray-500 font-medium": "text-black"
                        )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;