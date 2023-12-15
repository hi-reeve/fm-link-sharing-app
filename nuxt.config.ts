// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        cookieName: process.env.COOKIE_NAME || "__session",
        cookieSecret: process.env.COOKIE_SECRET || "secret",
    },
    modules: [
        "@nuxt/image",
        "@vueuse/nuxt",
        "@unocss/nuxt",
        "@vee-validate/nuxt",
        "radix-vue/nuxt",
    ],
    css: ["./assets/scss/main.scss"],
    routeRules: {
        "/": {
            redirect: "/auth/login",
        },
    },
    experimental: {
        typedPages: true,
    },
});
