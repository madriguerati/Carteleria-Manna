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
type Props = {
	setShowModal3: any;
    cliente:any
};
const InsumoEdit = ({ setShowModal3, cliente }: Props) => {
  
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
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 flex  ">
      <div className=" space-y-4 sm:p-8">
      <div className=" flex  text-2xl mb-10 border-b-4 border-[#77B327] p-5 mb-1 grid sm:gap-1  sm:grid-cols-1
      md:gap-2 md:grid-cols-2 ">
          <button
            className="w-full"
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1 className="text-end flex w-full">{cliente.name}</h1>
        </div>
        {/** inicio */}
<div>
  {/** tercera columna */}
 <div className="w-full  mb-5 grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-4 md:grid-cols-4 text-lg">
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
<div>
  <h1>Carteles</h1>
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