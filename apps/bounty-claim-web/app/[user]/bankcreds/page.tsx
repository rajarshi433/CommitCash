"use client"

import { submitBountyClaims } from "@/actions/submitBountyClaims";
import { useFormState } from "react-dom";

const BankCreds = () => {
    const [error, action, isPending] = useFormState(submitBountyClaims, null);

    return (
        <>
            <form action={action}>
                <input
                    name="acn"
                    type="text"
                    placeholder="Account Number"
                    className="text-black"
                />
                <button
                    type="submit"
                    value="Save"
                    className="border border-white ml-2"
                    disabled={isPending}
                >
                    submit
                </button>

                {isPending && <p className="text-white text-3xl">Loading....</p>}
                {error && <p>{JSON.stringify(error)} </p>}
            </form>
        </>
    );
};

export default BankCreds;
