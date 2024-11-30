"use client";

import { submitBountyClaims } from "@/actions/submitBountyClaims";
import SignOutButton from "@/components/button/SignOutButton";
import SubmitButton from "@/components/button/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { FaCircleInfo } from "react-icons/fa6";

const initialState = {
    message: "PENDING",
};

const BankCreds = () => {
    const [errorState, action] = useFormState(submitBountyClaims, initialState);
    const { toast } = useToast();
    const router = useRouter();
    const session = useSession();
    const formRef = useRef<HTMLFormElement>(null);

    const totalBounties = session.data?.user.bounties.length as number;

    useEffect(() => {
        if (errorState.message === "SUCCESS") {
            formRef.current?.reset();

            signOut({ redirect: false }).then(() => {
                router.push("/");
            });
            toast({
                title: "Success!!!",
                variant: "default",
                className:
                    "font-mono font-semibold text-xl text-white bg-[#22B357] border-none",
            });
        } else if (errorState.message === "ERROR") {
            toast({
                title: "An error has occurred. Try again",
                variant: "destructive",
                className: "font-mono font-semibold text-xl",
            });
        }

        if (errorState.message !== "PENDING") {
            errorState.message = "PENDING";
        }
    }, [toast, router, errorState]);

    return (
        <div className="flex flex-col items-center mt-[-8rem] sm:mt-[-10rem] w-[calc(100%-2rem)] h-fit">
            <div className="font-mono text-center">
                <span className="text-sm sm:text-lg">
                    You have{" "}
                    <span className="bg-red-600 py-1 px-2 rounded-sm">
                        {totalBounties}
                    </span>{" "}
                    {totalBounties < 2 ? "bounty" : "bounties"} to claim. 🎉
                    Please claim by providing your bank credentials
                </span>

                <p className="flex flex-col lg:flex-row items-center gap-2 mb-10 mt-1 bg-emerald-700 px-2 py-2  text-base rounded-sm font-semibold">
                    <FaCircleInfo style={{ width: "24px", height: "24px" }} />{" "}
                    If you have more than one bounty to claim, after claiming
                    one LogOut and LogIn again to claim the next one
                </p>
            </div>
            <form action={action} ref={formRef} className="flex flex-col">
                <input
                    name="acn"
                    type="text"
                    placeholder="Account Number"
                    className="text-black"
                />
                <SubmitButton />
            </form>

            <SignOutButton />
        </div>
    );
};

export default BankCreds;
