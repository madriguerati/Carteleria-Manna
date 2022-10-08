import { validateInfo } from "./../utils/validate";
import useForm from "./../hooks/useForm";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../store/user";

type Props = {
  showModal: boolean,
  setShowModal: any,
}

const Register = ({ showModal, setShowModal }: Props) => {
	const { user, success } = useUser((state) => state);
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
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
		setErrors(
			validateInfo({
				...values,
				[name]: value,
			})
		);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setErrors(validateInfo(values));

		if (values.username && Object.keys(errors).length === 0) {
			console.log("user", user);
		}
		console.log(user, success, "nose");
	};
	return (
		<div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
			<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
				<div className='flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded text-zinc-800 bg-[#77B327]'>
					<h3 className='text-3xl font-semibold text-center'>Crear usuario</h3>
				</div>
				<form onSubmit={handleSubmit} className='flex flex-col mt-4'>
					<input
						type='text'
						name='username'
						className='px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Nombre de Usuario'
						value={values.username}
						onChange={handleChange}
					/>
					{errors.username && (
						<p className='text-red-700'>{errors.username}</p>
					)}
					<input
						type='email'
						name='email'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Correo electrónico'
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<p className='text-red-700'>{errors.email}</p>
					)}
					<input
						type='password'
						name='password'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Password'
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && (
						<p className='text-red-700'>{errors.password}</p>
					)}
					<input
						type='password'
						name='password2'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Repita la contraseña'
						value={values.password2}
						onChange={handleChange}
					/>
					{errors.password2 && (
						<p className='text-red-700'>{errors.password2}</p>
					)}
	
					<div className='flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
						<button
							className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							type='button'
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
						<button
							className='bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							type='submit'
							onClick={() => setShowModal(false)}
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
