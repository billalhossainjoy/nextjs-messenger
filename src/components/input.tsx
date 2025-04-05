"use client"

import React from 'react';
import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";
import clsx from "clsx";

type Props<T extends FieldValues> = {
    name: Path<T>, label: string; register: UseFormRegister<T>; errors: FieldErrors
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues, >({label, name, type, required, register, errors, disabled}: Props<T>) => {
    return (<div>
            <label className={"block text-sm font-medium leading-6 text-gray-900"} htmlFor={name}>
                {label}
            </label>
            <div>
                <input
                    id={name}
                    type={type}
                    autoComplete={name}
                    disabled={disabled}
                    {...register(name, {required})}
                    className={clsx(`
                        block rounded-md border-0 ring-1 w-full py-1.5 text-gray-900 shadow-sm
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 outline-none sm:leading-6 px-3 sm:text-sm
                    `, errors[name] && "focus:ring-rose-500")}
                />
            </div>
        </div>);
};

export default Input;