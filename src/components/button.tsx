"use client"

import React from 'react';
import clsx from "clsx";

type Props = {
    children: React.ReactNode,
    onClick?: () => void,
    fullWidth?: boolean,
    secondary?: boolean,
    danger?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({children, onClick, fullWidth,danger, secondary, ...rest}) => {
    const {disabled} = rest
    return (
        <button onClick={onClick} {...rest} className={clsx("flex justify-center rounded-md px-3 p-2 cursor-pointer text-sm font-semibold focus-visible:outline focus-visible:outline-offset-2",
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            secondary ? "text-gray-900": "text-white",
            danger && "opacity-100",
            !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}>
            {children}
        </button>
    );
};

export default Button;