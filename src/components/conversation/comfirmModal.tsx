import React, {useCallback, useState} from 'react';
import Modal from "@/components/conversation/converstaionModal";
import {useRouter} from "next/navigation";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import {FiAlertTriangle} from "react-icons/fi";
import {DialogTitle} from "@headlessui/react";
import Button from "@/components/button";

type Props = {
    isOpen: boolean; onClose: () => void;
};

const ComfirmModal: React.FC<Props> = ({isOpen, onClose}) => {
    const router = useRouter()
    const {conversationId} = useConversation()
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                router.push("/conversations")
                router.refresh()
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
    }, [router,conversationId])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"sm:flex sm:items-start py-2"}>
                <div className={"mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"}>
                    <FiAlertTriangle className={"h-6 w-6 text-red-600"} />
                </div>
                <div className={"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"}>
                           <DialogTitle as={"h2"} className={"text-base font-semibold leading-6 text-gray-900"}>
                                 Delete conversation
                           </DialogTitle>
                    <div className={"mt-2"}>
                        <p>
                            Are you sure you want to delete this conversation? This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className={"mt-5 sm:mt-4 flex flex-row-reverse "}>
                <Button disabled={isLoading} danger onClick={onDelete}>
                    Delete
                </Button>
                <Button disabled={isLoading} secondary onClick={onClose}>
                    cancel
                </Button>
            </div>
        </Modal>
    );
};

export default ComfirmModal;