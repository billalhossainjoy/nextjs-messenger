import React from 'react';
import {IconType} from "react-icons";
import Link from "next/link";
import clsx from "clsx";
import {cn} from "@/lib/utils";

type Props = {
    key: string;
    href: string;
    label: string;
    icon: IconType;
    active?: boolean;
    onClick?: () => void;
};


const DesktopItem: React.FC<Props> = ({
    label,
    icon : Icon,
    href,
    onClick,
    active
}) => {

    const handleClick = ()=> {
        if(onClick) {
            return onClick()
        }
    }
    return (
        <li onClick={handleClick}>
            <Link href={href} className={cn(`
            group 
            flex 
            gap-x-3
            rounded-md
            p-3
            text-lg
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100
            `,
            active && "bg-gray-100 text-black",

            )}>
                <Icon className={"h6 w-6 shrink-0"}/>
                <span className={"sr-only"}>{label}</span>
            </Link>
        </li>
    );
};

export default DesktopItem;