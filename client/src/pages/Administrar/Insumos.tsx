import useInsumo from "../../store/insumo";
import Layout from "./../../components/Layout/index";
import { useEffect, useState } from "react";
import useLocalStorage from "./../../hooks/useLocalStorage";
import Modal from "../../components/Modal";
import InsumoPost from "../form/InsumoPost";
import { AiFillDelete } from 'react-icons/Ai';
import { AiFillEdit } from 'react-icons/Ai';
import { AiOutlineSearch} from 'react-icons/Ai';



const Users = () => {
	const { getInsumos, insumos, deleteIsumos } = useInsumo((state) => state);
	const [token] = useLocalStorage();
	const [rol, setRol] = useState("");
	const [sort, setSort] = useState("");
	const [page, setPage] = useState("");
	const [limit, setLimit] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [params, setParams]= useState("")

	useEffect(() => {
		getInsumos(token);
        console.log(insumos)
	}, []);
	const DeleteInsumos= (insumo:any)=>{
		deleteIsumos(insumo._id, token)
		getInsumos(token)
	}
	return (
		<Layout>
			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-8'>
					<div>
						<h2 className='text-2xl font-semibold leading-tight'>
						INSUMOS
						</h2>
					</div>
					<div className='my-2 flex sm:flex-row flex-col'>
						<div className='flex flex-row mb-1 sm:mb-0'>
							<div className='relative'>
								<select className='appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
									<option>5</option>
									<option>10</option>
									<option>20</option>
								</select>
								<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
									<svg
										className='fill-current h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
									>
										<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
									</svg>
								</div>
							</div>
							<div className='relative'>
								<select className='appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500'>
									<option>All</option>
									{insumos.categoria?.map((categoria: string) => (
										<option value='' className='capitalize'>
											{categoria}
										</option>
									))}
								</select>
								<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
									<svg
										className='fill-current h-4 w-4'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
									>
										<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
									</svg>
								</div>
							</div>
						</div>
						<div className='block relative'>
							<span className='h-full absolute inset-y-0 left-0 flex items-center pl-2'>
								<svg
									viewBox='0 0 24 24'
									className='h-4 w-4 fill-current text-gray-500'
								>
									<path d='M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z'></path>
								</svg>
							</span>
							<input
								placeholder='Search'
								className='appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none'
							/>
						</div>
					</div>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
						<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
							<table className='min-w-full leading-normal'>
								<thead>
									<tr>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											nombre
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											descripción
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											costo
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											unidad
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											categoria
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											proveedor
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											ver
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											editar
										</th>
										<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
											eliminar
										</th>
									</tr>
								</thead>
								<tbody>
									{insumos?.map((insumo: any) => (
										<tr>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<div className='flex items-center'>
													{/* <div className='flex-shrink-0 w-10 h-10'>
													<img
														className='w-full h-full rounded-full'
														src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80'
														alt=''
													/>
												</div> */}
													<div className='ml-3'>
														<p className='text-gray-900 whitespace-no-wrap'>
															{insumo.name}
														</p>
													</div>
												</div>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
													{insumo.descripcion}
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap capitalize'>
													{insumo.costo}
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
													{insumo.unidad}
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
													{insumo.category}
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
													{insumo.proveedor}
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
												<AiOutlineSearch/>
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'>
													<AiFillEdit/>
												</p>
											</td>
											<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
												<p className='text-gray-900 whitespace-no-wrap'  onClick={()=>DeleteInsumos(insumo)}>
													<AiFillDelete/>
												</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
								<span className='text-xs xs:text-sm text-gray-900'>
									Showing 1 to 4 of 50 Entries
								</span>
								<div className='inline-flex mt-2 xs:mt-0'>
									<button className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l'>
										Prev
									</button>
									<button className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r'>
										Next
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button
					className='bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
					onClick={() => setShowModal(true)}
				>
					<span className='text-white'>+ INSUMO</span>
				</button>
				<Modal showModal={showModal} setShowModal={setShowModal} >
					<InsumoPost setShowModal={setShowModal}/>
				</Modal>
			</div>
		</Layout>
	);
};

export default Users;