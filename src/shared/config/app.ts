export const BASE_PATH = import.meta.env.APP_BASE_PATH || '/';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Use proxy URL for investigators in development, direct URLs in production
export const API_URL = import.meta.env.VITE_BASE_URL;
export const INVESTIGATORS_URL = import.meta.env.VITE_INVESTIGATORS_URL;
export const ARKHAMESQUE_URL = import.meta.env.VITE_ARKHAMESQUE_URL;

export const T_LINK = import.meta.env.VITE_T_LINK;
export const PAYPAL_LINK = import.meta.env.VITE_PAYPAL_LINK;
export const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK;
export const BOOSTY_LINK = import.meta.env.VITE_BOOSTY_LINK;
export const PATREON_LINK = import.meta.env.VITE_PATREON_LINK;

export const ARKHAMESQUE_RENDER_DEBUG = false;
