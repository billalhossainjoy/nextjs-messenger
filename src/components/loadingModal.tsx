"use client"
import React, {Fragment} from "react";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {ClipLoader} from "react-spinners";

const LoadingModal: React.FC = () => {
    return (
        <Transition show as={Fragment}>
            <Dialog
                as={"div"}
                open
                onClose={() => {}}
                className={"relative z-50"}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={"fixed inset-0 bg-gray-100/50 transition-opacity"} />
                </TransitionChild>
                <div className={
                    "fixed inset-0 z-10 overflow-y-auto"
                }>
                    <div className={"flex min-h-full justify-center p-4 items-center"}>
                        <DialogPanel>
                            <ClipLoader size={40} color={"#0284c7"} />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>


        </Transition>
    );
};

export default LoadingModal;