import React from "react";
import { PiProhibitFill } from "react-icons/pi";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Unauthorised = async () => {
    return (
        <>
            <AlertDialog open={true}>
                <AlertDialogContent className="bg-neutral-950 w-[calc(100%-2rem)]">
                    <AlertDialogHeader className="flex items-center gap-4">
                        <AlertDialogTitle>
                            <PiProhibitFill
                                color="red"
                                style={{ width: "72px", height: "72px" }}
                            />
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-white font-mono text-xl">
                            Your dont have any active bounty to claim or you are
                            unauthorised to claim any bounty
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Unauthorised;
