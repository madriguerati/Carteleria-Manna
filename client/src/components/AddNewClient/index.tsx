import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useClients from "../../store/clientes";

type Props = {
	setShowModal: any;
};

interface Values {
	name: string;
	telefono: string;
	cuit: string;
	email: string;
	direccion: string;
	condicioniva: string[];
	razonsocial: string;
}

const AddNewClient = ({ setShowModal }: Props) => {

	const { addClient, success, error, closeModal } = useClients(
		(state) => state
	);
	const [values, setValues] = useState<Values>({
		name: "",
		telefono: "",
		cuit: "",
		email: "",
		direccion: "",
		condicioniva: [""],
		razonsocial: "",
	});
	const [errors, setErrors] = useState<any>({});

	const handleChange = (
		e: React.FormEvent<HTMLInputElement>
	): void => {
		const { name, value } = e.currentTarget;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		// setErrors(
		// 	validateInfo({
		// 		...values,
		// 	})
		// );

		// const error = validateInfo(values);

		// if (Object.keys(error).length === 0) {
		// 	createNewUser(values);
		// }
		addClient(values);

		setTimeout(() => {
			closeModal();
		}, 2000);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		closeModal();
	};

	// const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	let { value } = e.currentTarget;

	// 	setValues({
	// 		...values,
	// 		roles: [value],
	// 	});
	// };

	useEffect(() => {
		success &&
			setValues({
				name: "",
				telefono: "",
				cuit: "",
				email: "",
				direccion: "",
				condicioniva: [""],
				razonsocial: "",
			});
	}, [success]);

	console.log(values);

	return (
		<div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
			<div className='p-6 space-y-4 sm:p-8'>
				<button
					className='absolute right-4 top-6 bg-white text-gray-500 text-2xl w-10 h-10 rounded-full flex justify-center border border-gray-300'
					onClick={handleCloseModal}
				>
					x
				</button>
				<div
					className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${
						success
							? "bg-[#c2e593]"
							: error
							? "bg-red-300"
							: "bg-[#77B327]"
					}`}
				>
					<h3
						className={`text-3xl font-semibold text-center ${
							success
								? "text-[#77B327]"
								: error
								? "text-red-700"
								: "text-zinc-800"
						}`}
					>
						{success
							? "Cliente agregado exitosamente"
							: error
							? "Ocurrio un error"
							: "Nuevo Cliente"}
					</h3>
					{success && (
						<BsFillCheckCircleFill
							size={55}
							className='text-[#77B327]'
						/>
					)}

					{error && (
						<MdError size={55} className='text-red-700 ml-1' />
					)}
				</div>
				<form onSubmit={handleSubmit} className='flex flex-col mt-4'>
					<input
						type='text'
						name='name'
						className='px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Nombre'
						value={values.name}
						onChange={handleChange}
					/>
					{errors.username && (
						<p className='text-red-600 text-sm'>{errors.username}</p>
					)}
					<div className='flex gap-4'>
						<div className='w-full'>
							<input
								type='text'
								name='telefono'
								className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
								placeholder='Telefono'
								value={values.telefono}
								onChange={handleChange}
							/>
							{errors.name && (
								<p className='text-red-600 text-sm'>{errors.name}</p>
							)}
						</div>
						<div className='w-full'>
							<input
								type='text'
								name='direccion'
								className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
								placeholder='Dirección'
								value={values.direccion}
								onChange={handleChange}
							/>
							{errors.lastname && (
								<p className='text-red-600 text-sm'>
									{errors.lastname}
								</p>
							)}
						</div>
					</div>
					<input
						type='text'
						name='email'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Correo electrónico'
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<p className='text-red-600 text-sm'>{errors.email}</p>
					)}
					<input
						type='text'
						name='cuit'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='CUIT'
						value={values.cuit}
						onChange={handleChange}
					/>
					{errors.password && (
						<p className='text-red-600 text-sm'>{errors.password}</p>
					)}
					<input
						type='text'
						name='condicioniva'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Cindición I.V.A'
						value={values.condicioniva}
						onChange={handleChange}
					/>
					{errors.password2 && (
						<p className='text-red-600 text-sm'>{errors.password2}</p>
					)}
					<input
						type='text'
						name='razonsocial'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Razón Social'
						value={values.razonsocial}
						onChange={handleChange}
					/>
					{errors.password2 && (
						<p className='text-red-600 text-sm'>{errors.password2}</p>
					)}
					<div className='flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
						<button
							className='text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							type='button'
							onClick={handleCloseModal}
						>
							Cancelar
						</button>
						<button
							className='bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							type='submit'
						>
							Aceptar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddNewClient;
