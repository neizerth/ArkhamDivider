import type { JSX } from "react";

/**
 * Must stay visually identical to the markup in `index.html`: React replaces `#root`,
 * so any style drift here shows up as a jump when the app boots.
 * Classes `.loader` / `.loader__image` live in `index.html` for that reason.
 */
export function AppLoader(props: JSX.IntrinsicElements["div"]) {
	return (
		<div className="loader" {...props}>
			{/*
			  No <picture> fallback here, unlike index.html: this renders only once the app
			  has booted, and anything running it already supports WebP.
			*/}
			<img src="/images/loader.webp" className="loader__image" alt="" />
		</div>
	);
}
