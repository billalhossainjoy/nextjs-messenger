"use client"

import React, {useState} from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import { SubmitHandler, useForm} from "react-hook-form";
import {signUpSchema, SignUpSchemaType} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";

const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        setIsLoading(true)

    }


    return (
        <div>
            <form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
                <Input<SignUpSchemaType> name={"name"} type={"text"} label={"name"} register={register} errors={errors}/>
                <Input<SignUpSchemaType> name={"email"} type={"email"} label={"Email"} register={register} errors={errors}/>
                <Input<SignUpSchemaType> name={"password"} type={"password"} label={"Password"} register={register} errors={errors}/>
                <Button fullWidth disabled={isLoading}>{"Sign Up"}</Button>
            </form>
        </div>
    );
};

export default LoginForm;