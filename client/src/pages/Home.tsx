import Layout from "../components/Layout";
import useUser from "./../store/user";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<Layout>
			<div className='xl:container mx-auto px-4 sm:px-8 h-screen my-auto grid items-center'>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-16 gap-y-16 py-16 md:py-0 text-center items-center'>
					<Link to='/carteles'>
						<figure className='bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/carteles_96x96.png'
								alt='Carteles logo'
							/>
							{/* <div className="absolute w-11/12 h-[93%] top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded border-2 border-[#76b3273b]" /> */}
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								CARTELES
							</figcaption>
						</figure>
					</Link>
					<Link to='/clientes'>
						<figure className='bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/clientes_96x96.png'
								alt='Clientes logo'
							/>
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								CLIENTES
							</figcaption>
						</figure>
					</Link>
					<Link to='/insumos'>
						<figure className='bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/insumos_96x96.png'
								alt='Insumos logo'
							/>
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								INSUMOS
							</figcaption>
						</figure>
					</Link>
					<Link to='/ordenes'>
						<figure className='bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/ordenes_96x96.png'
								alt='Ordenes logo'
							/>
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								ORDENES
							</figcaption>
						</figure>
					</Link>
					<Link to='/presupuesto'>
						<figure className='bg-gray-100 rounded-md py-10  drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/pagos_96x96.png'
								alt='Presupuesto logo'
							/>
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								PRESUPUESTO
							</figcaption>
						</figure>
					</Link>
					<Link to='/proveedores'>
						<figure className='bg-gray-100 rounded-md py-10  drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
							<img
								className='mx-auto'
								src='https://carteleriamanna.com.ar/sistema/img/escritorio/proveedores_96x96.png'
								alt='Proveedores logo'
							/>
							<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
								PROVEEDORES
							</figcaption>
						</figure>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
