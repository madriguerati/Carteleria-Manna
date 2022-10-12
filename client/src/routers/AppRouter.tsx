import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "./../pages/Administrar/Users";
import Insumos from "./../pages/Administrar/Insumos";

//import InsumoPost from '../pages/form/InsumoPost';
import CartelPost from '../pages/form/CartelPost';


const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			
			<Route path='/cartel/post' element={<CartelPost />} />

			<Route
				path='/admin/*'
				element={
					<Routes>
						<Route path='/usuarios' element={<Users />} />
						<Route path='/insumos' element={<Insumos />} />

						

					</Routes>
				}
			/>
			<Route path='/otro' element={"qwerty"} />
		</Routes>
	);
};

export default AppRouter;
