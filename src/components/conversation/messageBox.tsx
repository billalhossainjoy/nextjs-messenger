import React, {useState} from 'react';
import {FullMessageType} from "@/types";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import Avatar from "@/components/avatar";
import {format} from "date-fns";
import Image from "next/image";
import ImageModal from "@/components/imageModal";

type Props = {
    data: FullMessageType;
    isLast?: boolean;
};

const MessageBox: React.FC<Props> = ({data, isLast}) => {
    const session = useSession()
    const [imageModelOpen, setImageModelOpen] = useState(false)
    const isOwn = session?.data?.user?.email === data?.sender?.email
    const seenList = (data.seen || [])
        .filter(user => user.email !== data?.sender?.email)
        .map(user => user.name)
        .join(", ")


    return (
        <div className={cn("flex gap-3 p-4", isOwn && "justify-end")}>
            <div className={cn(isOwn && "order-2")}>
                <Avatar user={data.sender} />
            </div>
            <div className={cn("flex flex-col gap-2",
                isOwn && "items-end")}>
                <div className={"flex items-center gap-1"}>
                    <div className={"text-sm text-gray-500"}>
                        {data?.sender?.name}
                    </div>
                    <div>
                        {format(new Date(data.createAt), "p")}
                    </div>
                </div>
                <div className={cn(
                    "text-sm w-fit overflow-hidden",
                    isOwn ? "bg-sky-500 text-white": "bg-gray-100",
                    data.image ? "rounded-md p-0 bg-white border border-gray-200": "rounded-full py-2 px-3"
                )}>
                    <ImageModal src={data.image} isOpen={imageModelOpen} onClose={() => setImageModelOpen(false)}/>
                    {data.image ? <Image onClick={() => setImageModelOpen(true)} src={data.image} alt={"image"} width={288} height={288} />: <h1>{data.body}</h1> }
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <span className={"text-xs font-light text-gray-500"}>
                        {`seen by ${seenList}`}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MessageBox;