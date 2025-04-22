import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                inter: ["var(--font-inter)"],
                robotoMono: ["var(--font-robot-mono)"],
            },
        },
    },
};

export default config;
