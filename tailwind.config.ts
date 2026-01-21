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
  			]
  		},
  		maxWidth: {
  			'7xl': '1312px'
  		},
  		screens: {
  			xl: '1440px'
  		},
  		colors: {
  			// Brand Colors - Primary
  			'brand-green': {
  				50: '#f0fdf4',
  				100: '#dcfce7',
  				200: '#bbf7d0',
  				300: '#86efac',
  				400: '#4ade80',
  				500: '#22c55e',
  				600: '#16a34a',  // Primary CTA
  				700: '#15803d',  // Hover state
  				800: '#166534',
  				900: '#14532d',
  				950: '#083F19',  // Footer/Dark sections
  			},
  			// Brand Colors - Secondary (Orange for highlights)
  			'brand-orange': {
  				500: '#C46617',
  				600: '#b55a12',
  			},
  			// Neutral Colors
  			'neutral': {
  				50: '#fafafa',
  				100: '#f5f5f5',  // Light backgrounds (#F4F4F4)
  				200: '#e5e5e5',
  				300: '#d4d4d4',
  				400: '#a3a3a3',
  				500: '#737373',
  				600: '#525252',  // Body text (#666)
  				700: '#404040',
  				800: '#262626',
  				900: '#171717',  // Dark overlays
  				950: '#0a0a0a',
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
