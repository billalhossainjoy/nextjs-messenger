import React from 'react';
import {getConversationById, getMessages} from "@/app/conversations/[conversationId]/actions";
import EmptyState from "@/components/empty";
import Header from "@/components/conversation/header";
import ConversationBody from "@/components/conversation/conversationBody";
import MessageInput from "@/components/conversation/messageInput";
interface Params {
    conversationId: string;
}

const Page = async ({params: {conversationId}}: {params: Params}) => {
    const conversation = await getConversationById(conversationId)
    const messages = await getMessages(conversationId)
    if(!conversation) {
        return <div className={"lg:pl-80 h-full"}>
            <div className={"h-full flex flex-col"}>
                <EmptyState />
            </div>
        </div>
    }




    return (
        <div className={"lg:pl-80 h-full "}>
           <div className={"h-full flex flex-col"}>
               <Header conversation={conversation}/>
               <ConversationBody />
               <MessageInput />
           </div>
        </div>
    );
};

export default Page;