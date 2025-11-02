/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx,mdx,scss}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
    	extend: {
    		keyframes: {
    			slideDown: {
    				'0%': {
    					transform: 'translateY(-100%)'
    				},
    				'100%': {
    					transform: 'translateY(0%)'
    				}
    			},
    			slideUp: {
    				'0%': {
    					transform: 'translateY(0%)'
    				},
    				'100%': {
    					transform: 'translateY(-100%)'
    				}
    			},
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
    			slideDown: 'slideDown 0.4s ease-in-out',
    			slideUp: 'slideUp 0.4s ease-in-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		fontFamily: {
    			sans: [
    				'Quicksand',
    				'sans-serif'
    			],
    			Nunito: [
    				'Montez',
    				'cursive'
    			]
    		},
    		colors: {
    			primary: {
    				'50': '#eefbfd',
    				'100': '#d5f2f8',
    				'200': '#b0e4f1',
    				'300': '#7ad0e6',
    				'400': '#2da8cb',
    				'500': '#2095ba',
    				'600': '#1e799c',
    				'700': '#1f627f',
    				'800': '#215269',
    				'900': '#204559',
    				'950': '#102c3c',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
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
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
}

