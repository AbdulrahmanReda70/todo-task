/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.ts",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,vue}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
