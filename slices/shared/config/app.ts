const env = import.meta.env ?? {};

export const BASE_PATH = env.APP_BASE_PATH || "";
export const API_URL = env.VITE_BASE_URL as string;
export const ARKHAMESQUE_API_URL = env.VITE_ARKHAMESQUE_URL as string;
