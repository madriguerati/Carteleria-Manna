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
<div className="relative flex justify-center mb-10 bg-[#77B327] p-5 rounded">
      <button
        className='absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
      <b>Orden: :</b>
      </div>
  </div>
  )
}


export default InsumoEdit