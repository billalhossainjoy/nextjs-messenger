"use client"
import React, {useRef, useState} from 'react';
import {FullMessageType} from "@/types";
import useConversation from "@/hooks/useConversation";
import MessageBox from "@/components/conversation/messageBox";

interface Props{
    initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<Props> = ({initialMessages}) => {
    const [messages, setMessages] = useState(initialMessages)
    const bootomRef = useRef<HTMLDivElement>(null);
    const {conversationId} = useConversation();

    return (
        <div className={"flex-1 overflow-y-auto "}>
            {
                messages.map((message, i) => {
                   return <MessageBox isLast={i === messages.length -1} data={message} key={message.id}/>
                })
            }
            <div ref={bootomRef} className={"pt-24"}></div>
        </div>
    );
};

export default ConversationBody;