import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
   images: {
      domains: ['placehold.co', 'images.unsplash.com'],
   },
   experimental: {typedRoutes: true},
};

export default withNextIntl(nextConfig);
