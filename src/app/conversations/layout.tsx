import React from 'react';
import Sidebar from "@/components/sidebar/sidebar";
import ConversationList from "@/components/conversation/conversationList";
import {getConversation} from "@/app/conversations/actions";

type Props = {
    children: React.ReactNode
};
const Layout: React.FC<Props> =async ({children}) => {
    const conversations = await getConversation()

    return (
        <>
            <Sidebar>
                <ConversationList initialItems={conversations} />
                <main className={"h-full"}>
                    {children}
                </main>
            </Sidebar>
        </>
    );
};

export default Layout;