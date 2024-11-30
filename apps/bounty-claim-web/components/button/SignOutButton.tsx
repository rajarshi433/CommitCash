"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

const SignOutButton = () => {
    const router = useRouter();

    const handleSubmit = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <>
            <Button
                className="fixed z-[100] flex right-3 top-3 md:right-6 md:top-6 bg-red-600 p-3 py-6 hover:bg-red-800"
                onClick={handleSubmit}
            >
                <BiLogOut style={{ width: "32px", height: "32px" }} />
            </Button>
        </>
    );
};

export default SignOutButton;
