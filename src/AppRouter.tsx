import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components";
import { Layout } from "./components/Layout";

import { App, Favorites } from "./components";

import "./App.css";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />

			<Route path="/explore" element={<Layout />}>
				<Route index element={<App />} />
			</Route>

			<Route path="/hiking/:lat/:lng" element={<Favorites />} />

			<Route path="*" element={<div>404 NOT FOUND</div>} />
		</Routes>
	);
};

export default AppRouter;
