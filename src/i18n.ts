import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define your supported locales
const locales = ['en'];

export default getRequestConfig(async ({ locale }) => {
  // 1. Check if locale exists and is supported
  // This satisfies the runtime logic
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    // 2. We use 'as string' to tell TypeScript: 
    // "I have already checked that this is not undefined above."
    locale: locale as string, 
    messages: (await import(`../messages/${locale}.json`)).default
  };
});