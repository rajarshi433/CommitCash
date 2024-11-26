"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggler() {
    const { setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<string>("dark");

    const onClickHandler = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
        setTheme(currentTheme === "light" ? "dark" : "light");
    };

    return (
        <button onClick={onClickHandler} className="p-4">
            {currentTheme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
        </button>
    );
}
