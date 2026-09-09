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
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
                serif: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'Consolas', 'monospace'],
            },
            boxShadow: {
                sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
                DEFAULT: '0 1px 2px rgba(15, 23, 42, 0.05)',
                md: '0 1px 2px rgba(15, 23, 42, 0.05)',
                lg: '0 8px 24px rgba(15, 23, 42, 0.08)',
            },
            borderColor: {
                divider: 'rgb(var(--color-border-rgb) / <alpha-value>)',
                strong: 'rgb(var(--color-border-strong-rgb) / <alpha-value>)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
