import useForm from '../../hooks/useForm';
import { useEffect, useState } from "react";

import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill, BsWhatsapp } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import Swal from 'sweetalert2'
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
type Props = {
	setShowModal3: any;
    orden:any
};
const InsumoEdit = ({ setShowModal3, orden }: Props) => {
  
  const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
  const { clientes, getClients } = useClients((state) => state);
  var cliente: any = clientes.find((e:any)=>e.name===orden.cliente)
useEffect(() => {
  
getClients(headers);
 
console.log("hola soy clientes", clientes, cliente)
}, []);

const [category, setCartegory]=useState(["IMPRESIONES", "CARTELERIA"])
    const { success, putInsumo, closeModal, error} = useInsumo((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      fecha: orden.fecha,
        cliente: orden.cliente,
        contacto: orden.contacto, //nombre de contacto
        carteles: orden.carteles,
        operacion: orden.operacion,
        lugardecolocacion: orden.lugardecolocacion,
        lugartraslado: orden.lugartraslado,
        seña: orden.seña,
        formadepago: orden.formadepago,
        fechaentrega: orden.fechaentrega,
        facturanum: orden.facturanum,
        observaciones: orden.observaciones,
        montototal: orden.montototal,
        porcentaje: orden.porcentaje
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
      
      <div className="bg-white p-5 text-start text-2xl rounded">
      <div className="relative flex justify-end mb-10 bg-[#77B327] p-5 rounded">
      <button
        className='absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
      <div className="flex text-end"><b className="flex text-end">Orden: :</b>{orden.facturanum}</div>
      </div>

      <div className="mt-5 flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg">
        <div>
          <b className="text-gray-600">Cliente: </b> 
          <h1>{orden.cliente}</h1>
        </div>
        <div className="ml-2">
          <b className="text-gray-600">Contacto </b> 
          <h1>{orden.contacto}</h1>
        </div>
        <div className="ml-2">
          <b className="text-gray-600">Fecha </b> 
          <h1>{moment(orden.fecha).format("L")}</h1>
        </div>
      </div>
      {/** tercera columna */}
 <div className="mt-5 flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg">
        <div>
          <b className="text-gray-600">Tipo de operación</b> 
          <h1>{orden.operacion}</h1>
        </div>
      {
        orden.operacion==="colocacion"
        ?
        <div className="ml-2">
        <b className="text-gray-600">Dirección</b> 
        <h1>{orden.lugardecolocacion}</h1>
      </div>
      :
      ""
      }
        <div className="ml-2">
          <b className="text-gray-600">Fecha de entrega </b> 
          <h1>{moment(orden.fechaentrega).format("L")}</h1>
        </div>
      </div>

      {/** tercera columna */}
      <div className="mt-5 flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg mb-7">
        <div className="border-b-4 border-green-600">
          <b className="text-gray-600 ">Seña</b> 
          <h1>{orden.seña}</h1>
        </div>
      
        <div className="ml-2 ">
        <div className="ml-2 border-b-4 border-red-600">
        <b className="text-gray-600 ">Resta</b> 
        <h1>{orden.montototal-orden.seña}</h1>
        </div>
      </div>
        <div className="ml-2 border-b-4 border-blue-600 text-center ">
          <b className="text-gray-600">Total</b> 
          <h1>{orden.montototal}</h1>
        </div>
      </div>
 <hr/>
      <div className=" " >
          <b className="justify-center flex m-5">Carteles</b>
          <br/>
         <div className="flex grid sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
         {
            orden.carteles.map((e:any)=>(
              <div className=" text-lg  rounded-xl  border-2 border-gray-200 overflow-hidden  sm:w-full md:w-full lg:w-160 p-5 ">
          <p className="text-start"><b>Nombre: </b>{e.name} </p>
          <p className="text-start"><b>base x altura : </b>{e.base} x {e.altura} </p>
          <b>categoría</b>
          {e.category.map((item:any)=>(
            <div>-{item}</div>
          ))}
          <p className="text-start"><b>estructura: </b>{e.estructura} </p>
          <p className="text-start"><b>otros: </b>{e.otros} </p>
          <p className="text-start"><b>faz: </b>{e.faz} </p>
        </div>
            ))
          }
         </div>
        </div>
        <b className="text-black flex justify-center m-5">Observaciones</b>
        <div>
         
          <div className="text-lg flex p-5 grid mr-5 ">
            <h1>{orden.observaciones }</h1>
          </div>
        </div>
     </div>
     <h1 className="flex justify-center text-lg border-b-2 p-5 ">Contacto</h1>
     <div className="flex ">
  
      <div className="flex justify-end grid p-5 sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
      <div className="m-5 text-xl ">
        
        <p >Email</p>
       <h1>{cliente.email}</h1>
        </div>
        <div className="m-5 text-xl">
        
        <p className="flex justify-end">Telefono</p>
       <h1 className="flex justify-end">{cliente.telefono}</h1>
        </div>
        <div className="flex justify-end mt-3">
        <div className="m-7 text-2xl">
        <a href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria`}><BsWhatsapp /></a>
        
        </div>
        <div className="m-7 text-2xl">
        
        <a href={`mailto:${cliente.email}?Subject=Interesado%20en%20su%20trabajo`}><MdEmail /></a>
       
        </div>
        </div>
       
      </div>
     </div>
  </div>

  </div>
  )
}


export default InsumoEdit