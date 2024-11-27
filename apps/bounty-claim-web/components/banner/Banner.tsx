import React from "react";
import { FaCodeFork } from "react-icons/fa6";

const Banner = () => {
    return (
        <div>
            <div className="fixed z-50 w-[calc(100%-2rem)] -translate-x-1/2 bg-white rounded-lg lg:max-w-7xl left-1/2 top-6 p-2">
                <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-start">
                    <a
                        href="#"
                        className="flex justify-center bg-yellow-400 p-2 rounded-md mb-2 sm:mb-0"
                    >
                        <FaCodeFork size={18} className="my-auto" />
                        <span className="text-md font-mono font-extrabold ml-1">
                            CommitCash
                        </span>
                    </a>

                    <div className="h-6 w-[2px] bg-gray-900 sm:mx-3 my-auto hidden sm:block"></div>

                    <p className="flex items-center text-sm md:text-lg text-black font-semibold font-mono my-auto">
                        Please verify your GitHub ID to make sure you are
                        authorized to claim the bounty
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
