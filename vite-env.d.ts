/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_GTM_ID?: string;
	readonly VITE_METRIKA_ID?: string;
	readonly VITE_ARKHAM_INDEX_URL?: string;
	readonly VITE_ARKHAMESQUE_URL?: string;
}
