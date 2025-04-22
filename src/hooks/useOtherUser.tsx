'use client';

import {useSession} from "next-auth/react";
import {useMemo} from "react";
import {Conversation, User} from "@prisma/client";

const useOtherUser = (conversation: Conversation & {users: User[]})=> {
    const session = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;

        return conversation.users.filter(user => user.email !== currentUserEmail)

    }, [session?.data?.user?.email, conversation.users]);

    return otherUser[0]
}

export default useOtherUser