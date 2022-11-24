import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { Auth0ProviderWithConfig } from "./auth0-provider-with-config";
import "./styles/styles.css";

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript
root.render(
	<React.StrictMode>
		<Auth0ProviderWithConfig>
			<App />
		</Auth0ProviderWithConfig>
	</React.StrictMode>
);
