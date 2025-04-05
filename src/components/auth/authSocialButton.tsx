import React from 'react';
import {IconType} from "react-icons";

type Props = {
    icon: IconType;
    onClick:() => void
};

const AuthSocialButton: React.FC<Props> = ({icon: Icon, onClick}) => {
    return (
        <button onClick={onClick} className={"w-full ring-1 shadow-sm  py-1.5 rounded-md flex justify-center ring-gray-300 text-gray-500 cursor-pointer hover:bg-gray-100"}>
            <Icon />
        </button>
    );
};

export default AuthSocialButton;