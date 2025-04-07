import React from 'react';
import {User} from "@prisma/client";
import UserBox from "@/components/Userbox";

type Props = {
    items: User[]
};

const UserList: React.FC<Props> = ({items}) => {
    return (
        <aside className={`
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-hidden
            border-r
            border-gray-200
            block
            w-full
            left-0
        `}>
            <div className={"px-5"}>
                <div className={"flex-col"}>
                    <h1 className={"text-2xl font-bold text-neutral-800 py-4"}>
                        Users
                    </h1>
                </div>
                {
                    items.map(item => <UserBox key={item.id} data={item}/>)
                }
            </div>
        </aside>
    );
};

export default UserList;