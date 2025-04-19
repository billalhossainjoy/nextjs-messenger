import React from 'react';
import Modal from "@/components/conversation/converstaionModal";
import Image from "next/image";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    src: string | null;
};
const ImageModal: React.FC<Props> = ({isOpen, onClose, src}) => {

    if(!src) {
        return null
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"w-80 h-80"}>
                <Image src={src} alt={"image"} fill className={"object-contain"}/>
            </div>

        </Modal>
    );
};

export default ImageModal;