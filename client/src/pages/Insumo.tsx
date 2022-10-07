import useForm from './../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../store/insumo';
import useUser from '../store/user';



const InsumoPost = () => {

    const { insumo, success, postInsumo} = useInsumo((state) => state);
    const { tokken} = useUser((state) => state);

    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      name:'',
      descripcion:'',
      unidad:'',
      costo:'',
      category:'',
    });
   

    
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
        postInsumo(values, tokken) 
        console.log('insumo', insumo)
        console.log(insumo, success, 'nose')
        console.log("mira esto", tokken)
  
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">Crear/actualizar Insumo</h1>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <input
                type="text"
                name="name"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre de insumo"
                value={values.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="descripcion"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="descripción"
                value={values.descripcion}
                onChange={handleChange}
            />
            <input
                type="number"
                name="unidad"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="unidad"
                value={values.unidad}
                onChange={handleChange}
            />
            <input
                type="number"
                name="costo"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="costo"
                value={values.costo}
                onChange={handleChange}
            />
            <input
                type="select"
                name="category"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="categoría"
                value={values.category}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            >
              crear insumo
            </button>
           
          </form>
        </div>
      </div>
    </div>
    </>
  )
}


export default InsumoPost