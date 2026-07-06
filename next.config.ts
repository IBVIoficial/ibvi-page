import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {protocol: 'https', hostname: 'placehold.co'},
         {protocol: 'https', hostname: 'images.unsplash.com'},
      ],
   },
   typedRoutes: true,
   // Lint roda via `next lint` (ou no CI), não durante o build de produção.
   // Evita que erros de lint pré-existentes quebrem o `next build`.
   eslint: {
      ignoreDuringBuilds: true,
   },
};

export default withNextIntl(nextConfig);
