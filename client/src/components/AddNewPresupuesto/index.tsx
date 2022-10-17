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

	const { addClient, success, error, closeModal } = useClients((state) => state
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

		</div>
	);
};

export default AddNewClient;
