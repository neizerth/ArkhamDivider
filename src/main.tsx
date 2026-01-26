import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/modules/core/app/app/ui";
import "@/shared/fonts";

// #region agent log
fetch('http://127.0.0.1:7243/ingest/d3ca0f88-369d-45c3-ae40-df9ced01f609',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:6',message:'App initialization - full page reload detected',data:{timestamp:Date.now(),userAgent:navigator.userAgent},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
