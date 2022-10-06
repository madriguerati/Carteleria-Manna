import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "./../pages/Administrar/Users";

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />

			<Route
				path='/admin/*'
				element={
					<Routes>
						<Route path='/usuarios' element={<Users />} />
					</Routes>
				}
			/>
			<Route path='/otro' element={"qwerty"} />
		</Routes>
	);
};

export default AppRouter;
