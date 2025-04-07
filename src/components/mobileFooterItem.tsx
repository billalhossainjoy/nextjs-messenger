import React from 'react';
import {IconType} from "react-icons";
import Link from "next/link";
import {cn} from "@/lib/utils";

type Props = {
    key: string;
    href: string;
    label: string;
    icon: IconType;
    active?: boolean;
    onClick?: () => void;
};

const MobileFooterItem: React.FC<Props> = ({
    icon: Icon,
    active,
    onClick,
    href,
    label
}) => {
    const handleClick = () => {
        if(onClick) return onClick()
    }

    return (
        <Link onClick={handleClick} href={href} className={cn(`
            group flex gap-x-3 text-sm leading-6 font-semibold
            w-full justify-center
            p-4 text-gray-500 hover:text-black hover:bg-gray-100
        `,
            active && "bg-gray-100 text-black"
        )}>
            <Icon className={"h-6 w-6"}/>
            <span className={"sr-only"}>{label}</span>
        </Link>
    );
};

export default MobileFooterItem;