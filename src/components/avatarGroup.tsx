import React from 'react';
import {User} from "@prisma/client";
import Image from "next/image";
import {cn} from "@/lib/utils";

type Props = {
    users: User[]
};

const AvatarGroup: React.FC<Props> = ({users}) => {
    const slicedUsers = users.slice(0,3)
    const postionMap = {
        0: "top-0 left-[12px]",
        1: "bottom-0 ",
        2: "bottom-0 right-0"
    }

    return (
        <div
            className={"relative h-11 w-11"}
        >
            {
                slicedUsers.map((user, i) => (
                    <div key={user.id} className={cn("absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]",
                        postionMap[i as keyof typeof postionMap]
                    ) }>
                        <Image src={user?.image || "/images/avatar.png"} alt={"avatar"} fill/>
                    </div>
                ))
            }
        </div>
    );
};

export default AvatarGroup;