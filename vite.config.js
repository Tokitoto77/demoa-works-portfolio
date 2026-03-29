import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/demoa-works-portfolio/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                schedule: resolve(__dirname, 'schedule.html'),
                reservation: resolve(__dirname, 'reservation.html'),
            },
        },
    },
});
