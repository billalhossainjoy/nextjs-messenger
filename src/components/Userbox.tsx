"use client"

import React, {useCallback, useState} from 'react';
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import axios from "axios";
import Avatar from "@/components/avatar";
import LoadingModal from "@/components/loadingModal";

type Props = {
    data: User
};

const UserBox: React.FC<Props> = ({data}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post("/api/conversations", {
            userId: data.id
        }).then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
    }, [data, router])

    return (
       <>
           {
               isLoading && (<LoadingModal  />)
           }
           <div className={"w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer "} onClick={handleClick}>
               <Avatar user={data} />
               <div className={"min-w-0 flex-1"}>
                   <div className={"focus:outline-none"}>
                       <div className={"flex justify-between items-center mb-1"}>
                           <p className={"text-sm font-medium text-gray-900"}>
                               {data.name}
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </>
    );
};

export default UserBox;