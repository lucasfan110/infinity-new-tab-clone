/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            default: ["Roboto", "arial", "sans-serif"],
        },
        extend: {
            colors: {
                "nav-gray": "#656565",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
