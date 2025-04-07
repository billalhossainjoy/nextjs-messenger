"use client"

import React from 'react';
import useRoutes from "@/hooks/useRoutes";
import useConversation from "@/hooks/useConversation";
import MobileFooterItem from "@/components/mobileFooterItem";

const MobileFooter: React.FC = () => {
    const routes = useRoutes()
    const {isOpen} = useConversation()

    if (isOpen) return null

    return (<div className={`
            fixed
            justify-between
            w-full
            bottom-0
            z-40
            flex items-center
            bg-white
            border-gray-300
            border-t-[1px]
            lg:hidden
        `}>
            {routes.map(route => <MobileFooterItem
                href={route.href}
                key={route.label}
                label={route.label}
                icon={route.icon}
                active={route.active}
                onClick={route.onClick}
            />)}


        </div>);
};

export default MobileFooter;