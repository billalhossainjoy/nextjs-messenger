"use client"
import React, {useMemo} from 'react';
import {Conversation, User} from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@/components/avatar";

type Props = {
    conversation: Conversation & {
        users: User[]
    }
};
const Header: React.FC<Props> = ({conversation}) => {
    const otherUser = useOtherUser(conversation)

    const statusText = useMemo(() => {
        if(conversation.isGroup) {
            return `${conversation.users.length} members`
    }
        return "Active"
    },[conversation])

    return (
        <div className={`
            bg-white
            w-full
            flex
            border-b-[1px]
            border-gray-200
            sm:px-4
            py-3
            px-4
            lg:px-6
            justify-between
            items-center
            shadow-sm
        `}>
            <div className={"flex gap-3 items-center"}>
                <Link href={"/conversations"} className={"lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"}>
                    <HiChevronLeft size={28}/>
                </Link>
                <Avatar user={otherUser} />
                <div>
                    <h1>
                        {conversation.name || otherUser.name}
                    </h1>
                    <span className={"text-sm font-light text-neutral-500"}>{statusText}</span>
                </div>
            </div>

            <HiEllipsisHorizontal size={28} onClick={() => {}} className={" text-sky-500 cursor-pointer hover:text-sky-600 transition"}/>
        </div>
    );
};

export default Header;