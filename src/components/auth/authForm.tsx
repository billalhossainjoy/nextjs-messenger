"use client"
import React, {useCallback, useEffect, useState} from 'react';
import AuthSocialButton from "@/components/auth/authSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";
import LoginForm from "@/components/auth/loginForm";
import SignUpForm from "@/components/auth/signUpForm";
import {signIn, useSession} from "next-auth/react"
import toast from "react-hot-toast";
import {BuiltInProviderType} from "next-auth/providers/index";
import {useRouter} from "next/navigation"

type Variant = "LOGIN" | "REGISTER"

const AuthForm: React.FC = () => {
    const session = useSession()
    const router = useRouter()
    const [_isLoading, setIsLoading] = useState(false)
    const [variant, setVariant] = useState<Variant>("LOGIN")


    const toggleVariant = useCallback(() => setVariant(prev => prev === "LOGIN" ? "REGISTER" : "LOGIN"), []);

    const socialAction = (action: BuiltInProviderType) => {
        setIsLoading(true)
        signIn(action)
            .then(cb => {
                if(cb?.error) toast.error(cb?.error)
                if(cb?.ok) toast.success("Login successfully")
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if(session?.status === "authenticated"){
            router.push("/users")
        }
    }, [session?.status, router]);

    return (<div className={"mt-8 sm:mx-auto sm:w-full sm:max-w-md"}>
        <div className={"bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"}>
            {variant === "LOGIN" ? (<LoginForm/>) : (<SignUpForm/>)}

            <div className={"mt-6"}>
                <div className={"relative"}>
                    <div className={"absolute inset-0 flex items-center"}>
                        <div className={"w-full border-t border-gray-300"}/>
                    </div>
                    <div className={"relative flex justify-center text-sm"}>
                        <span className={"bg-white text-gray-500 px-2"}>Or Continue with </span>
                    </div>
                </div>

                <div className={"mt-6 flex gap-2"}>
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")}/>
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")}/>
                </div>
                <div className={"text-sm flex justify-center gap-2 mt-6 text-gray-500 cursor-pointer"}>
                        <span>
                            {variant === "LOGIN" ? "New to messenger?" : "Aready have an account?"}
                        </span>
                    <span onClick={() => toggleVariant()}>
                            {variant === "LOGIN" ? "Create an account?" : "login your account?"}
                        </span>
                </div>
            </div>
        </div>
    </div>);
};

export default AuthForm;