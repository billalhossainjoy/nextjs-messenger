"use client"

import React from 'react';
import useConversation from "@/hooks/useConversation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {HiPaperAirplane, HiPhoto} from "react-icons/hi2";
import {CldUploadButton} from "next-cloudinary";

const MessageInput: React.FC = () => {
    const {conversationId} = useConversation()

    const {register, handleSubmit, setValue} = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", {shouldValidate: true})
        axios.post("/api/messages",{
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post("/api/messages",{
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className={"p-4 bg-white border-t border-gray-200 flex items-center gap-2 lg:gap-4 w-full"}>
            <CldUploadButton options={{maxFiles:1}} onSuccess={handleUpload} uploadPreset="nextjs-messenger">
                <HiPhoto size={30} className={"text-sky-500"}/>
            </CldUploadButton>
            <div className={"relative w-full"}>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"} className={"flex w-full items-center gap-2 lg:gap-4"}>
                    <input id={"message"} type={"text"} {...register("message")}
                           placeholder={"Write your message"}
                           className={`
                    text-black
                    font-light
                    py-2
                    px-4
                    bg-neutral-100
                    w-full rounded-full
                    focus:outline-none
                    placeholder:font-semibold
                    placeholder:opacity-75
                    h-full
                `}/>
                <button className={"h-full rounded-full bg-sky-500 p-2"}>
                    <HiPaperAirplane className={"text-white"} size={18}/>
                </button>
                </form>

            </div>
        </div>
    );
};

export default MessageInput;