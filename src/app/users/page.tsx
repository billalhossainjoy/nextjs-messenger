import React from 'react';
import EmptyState from "@/components/empty";

const Page: React.FC = () => {
    return (
        <div className={"hidden lg:block lg:pl-80 h-full"}>
            <EmptyState />
        </div>
    );
};

export default Page;