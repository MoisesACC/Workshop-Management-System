/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#d80327",
                "primary-dark": "#b0021f",
                "background-light": "#f8f5f6",
                "background-dark": "#0b0b0b",
                "surface-dark": "#1a1a1a",
                "surface-darker": "#0d0d0d",
                "surface-light": "#ffffff",
                "accent-red": "#230f12",
                "accent-surface": "#2c1518",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            },
            container: {
                center: true,
                padding: '2rem',
            },
        },
    },
    plugins: [],
}
