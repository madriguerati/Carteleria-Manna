import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack } from "react-icons/md";
import Swal from 'sweetalert2'

type Props = {
	setShowModal3: any;
    cartel:any
};
const InsumoEdit = ({ setShowModal3, cartel }: Props) => {
  
const [category, setCartegory]=useState(["IMPRESIONES", "CARTELERIA"])
    const { success, putInsumo, closeModal, error} = useInsumo((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      id: cartel._id,
      descripcion: cartel.descripcion,
      costo1faz: cartel.costo1faz,
      costo2faz: cartel.costo2faz,
      insumosArray: cartel.insumosArray,
      category: cartel.insumosArray,
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
		setShowModal3(false);
		closeModal();
	};

  

  return (
    <div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
    <div className='p-6 space-y-4 sm:p-8'>
      <button
        className=' text-2xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
     <div className="bg-[#77B327] p-5 text-center text-4xl rounded">
      {cartel.descripcion}
     </div>
    <div className="grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3">
<div>
  <p className=" w-full text-gray-400">Tipo de cartel</p>
  <h1 className="text-2xl">{cartel.descripcion}</h1>
</div>
<div className="ml-5 w-full ">
  <p className=" w-full text-gray-400">costo 1 faz</p>
  <h1 className="text-2xl">{cartel.costo1faz}</h1>
</div>
<div className="ml-5 ">
  <p className="w-full text-gray-400">costo 2 faz</p>
  <h1 className="text-2xl">{cartel.costo2faz}</h1>
</div>

    </div>
    <div >
  <p className=" w-full text-gray-400">categoría</p>
  <div className="flex">{cartel.category.map((e:any)=>category.includes(e) && (
    <div className="flex content-center justify-center align-center">
     <h1 className="text-blue-300 text-2xl"> <MdDone /></h1>
      <h1 className="text-2xl">{e}</h1>
      </div>)
  )}</div>
</div>
<hr />
<div className="bg-gray-200 rounded-xl p-2">
<h1 className="text-4xl text-center">Insumos</h1>
<div className="flex grid sm:gap-1   sm:grid-cols-1
          md:gap-3 md:grid-cols-3 m-2">
{
  cartel.insumosArray.map((e:any)=>(
    <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160 p-5 mr-4">
    <h1><b>Nombre: </b> {e.name}</h1>
    <h1><b>Catidad 1 faz: </b>{e.cant1faz}</h1>
    <h1><b>Catidad 2 faz: </b>{e.cant2faz}</h1>
    <h1><b>Costo: </b>{e.costo}</h1>
    <h1><b>Costo 1 faz: </b>{e.costox1faz}</h1>
    <h1><b>Costo 2 faz: </b>{e.costox2faz}</h1>
    <h1><b>Faz: </b>{e.faz}</h1>
    <h1><b>Unidad: </b>{e.unidad}</h1>

    </div>


  ))
}
</div>
</div>
<div className="text-end">
  <p>Proveedor</p>
  <h1 className="text-2xl">(proveedor)</h1>
</div>
    </div>
  </div>
  )
}


export default InsumoEdit