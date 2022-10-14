import { useEffect, useState } from "react";
import PrincipalRoute from "./routers/PrincipalRoute";
import useUser from "./store/user";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const { updateToken } = useUser((state) => state);
	const [accessToken, refreshToken] = useLocalStorage();
	console.log(accessToken, refreshToken);


	useEffect(() => {
		accessToken && updateToken(refreshToken);
	}, [])

	useEffect(() => {
    const oneHour = 3600000
		let interval = setInterval(() => {
			accessToken && updateToken(refreshToken);
		}, oneHour);
		return () => clearInterval(interval);
	}, [accessToken]);

	return <PrincipalRoute />;
}

export default App;
