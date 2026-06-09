import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // Plugin pour servir le dossier /flyers/ en tant que fichiers statiques
        {
          name: 'serve-flyers-assets',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url && req.url.startsWith('/flyers/')) {
                try {
                  const decoded = decodeURIComponent(req.url);
                  const filepath = join(process.cwd(), decoded);
                  if (existsSync(filepath)) {
                    const ext = filepath.toLowerCase().split('.').pop();
                    const mimeTypes: Record<string, string> = {
                      jpg: 'image/jpeg', jpeg: 'image/jpeg',
                      png: 'image/png', webp: 'image/webp', gif: 'image/gif',
                    };
                    const content = readFileSync(filepath);
                    res.setHeader('Content-Type', mimeTypes[ext || 'jpeg'] || 'image/jpeg');
                    res.setHeader('Cache-Control', 'public, max-age=86400');
                    res.end(content);
                    return;
                  }
                } catch {
                  // fall through
                }
              }
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
