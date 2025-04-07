import {usePathname} from "next/navigation";
import useConversation from "@/hooks/useConversation";
import {useMemo} from "react";
import {HiChat} from "react-icons/hi";
import {HiArrowLeftOnRectangle, HiUsers} from "react-icons/hi2";
import {signOut} from "next-auth/react";


const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation()

    return useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathname === "/conversation" || !!conversationId
        }, {
            label: "Users",
            href: "/users",
            icon: HiUsers,
            active: pathname === "/users"
        }, {
            label: "Logout",
            href: "/",
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut()
        },
    ], [pathname])
}

export default useRoutes