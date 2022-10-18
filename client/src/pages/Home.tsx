import Layout from "../components/Layout";
import useUser from "./../store/user";

const Home = () => {
	return (
		<Layout>
			<div className='xl:container mx-auto px-4 sm:px-8 h-screen my-auto flex flex-col justify-center'>
				<div className='grid grid-cols-[minmax(200px,_1fr)] gap-x-4 gap-y-16 justify-items-center text-center'>
					<figure className='bg-gray-100 rounded-md py-10 px-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/carteles_96x96.png'
							alt='Carteles logo'
						/>
						{/* <div className="absolute w-11/12 h-[93%] top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded border-2 border-[#76b3273b]" /> */}
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							CARTELES
						</figcaption>
					</figure>
					<figure className='bg-gray-100 rounded-md py-10 px-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/clientes_96x96.png'
							alt='Clientes logo'
						/>
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							CLIENTES
						</figcaption>
					</figure>
					<figure className='bg-gray-100 rounded-md py-10 px-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/insumos_96x96.png'
							alt='Insumos logo'
						/>
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							INSUMOS
						</figcaption>
					</figure>
					<figure className='bg-gray-100 rounded-md py-10 px-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/ordenes_96x96.png'
							alt='Ordenes logo'
						/>
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							ORDENES
						</figcaption>
					</figure>
					<figure className='bg-gray-100 rounded-md py-10 px-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/pagos_96x96.png'
							alt='Presupuesto logo'
						/>
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							PRESUPUESTO
						</figcaption>
					</figure>
					<figure className='bg-gray-100 rounded-md py-12 px-10 drop-shadow-md'>
						<img
							src='https://carteleriamanna.com.ar/sistema/img/escritorio/proveedores_96x96.png'
							alt='Proveedores logo'
						/>
						<figcaption className='text-[#77B327] text-xl font-semibold tracking-wide mt-6'>
							PROVEEDORES
						</figcaption>
					</figure>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
