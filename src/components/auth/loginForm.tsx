"use client"

import React, {useState} from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import { SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, LoginSchemaType} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react"
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((cb) => {
            if(cb?.error) {
                toast.error(cb?.error ?? "Invalid credentials..")
            }

            if(cb?.ok) {
                toast.success("Login successfully")
            }
        }).finally(() => setIsLoading(false))
    }


    return (
        <div>
            <form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
                <Input<LoginSchemaType> name={"email"} type={"email"} label={"Email"} register={register} errors={errors}/>
                <Input<LoginSchemaType> name={"password"} type={"password"} label={"Password"} register={register} errors={errors}/>
                <Button fullWidth disabled={isLoading}>{"Login"}</Button>
            </form>
        </div>
    );
};

export default LoginForm;