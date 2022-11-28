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
    orden:any
};
const InsumoEdit = ({ setShowModal3, orden }: Props) => {
  
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
      <button
        className=' text-xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
      <div className="bg-white p-5 text-start text-4xl rounded">
      <b>Orden: </b>{orden.facturanum}

      <div className="mt-5 flex text-lg">
        <div>
          <b>Cliente: </b> {orden.cliente}
        </div>
        <div className="ml-5">
          <b>Contacto: </b> {orden.contacto}
        </div>
      </div>

      <hr/>
      <div>
          <b>Carteles</b>
          <br/>
          {
            orden.carteles.map((e:any)=>(
              <div>
          <b>{e.name} </b>
        </div>
            ))
          }
        </div>
     </div>
  </div>

  </div>
  )
}


export default InsumoEdit