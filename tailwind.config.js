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
                primary: {
                    300: 'rgb(var(--color-accent-soft-rgb) / <alpha-value>)',
                    400: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    500: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    600: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    700: 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
                },
                accent: {
                    100: 'rgb(var(--color-accent-soft-rgb) / <alpha-value>)',
                    300: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    400: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    500: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                    600: 'rgb(var(--color-info-rgb) / <alpha-value>)',
                },
                pink: {
                    400: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
                    500: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
                    600: 'rgb(var(--color-error-rgb) / <alpha-value>)',
                },
                background: {
                    DEFAULT: 'rgb(var(--color-background-rgb) / <alpha-value>)',
                    secondary: 'rgb(var(--color-background-secondary-rgb) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-background-tertiary-rgb) / <alpha-value>)',
                    surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
                    hover: 'rgb(var(--color-background-secondary-rgb) / <alpha-value>)',
                    active: 'rgb(var(--color-background-tertiary-rgb) / <alpha-value>)',
                },
                foreground: {
                    DEFAULT: 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-text-tertiary-rgb) / <alpha-value>)',
                    muted: 'rgb(var(--color-text-muted-rgb) / <alpha-value>)',
                },
                success: 'rgb(var(--color-success-rgb) / <alpha-value>)',
                warning: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
                error: 'rgb(var(--color-error-rgb) / <alpha-value>)',
                info: 'rgb(var(--color-info-rgb) / <alpha-value>)',
                border: {
                    DEFAULT: 'rgb(var(--color-border-rgb) / <alpha-value>)',
                    light: 'rgb(var(--color-border-light-rgb) / <alpha-value>)',
                },
                gray: {
                    50: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
                    100: 'rgb(var(--color-background-rgb) / <alpha-value>)',
                    200: 'rgb(var(--color-border-rgb) / <alpha-value>)',
                    300: 'rgb(var(--color-border-light-rgb) / <alpha-value>)',
                    400: 'rgb(var(--color-text-muted-rgb) / <alpha-value>)',
                    500: 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
                    600: 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
                    700: 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
                    800: 'rgb(var(--color-background-secondary-rgb) / <alpha-value>)',
                    900: 'rgb(var(--color-background-tertiary-rgb) / <alpha-value>)',
                },
            },
            fontFamily: {
                sans: ['Manrope', 'Segoe UI', 'sans-serif'],
                serif: ['Source Serif 4', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            boxShadow: {
                'glow-primary': '0 16px 40px -22px rgba(15, 118, 110, 0.35)',
                'glow-accent': '0 16px 40px -22px rgba(15, 118, 110, 0.28)',
            },
            borderColor: {
                divider: 'rgb(var(--color-border-rgb) / <alpha-value>)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
