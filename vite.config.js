import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    // Plain dynamic import() (no absolute-path preload helper) so lazy chunks also
    // resolve correctly when hosted under a sub-path like /My-Portfolio/ on GitHub Pages.
    build: {
        modulePreload: false,
        chunkSizeWarningLimit: 800,
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
