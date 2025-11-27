export type SupportedLanguage = 'en' | 'fr';

function parseEmailList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0);
}

export const env = {
  // Public (used on client and server)
  pageTitle: process.env.NEXT_PUBLIC_PAGE_TITLE || 'Gift Registry',
  titleFont: process.env.NEXT_PUBLIC_TITLE_FONT || 'Playwrite ZA',
  language: (process.env.NEXT_PUBLIC_LANGUAGE || 'en') as SupportedLanguage,
  revolutLink: process.env.NEXT_PUBLIC_REVOLUT_LINK || '',

  // Server-only
  spreadsheetId: process.env.SPREADSHEET_ID || '',
  notificationEmails: parseEmailList(process.env.NOTIFICATION_EMAILS),
};

export type AppEnv = typeof env;


