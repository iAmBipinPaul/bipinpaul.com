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
                // Core Brand Colors - Quantum Purple
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#3B21B8', // Primary Hover
                    500: '#4B2AE8', // Quantum Purple (Main Brand)
                    600: '#24124D', // Primary Dark (Deep Nebula)
                    700: '#1e1040',
                    800: '#180d33',
                    900: '#120a26',
                    950: '#0a0515',
                },
                // Accent Teal - Spectral Teal
                accent: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#12C7B7', // Spectral Teal (Primary Accent)
                    500: '#12C7B7',
                    600: '#0fa89a',
                    700: '#0d8a7f',
                    800: '#0a6b63',
                    900: '#084d47',
                },
                // Neural Lime - Secondary Accent
                lime: {
                    400: '#89F227',
                    500: '#89F227', // Neural Lime
                    600: '#6fc21f',
                },
                // Dark Theme Background Colors
                background: {
                    DEFAULT: '#0B1020', // Obsidian Ink (Primary Background)
                    secondary: '#2A3142', // Graphite (Secondary Background)
                    surface: '#2A3142', // Cards, Panels
                    hover: '#5B6477', // Slate (Surface Hover)
                },
                // Text Colors
                foreground: {
                    DEFAULT: '#FFFFFF', // Pure White (Primary Text)
                    secondary: '#F3F6FB', // Cloud (Secondary Text)
                    tertiary: '#D8DEE8', // Mist (Tertiary Text)
                    muted: '#5B6477', // Slate (Muted Text)
                },
                // State Colors
                success: '#89F227', // Neural Lime
                warning: '#FFB020', // Ion Amber
                error: '#F24B86', // Infra Magenta
                // Border Colors
                border: {
                    DEFAULT: '#2A3142', // Graphite Border
                    light: '#5B6477', // Slate Border
                },
                // Gray scale for compatibility
                gray: {
                    50: '#F3F6FB',
                    100: '#D8DEE8',
                    200: '#b8c0d0',
                    300: '#98a2b8',
                    400: '#5B6477', // Slate
                    500: '#4a5568',
                    600: '#3d4556',
                    700: '#2A3142', // Graphite
                    800: '#1a2030',
                    900: '#0f1520',
                    950: '#0B1020', // Obsidian Ink
                },
            },
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(75, 42, 232, 0.3)',
                'glow-accent': '0 0 20px rgba(18, 199, 183, 0.3)',
            },
            borderColor: {
                divider: 'rgba(255, 255, 255, 0.08)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
