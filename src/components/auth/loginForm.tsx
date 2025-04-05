"use client"

import React, {useState} from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, LoginSchemaType} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";

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