import React from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthenticatedApp = React.lazy(() =>
	import("./authenticated-app/Authenticated-app")
);

const UnAuthenticatedApp = React.lazy(() =>
	import("./unauthenticated-app/UnAuthenticated-app")
);

function App() {
	const user = window.localStorage.getItem("__token__");
	return (
		<>
			<React.Suspense fallback="...Loading">
				{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
			</React.Suspense>
		</>
	);
}

export default App;
