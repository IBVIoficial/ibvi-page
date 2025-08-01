import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
   // Skip static assets & Next.js internals
   matcher: ['/((?!_next|favicon.ico|images|assets).*)'],
};
