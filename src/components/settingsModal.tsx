"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Modal from "@/components/conversation/converstaionModal";
import Input from "@/components/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/components/button";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
};

const SettingsModal: React.FC<Props> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleImageChange = (image: any) => {
    setValue("image", image?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <h2 className={"text-lg font-medium leading-6 text-gray-900"}>
              Profile
            </h2>
            <p className={"mt-1 text-sm text-gray-500"}>
              Change your profile information
            </p>
            <div className={"mt-10 flex flex-col gap-y-8"}>
              <Input
                name={"name"}
                label={"Name"}
                register={register}
                errors={errors}
              />
              <div className={""}>
                <label
                  className={
                    "block text-sm font-medium leading-6 text-gray-900"
                  }
                >
                  Photo
                </label>
                <div
                  className={
                    "mt-2 flex items-center justify-center flex-col gap-6"
                  }
                >
                  <div
                    className={
                      "bg-gray-200 shadow-lg rounded-full border-[1px] border-gray-200 w-14 h-14 relative overflow-hidden"
                    }
                  >
                    <Image
                      fill
                      src={image || "/images/avatar.png"}
                      alt={"avatar"}
                      className={""}
                    />
                  </div>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleImageChange}
                    uploadPreset="nextjs-messenger"
                  >
                    <span className={"cursor-pointer bg-sky-500 rounded-xl py-2 px-4 text-white"}>Change</span>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className={"mt-6 flex items-center justify-end gap-x-6"}>
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button type={"submit"} disabled={isLoading}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
