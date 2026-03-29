/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                main: '#0f1c2e',
                dimm: '#18304a',
                sub: '#5d8aa8',
                sub_dimm: '#e8f2ff',
                strong: '#e8823f',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 0 3px #e8823f, 0 0 20px rgba(232,130,63,0.2)' },
                    '50%': { boxShadow: '0 0 0 3px #e8823f, 0 0 30px rgba(232,130,63,0.4)' },
                },
            },
        }
    },
    plugins: [],
}
