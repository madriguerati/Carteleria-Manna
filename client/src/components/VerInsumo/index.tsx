import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useProveedor from "../../store/proveedores";

import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
type Props = {
  setShowModal3: any;
  insumo: any;
  proveedorInsumo: any;
};
const InsumoEdit = ({ setShowModal3, insumo, proveedorInsumo }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const { proveedores, getProveedores } = useProveedor((state) => state);
  const [token] = useLocalStorage();
 

  const navigate = useNavigate();

  const [values, setValues] = useState({});
  useEffect(() => {
    getProveedores(headers);
  }, []);
 
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal3(false);
    closeModal();
  };

  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 flex  ">
      <div className="p-6 space-y-4 sm:p-8">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex  rounded "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1>{insumo.name}</h1>
        </div>
        <div className="">
 {/** tercera columna */}
 <div className="w-full  m-7 grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-4 md:grid-cols-4 text-lg">
            <div>
              <b className="text-gray-600">Descripción</b>
              <h1>{insumo.descripcion}</h1>
            </div>
            
              <div className="ml-2">
                <b className="text-gray-600">Unidad</b>
                <h1>{insumo.unidad}</h1>
              </div>
            <div className="ml-2">
              <b className="text-gray-600">Costo</b>
              <h1>{insumo.costo}</h1>
            </div>
            <div className="ml-2">
              <b className="text-gray-600">Categoría</b>
              <h1>{insumo.category}</h1>
            </div>
            </div>


                 {/** tercera columna */}
          <hr />
          {/** tercera columna */}
          <h1 className=" mt-5 text-2xl flex justify-center "><b>Proveedor: </b>{proveedorInsumo.name}</h1>
          <div className="flex mt-5  text-center">
            
            {/** observaciones columna */}
            {/** contacto columna */}
            
          <div className="flex justify-end grid p-5 sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
            <div className="m-5 text-xl ">
              <p className="text-start">Email</p>
              <h1>{proveedorInsumo.email}</h1>
            </div>
            <div className="m-5 text-xl">
              <p className="flex justify-end">Telefono</p>
              <h1 className="flex justify-end">
                {proveedorInsumo.telefono}
              </h1>
            </div>
            <div className="flex justify-end mt-3">
              <div className="m-7 text-2xl">
                <a
                  href={`https://api.whatsapp.com/send?phone=${proveedorInsumo.telefono}&text=Hola, ${proveedorInsumo.name}.Le escribimos desde Carteleria Manna`}
                >
                  <BsWhatsapp />
                </a>
              </div>
              <div className="m-7 text-2xl">
                <a
                  href={`mailto:${proveedorInsumo.email}?Subject=Interesado%20en%20su%20trabajo`}
                >
                  <MdEmail />
                </a>
              </div>
            </div>
          </div>
        </div>
            {/** contacto columna */}
          </div>
 {/** tercera columna */}
 <hr/>

{/** tercera columna */}
<h1 className="text-2xl text-bold uppercase flex text-center justify-center text-white bg-gray-600 border-4 border-gray-600 mt-5">Historial de Proveedores</h1>
                 <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                  Nombre    
                </th>
                <th scope="col" className="py-3 px-6">
                    Descripción
                </th>
                <th scope="col" className="py-3 px-6">
                    Unidad
                </th>
                <th scope="col" className="py-3 px-6">
                    Category
                </th>
                <th scope="col" className="py-3 px-6">
                    Costo
                </th>
                <th scope="col" className="py-3 px-6">
                    Proveedor
                </th>
            </tr>
        </thead>
        <tbody>
       
        {
   insumo.another.map((e:any)=> e.proveedor!== insumo.proveedor && (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {e.name}
      </th>
      <td className="py-4 px-6">
      {e.descripcion}
      </td>
      <td className="py-4 px-6">
      {e.unidad}
      </td>
      <td className="py-4 px-6">
      {e.category}
      </td>
      <td className="py-4 px-6">
      {e.costo}
      </td>
      <td className="py-2 px-3  text-black text-bold flex justify-center uppercase">
      {e.proveedor}
      </td>
  </tr>
    
    ))
  }
        </tbody>
    </table>
</div>
        </div>
      </div>
  );
};

export default InsumoEdit;
