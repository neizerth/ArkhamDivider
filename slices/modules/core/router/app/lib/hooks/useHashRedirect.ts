import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useHashRedirect() {
	const navigate = useNavigate();

	useEffect(() => {
		const redirectFromHash = () => {
			const raw = window.location.hash ?? "";
			if (!raw || raw === "#") {
				return;
			}

			let target = "";
			if (raw.startsWith("#/")) {
				target = raw.slice(1);
			} else if (raw.startsWith("#")) {
				target = `/${raw.slice(1)}`;
			}

			if (!target || target === "/") {
				return;
			}

			navigate(target, { replace: true });
		};

		redirectFromHash();
		window.addEventListener("hashchange", redirectFromHash);
		return () => window.removeEventListener("hashchange", redirectFromHash);
	}, [navigate]);
}
