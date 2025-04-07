"use client"

import React, {useState} from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {signUpSchema, SignUpSchemaType} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

const SignUpForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema), defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        setIsLoading(true)
        axios.post("/api/register", data).then(() => {
            toast.success("Register successfully")
            signIn("credentials", {
                ...data,
                redirect: false
            })
        }).catch(err => toast.error(err.response.data)).finally(() => setIsLoading(false))

    }

    return (<div>
            <form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
                <Input<SignUpSchemaType> name={"name"} type={"text"} label={"name"} register={register}
                                         errors={errors}/>
                <Input<SignUpSchemaType> name={"email"} type={"email"} label={"Email"} register={register}
                                         errors={errors}/>
                <Input<SignUpSchemaType> name={"password"} type={"password"} label={"Password"} register={register}
                                         errors={errors}/>
                <Button fullWidth disabled={isLoading}>{"Sign Up"}</Button>
            </form>
        </div>);
};

export default SignUpForm;