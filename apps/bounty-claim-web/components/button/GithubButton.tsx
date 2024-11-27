"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const GithubButton = () => {
    const handleOnclick = async () => {
        await signIn("github");
    };

    return (
        <>
            <Button
                className="bg-[#22B357] text-white hover:bg-[#239a4e] h-fit w-fit"
                onClick={handleOnclick}
            >
                <FaGithub style={{ width: "32px", height: "32px" }} />
                <span className="text-xl font-semibold py-2 font-mono">
                    Verify GitHub
                </span>
            </Button>
        </>
    );
};

export default GithubButton;
