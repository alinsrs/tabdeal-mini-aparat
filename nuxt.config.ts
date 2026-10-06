// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ]
        },
    },

    routeRules: {
        '/aparat-proxy/**': {
            proxy: 'https://www.aparat.com/etc/api/**',
        },
        '/aparat-v1/**': {
            proxy: 'https://www.aparat.com/api/fa/v1/**',
        },
    },

    runtimeConfig: {
        public: {
            defaultChannel: 'tabdealplatform',
            defaultPerPage: 12,
        },
    },

    compatibilityDate: '2025-07-15',

    devtools: {enabled: true},

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    modules: [
        'nuxt-mdi',
    ]
})
