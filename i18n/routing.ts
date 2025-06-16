// i18n/routing.ts
// Valid options for the prefix strategy
export type LocalePrefix = 'always' | 'as-needed' | 'never';

/* Locales your app supports */
export const locales = ['en', 'pt', 'es'] as const;

/* Default locale when no prefix is present */
export const defaultLocale = 'pt';

/* When to add locale prefixes to routes */
export const localePrefix: LocalePrefix = 'as-needed';

/* Object consumed by next-intl middleware */
export const routing = {
  locales,
  defaultLocale,
  localePrefix
};