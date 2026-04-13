/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	/** Default `/api/metrika/pageview` (Vercel). Apache fallback: `/api/metrika/pageview.php` */
	readonly VITE_METRIKA_PAGEVIEW_PATH?: string;
}
