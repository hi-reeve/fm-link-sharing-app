import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";
import { presetForms } from "@julr/unocss-preset-forms";
export default defineConfig({
    preflights: [
        {
            getCSS: () => `
				@keyframes hide {
					from { opacity: 1; }
					to { opacity: 0; }
				}
				@keyframes slide-in {
					from { transform: translateX(calc(100% + 24px)); }
					to { transform: translateX(0); }
				}
				@keyframes slide-out-fade {
					from { transform: translateX(0); opacity: 1; }
					to { transform:  translateX(calc(100% + 24px)); opacity: 0; }
				}
				@keyframes swipeOut {					
					from { transform: translateX(var(--radix-toast-swipe-end-x)); }
					to { transform: translateX(calc(100% + 24px)); }
				}
			`,
        },
    ],
    rules: [
        [
            "animate-hide",
            {
                animation: "hide 150ms ease-in",
            },
        ],
        [
            "animate-slide-in",
            {
                animation: "slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            },
        ],
        [
            "animate-slide-out-fade",
            {
                animation: "slide-out-fade 150ms ease-in",
            },
        ],
        [
            "animate-swipeOut",
            {
                animation: "swipeOut 100ms ease-out",
            },
        ],
        [
            "shadow-custom",
            {
                "box-shadow": "0px 0px 32px 0px rgba(var(--primary),0.25)",
            },
        ],
    ],
    theme: {
        colors: {
            primary: {
                DEFAULT: `rgba(var(--primary))`,
                2: `rgba(var(--primary2))`,
                3: `rgba(var(--primary3))`,
            },
            accent: {
                DEFAULT: `rgba(var(--accent))`,
                2: `rgba(var(--accent2))`,
                3: `rgba(var(--accent3))`,
            },
            black: `rgba(var(--black))`,
            error: `rgba(var(--error))`,
        },
    },
    presets: [
        presetAttributify(),
        presetIcons(),
        presetUno(),
        presetWebFonts({
            provider: "bunny",
            fonts: {
                sans: "Instrument Sans:100,300,400,500,600,700,800,900",
            },
        }),
        presetForms(),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
