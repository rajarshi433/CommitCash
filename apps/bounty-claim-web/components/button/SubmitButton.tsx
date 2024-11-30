import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <>
            <button
                type="submit"
                value="Save"
                className="border border-white ml-2 bg-black p-2 disabled:bg-red-950"
                disabled={pending}
            >
                submit
            </button>

            {pending && <div className="text-white text-3xl">Loading....</div>}
        </>
    );
};

export default SubmitButton;
