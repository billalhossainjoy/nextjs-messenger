"use client"

import React from 'react';
import {signOut} from "next-auth/react";

const Page: React.FC = () => {
    return (
        <div>
            home page
            <h1 onClick={() => signOut()}>logout</h1>
        </div>
    );
};

export default Page;