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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Fecha
      </label>
      <input className="appearance-none block w-40 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="Fecha"/>

  <div className="flex flex-wrap -mx-3 mb-6">
    
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Cliente
      </label>
      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Cliente</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        
    </div>
    <div className="w-full md:w-1/2 px-3">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded-full">
  +
</button>
    </div>
{/**Holaaa soy un cartel */}
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
      <label className="block uppercase tracking-wide mt-4 text-gray-700 text-xs font-bold mb-2" >
        Carteles
      </label>
      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Cliente</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        
    </div>
    <div className="w-full md:w-1/2 px-3">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded-full">
  +
</button>
    </div>
{/**Holaaa soy un cartel */}




  </div>
  {/**Holaaa soy un opciones */}
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        operación
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Colocación
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>

     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
     <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" >
        Metodo
      </label>
      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Cliente</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
    </div>
  </div>
{/**Holaaa soy un cartel */}

 {/**Holaaa soy un opciones */}
 <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Monto Total
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    
    <div className="w-30 md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Entrega
      </label>
      <input className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>

     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Fecha Válida
      </label>
      <input className="appearance-none block w-30 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="Fecha"/>
    </div>
  </div>
{/**Holaaa soy un cartel */}
<div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Observaciones
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 h-20 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="observaciones"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
 
  <div className="flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
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
