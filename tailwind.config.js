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
                // Core Brand Colors - Logo Purple
                primary: {
                    50: '#f5f3ff', // Lightest
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa', // Primary Light
                    500: '#8b5cf6', // Primary Hover
                    600: '#764AF1', // Logo Purple (Main Brand)
                    700: '#5B2DCF', // Primary Active
                    800: '#3D1A99', // Primary Dark
                    900: '#2e1065',
                    950: '#1e0a45',
                },
                // Accent Colors - Neon Cyan
                accent: {
                    50: '#ecfeff',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee', // Cyan Hover
                    500: '#06B6D4', // Neon Cyan (AI Highlight)
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                    950: '#083344',
                },
                // Accent Pink - Secondary Accent
                pink: {
                    400: '#f472b6', // Pink Hover
                    500: '#ec4899', // Hot Pink (CTAs)
                    600: '#db2777',
                },
                // Dark Theme Background Colors (Slate)
                background: {
                    DEFAULT: '#0F172A', // Slate 900 (Primary Background)
                    secondary: '#1E293B', // Slate 800 (Secondary Background)
                    tertiary: '#020617', // Slate 950 (Tertiary/Absolute Deep)
                    surface: 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity
                    hover: 'rgba(51, 65, 85, 0.8)', // Slate 700 with opacity
                    active: 'rgba(71, 85, 105, 0.9)', // Surface Active
                },
                // Text Colors (Slate)
                foreground: {
                    DEFAULT: '#F8FAFC', // Slate 50 (Primary Text)
                    secondary: '#CBD5E1', // Slate 300 (Secondary Text)
                    tertiary: '#94A3B8', // Slate 400 (Tertiary Text)
                    muted: '#64748B', // Slate 500 (Muted Text)
                },
                // Status Colors
                success: '#10B981', // Emerald
                warning: '#F59E0B', // Amber
                error: '#EF4444', // Red
                info: '#3B82F6', // Blue
                // Border Colors
                border: {
                    DEFAULT: 'rgba(255, 255, 255, 0.08)', // Default Border
                    light: 'rgba(255, 255, 255, 0.12)', // Highlighted Border
                },
                // Gray scale (Slate)
                gray: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(118, 74, 241, 0.3)', // Logo Purple
                'glow-accent': '0 0 20px rgba(6, 182, 212, 0.3)', // Neon Cyan
            },
            borderColor: {
                divider: 'rgba(255, 255, 255, 0.06)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
