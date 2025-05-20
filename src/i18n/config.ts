export type Locale = (typeof locales)[number];

export const locales = ["ru", "uz", "en"] as const;
export const defaultLocale: Locale = "uz";
