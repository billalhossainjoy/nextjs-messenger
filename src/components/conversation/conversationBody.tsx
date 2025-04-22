"use client"
import React, {useEffect, useRef, useState} from 'react';
import {FullMessageType} from "@/types";
import useConversation from "@/hooks/useConversation";
import MessageBox from "@/components/conversation/messageBox";
import axios from "axios";
import {pusherClient} from "@/pusher";
import {find} from "lodash";

interface Props{
    initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<Props> = ({initialMessages}) => {
    const [messages, setMessages] = useState(initialMessages)
    const bootomRef = useRef<HTMLDivElement>(null);
    const {conversationId} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);


    useEffect(() => {
        pusherClient.subscribe(conversationId);


        const messageHndler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages(current => {
                if(find(current, {id: message.id})) {
                    return current
                }

                return [...current, message]
            })

        }

        pusherClient.bind("messages:new", messageHndler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind("messages:new", messageHndler)
        }

    }, [conversationId]);

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