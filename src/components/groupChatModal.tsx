"use client"

import React, {useState} from 'react';
import {User} from "@prisma/client";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Modal from "@/components/conversation/converstaionModal";
import Input from "@/components/input";
import Select from "@/components/select";
import Button from "@/components/button";

type Props = {
    isOpen: boolean;
    onClose: () => void
    users: User[]
};

const GroupChatModal: React.FC<Props> = ({isOpen, onClose, users}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, setValue, watch,resetField, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    })
    const members = watch("members")

    const onSubmit: SubmitHandler<FieldValues> = (data ) => {
        console.log(data)
        setIsLoading(true)
        axios.post("/api/conversations", {
            ...data,
            isGroup: true
        }).then(() => {
            router.refresh();
            onClose()
            resetField("name");
            setValue("members", null)
            toast.success("Successfully created!")
        }).catch(() => toast.error("something went wrong!"))
            .finally(() => setIsLoading(false))
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className={"py-5"}>
                <div className={"space-y-12"}>
                    <div className={"border-b border-gray-900/10 pb-12"}>
                        <h2 className={"text-base font-semibold leading-7 text-gray-900"}>Create a group chat</h2>
                        <p className={"mt-1 text-sm leading-6 text-gray-600"}>
                            Create a chat with more than 2 people.
                        </p>
                        <Input name={"name"} label={"Name"} register={register} errors={errors} required/>
                        <Select
                                disabled={isLoading}
                                label={"Members"}
                                options={users.map(user => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange = {(value) => setValue("members", value, {shouldValidate: true})}
                                value={members}
                            />
                    </div>
                </div>
                <div className={"mt-6 flex items-center justify-end gap-x-6"}>
                    <Button disabled={isLoading} onClick={onClose} type={"button"} secondary>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type={"submit"}>
                        Create
                    </Button>

                </div>
            </form>
        </Modal>
    );
};

export default GroupChatModal;