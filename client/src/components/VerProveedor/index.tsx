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
  showModal3: any
  proveedor:any
};
const InsumoEdit = ({ setShowModal3, showModal3, proveedor }: Props) => {
  
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
          <h1 className="text-end justify-end flex w-full">h</h1>
        </div>

        </div>
      </div>
  )
}


export default InsumoEdit