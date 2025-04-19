"use client"
import React, {useState} from 'react';
import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "@/components/sidebar/desktopItem";
import {User} from "@prisma/client";
import Avatar from "@/components/avatar";
import SettingsModal from "@/components/settingsModal";

interface Props {
    currentUser: User
}

const DesktopSidebar: React.FC<Props> = ({currentUser}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} currentUser={currentUser}/>
        <div className={`
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:border-r-[1px]
            lg:border-gray-200
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
        `}>
            <nav className={"mt-4 flex flex-col justify-between"}>
                <ul role="list" className={"flex flex-col items-center space-y-1"}>
                    {routes.map(route => (<DesktopItem
                        label={route.label}
                        active={route.active}
                        href={route.href}
                        icon={route.icon}
                        key={route.label}
                        onClick={route.onClick}
                    />))}
                </ul>
            </nav>
            <nav className={`
                mt-4 
                flex
                flex-col
                justify-between
                items-center
            `}>
                <div className={"cursor-pointer hover:opacity-75 transition"} onClick={() => setIsOpen(true)}>
                    <Avatar user={currentUser}/>
                </div>
            </nav>
        </div>
    </>);
};

export default DesktopSidebar;