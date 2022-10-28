import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";


type Props = {
	setShowModal2: any;
    insumo:any
};
const InsumoEdit = ({ setShowModal2, insumo }: Props) => {
  

    const { success, putInsumo, closeModal, error} = useInsumo((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      id:insumo.id,
      name:insumo.name,
      descripcion:insumo.descripcion,
      unidad:insumo.unidad,
      costo:insumo.costo,
      category:insumo.category,
      proveedor:insumo.proveedor
    });
   

    const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleCloseModal = () => {
		setShowModal2(false);
		closeModal();
	};

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
        putInsumo(values, token)
        handleCloseModal()
        success
       
  }

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
            ? "Insumo editado exitosamente"
            : error
            ? "Ocurrio un error"
            : "Editar Insumo"}
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
              name='descripcion'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Descripción'
              value={values.descripcion}
              onChange={handleChange}
            />
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name}</p>
            )}
          </div>
          <div className='w-full'>
            <input
              type='text'
              name='unidad'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Unidad'
              value={values.unidad}
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
          name='costo'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Costo'
          value={values.costo}
          onChange={handleChange}
        />
        {errors.email && (
          <p className='text-red-600 text-sm'>{errors.email}</p>
        )}
        <input
          type='text'
          name='category'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Categoría'
          value={values.category}
          onChange={handleChange}
        />
        {errors.password && (
          <p className='text-red-600 text-sm'>{errors.password}</p>
        )}
        <input
          type='text'
          name='proveedor'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Proveedor'
          value={values.proveedor}
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
  )
}


export default InsumoEdit