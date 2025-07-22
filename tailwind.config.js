/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./Components/**/*.{razor,html,css}",
        "./wwwroot/**/*.html",
        "./**/*.razor"
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand colors from SVG
                primary: {
                    50: '#f0fdf8',
                    100: '#dcfce9',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#66D4A3', // Light green from SVG
                    500: '#0CAC5C', // Main green from SVG
                    600: '#0a9c52',
                    700: '#087843',
                    800: '#075d35',
                    900: '#064e2d',
                    950: '#022c1a',
                },
                // Eye-friendly greens for dark theme
                sage: {
                    50: '#f6f8f6',
                    100: '#e8f0e8',
                    200: '#d1e1d1',
                    300: '#a8c8a8',
                    400: '#8FA68F', // Light sage green
                    500: '#7FB069', // Soft olive green (RECOMMENDED)
                    600: '#6B8F71', // Sage green with gray undertones
                    700: '#5a7a5a',
                    800: '#4a634a',
                    900: '#3d523d',
                },
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#66B2B2', // Medium teal-green (VERY EYE-FRIENDLY)
                    600: '#5C9B9B', // Dark teal
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                // Gray scale matching SVG
                gray: {
                    50: '#fafafa',
                    100: '#F5F5F5', // Secondary light from SVG
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#474747', // Medium gray from SVG
                    800: '#2D2D2D', // Main background from SVG
                    900: '#171717',
                    950: '#0a0a0a',
                },
                // Additional semantic colors
                background: {
                    DEFAULT: '#2D2D2D',
                    secondary: '#474747',
                },
                foreground: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F5F5F5',
                    muted: '#a3a3a3',
                }
            },
            fontFamily: {
                sans: ['Arial', 'sans-serif'],
                mono: ['Consolas', 'monospace'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}