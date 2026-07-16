import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			jakartaSans: [
  				'var(--font-plus-jakarta)'
  			],
  			mono: [
  				'var(--font-ibm-plex-mono)',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Consolas',
  				'monospace'
  			]
  		},
  		maxWidth: {
  			'7xl': '1312px'
  		},
  		screens: {
  			xl: '1440px'
  		},
  		colors: {
  			// Brand Colors - Primary — DS forest scale (re-anchored: #083F19 = 800)
  			'brand-green': {
  				50: '#F0F8F2',
  				100: '#DBF0E0',
  				200: '#A7DEB4',
  				300: '#6FC585',
  				400: '#3FA85B',
  				500: '#21873F',
  				600: '#166B30',
  				700: '#0E5424',
  				800: '#083F19',  // ★ brand primary
  				900: '#052B11',
  				950: '#04210C',
  			},
  			// Override Tailwind's default green + emerald → DS forest, so the
  			// ~180 existing stock `green-*` usages adopt the brand tone with
  			// zero per-file edits. Full 50→950 (partial would fall back to
  			// stock emerald per v3 deep-merge). See design plan.
  			green: {
  				50: '#F0F8F2',
  				100: '#DBF0E0',
  				200: '#A7DEB4',
  				300: '#6FC585',
  				400: '#3FA85B',
  				500: '#21873F',
  				600: '#166B30',
  				700: '#0E5424',
  				800: '#083F19',
  				900: '#052B11',
  				950: '#04210C',
  			},
  			emerald: {
  				50: '#F0F8F2',
  				100: '#DBF0E0',
  				200: '#A7DEB4',
  				300: '#6FC585',
  				400: '#3FA85B',
  				500: '#21873F',
  				600: '#166B30',
  				700: '#0E5424',
  				800: '#083F19',
  				900: '#052B11',
  				950: '#04210C',
  			},
  			// Brand Colors - Secondary (Orange for highlights)
  			'brand-orange': {
  				500: '#C46617',
  				600: '#b55a12',
  			},
  			// ── Centra Biotech Design System ──────────────────────────
  			// Exact CTA/brand hue (DS green-800). Use `bg-brand` for the
  			// forest-green primary CTA; the `green` scale carries the tone.
  			brand: {
  				DEFAULT: '#083F19',
  				hover: '#0E5424',
  				active: '#052B11',
  				on: '#FFFFFF',
  			},
  			// Leaf lime — vitality accent (eyebrows, high-energy CTAs)
  			lime: {
  				100: '#EDF6D6',
  				200: '#D8EBAC',
  				300: '#BDDE7E',
  				400: '#97C93D',
  				500: '#7CB518',
  				600: '#5E9E1E',
  				700: '#4A7E14',
  			},
  			// Harvest gold — warmth, premium, certification
  			gold: {
  				100: '#FBEFD2',
  				200: '#F7DFA6',
  				400: '#EFC15E',
  				500: '#E2A526',
  				600: '#C98A12',
  				700: '#A8730C',
  			},
  			// Earth / soil — supporting warm tone
  			earth: {
  				100: '#EFE6D5',
  				300: '#C2A87E',
  				500: '#8A6D3B',
  				700: '#6B4F2E',
  			},
  			// Warm green-tinted neutrals (never pure gray)
  			stone: {
  				50: '#F9FAF5',
  				100: '#F2F4EC',
  				150: '#EBEDE5',
  				200: '#E0E3D8',
  				300: '#C4C8BA',
  				400: '#9CA18F',
  				500: '#787E6B',
  				600: '#5E6451',
  				700: '#474C3D',
  				800: '#313529',
  				900: '#20231B',
  				950: '#14160F',
  			},
  			// Neutral Colors — DS warm green-tinted stone (never pure gray).
  			// Overrides Tailwind's default `gray` + the `neutral` scale so the
  			// ~1,264 existing gray/neutral usages warm up with zero per-file edits.
  			'neutral': {
  				50: '#F9FAF5',
  				100: '#F2F4EC',
  				200: '#E0E3D8',
  				300: '#C4C8BA',
  				400: '#9CA18F',
  				500: '#787E6B',
  				600: '#5E6451',
  				700: '#474C3D',
  				800: '#313529',
  				900: '#20231B',
  				950: '#14160F',
  			},
  			gray: {
  				50: '#F9FAF5',
  				100: '#F2F4EC',
  				200: '#E0E3D8',
  				300: '#C4C8BA',
  				400: '#9CA18F',
  				500: '#787E6B',
  				600: '#5E6451',
  				700: '#474C3D',
  				800: '#313529',
  				900: '#20231B',
  				950: '#14160F',
  			},
  			// Legacy colors (keep for backward compatibility)
  			primaryBlue: '#266693',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		// Spacing scale for consistency
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'2xl': '1rem',
  			'3xl': '1.5rem',
  			pill: '999px',
  		},
  		// Soft, forest-green-tinted shadows (DS) — never neutral black.
  		boxShadow: {
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			DEFAULT: 'var(--shadow-md)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			brand: 'var(--shadow-brand)',
  			focus: 'var(--shadow-focus)',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
