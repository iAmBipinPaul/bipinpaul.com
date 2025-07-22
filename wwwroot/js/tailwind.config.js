module.exports = {
    content: [
        "./**/*.{razor,html,cshtml,cs}",
        "./Components/**/*.{razor,cs}",
        "./wwwroot/**/*.{html,js}"
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
    plugins: [],
}