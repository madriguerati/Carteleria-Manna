import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack,  MdEmail  } from "react-icons/md";
import Swal from 'sweetalert2'
import { BsWhatsapp } from "react-icons/bs";
import moment from 'moment'
type Props = {
	setShowModal3: any;
    cliente:any
    ordenesPorMes:any
};
const InsumoEdit = ({ setShowModal3, cliente, ordenesPorMes }: Props) => {
  
const [category, setCartegory]=useState(["IMPRESIONES", "CARTELERIA"])
    const { success, putInsumo, closeModal, error} = useInsumo((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
     
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
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 flex w-full  ">
      <div className="w-full space-y-4 sm:p-8">
      <div className=" flex  text-2xl mb-10 border-b-4 border-[#77B327] p-5 mb-1 grid sm:gap-1  sm:grid-cols-1
      md:gap-2 md:grid-cols-2 ">
          <button
            className="w-full"
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1 className="text-end justify-end flex w-full">{cliente.name}</h1>
        </div>
        {/** inicio */}
<div>
  {/** tercera columna */}
 <div className="w-full ml-7  mb-5 grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-4 md:grid-cols-4 text-lg">
            <div>
              <b className="text-gray-600">Nombre</b>
              <h1>{cliente.name}</h1>
            </div>
            
              <div className="ml-2">
                <b className="text-gray-600">Condición I.V.A.</b>
                <h1>{cliente.condicioniva}</h1>
              </div>
            <div className="ml-2">
              <b className="text-gray-600">Razón Social</b>
              <h1>{cliente.razonsocial}</h1>
            </div>
            <div className="ml-2">
              <b className="text-gray-600">Cuit</b>
              <h1>{cliente.cuit}</h1>
            </div>
            </div>
            <hr/>

                 {/** tercera columna */}
                 <h1 className="text-2xl text-bold uppercase flex text-center justify-center m-5">Historial de Ordenes</h1>
                 <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Fecha
                </th>
                <th scope="col" className="py-3 px-6">
                    Orden
                </th>
                <th scope="col" className="py-3 px-6">
                    Operación
                </th>
                <th scope="col" className="py-3 px-6">
                    Total
                </th>
                <th scope="col" className="py-3 px-6">
                    Carteles
                </th>
                <th scope="col" className="py-3 px-6">
                    Estado
                </th>
            </tr>
        </thead>
        <tbody>
       
        {
    ordenesPorMes.map((e:any)=>(
      <tr className="bg-white dark:bg-gray-800 text-lg">
      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {moment(e.fecha).format("L")}
      </th>
      <td className="py-4 px-6">
      {e.facturanum}
      </td>
      <td className="py-4 px-6">
      {e.operacion}
      </td>
      <td className="py-4 px-6">
      {e.montototal}
      </td>
      <td className="py-4 px-6">
      {e.carteles.length}
      </td>
      <td className="py-4 px-6">
      {
          e.resta+e.seña===e.montototal?
          <h1 className="border-b-4 border-violet-600 flex text-center">Pagada</h1>
          :
          <h1 className="border-b-4 border-yellow-600 flex text-center">Sin pagar</h1>
        }
      </td>
  </tr>
    
    ))
  }
        </tbody>
    </table>
</div>




                 {/** tercera columna */}
</div>

        {/** inicio */}
        <hr/>
        <h1>Contacto</h1>
        <div className="flex justify-end grid p-5 sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
            <div className="m-5 text-xl ">
              <p className="text-start">Email</p>
              <h1>{cliente.email}</h1>
            </div>

            <div className="m-5 text-xl">
              <p className="flex justify-end">Telefono</p>
              <h1 className="flex justify-end">
                {cliente.telefono}
              </h1>
            </div>

            <div className="flex justify-end mt-3">
              <div className="m-7 text-2xl">
                <a
                  href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria Manna`}
                >
                  <BsWhatsapp />
                </a>
              </div>

              <div className="m-7 text-2xl">
                <a
                  href={`mailto:${cliente.email}?Subject=Interesado%20en%20su%20trabajo`}
                >
                  <MdEmail />
                </a>
              </div>
            </div>

          </div>


        </div>
      </div>
  )
}


export default InsumoEdit