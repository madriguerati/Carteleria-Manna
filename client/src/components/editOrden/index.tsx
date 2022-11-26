import useForm from "../../hooks/useForm";

import { useNavigate, Link } from "react-router-dom";
import useClients from "../../store/clientes";
import useCarteles from "../../store/carteles";

import useUser from "../../store/user";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useInusmo from "../../store/insumo";
import { useEffect, useState } from "react";
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

type Props = {
  setShowModal2: any;
  orden: any;
};
const ClienteEdit = ({ setShowModal2, orden }: Props) => {

  const [values, setValues] = useState({
    fecha: orden.fecha,
    cliente: orden.cliente,
    contacto: orden.contacto, //nombre de contacto
    carteles: orden.contacto,
    operacion: orden.operacion,
    lugardecolocacion: orden.lugardecolocacion,
    lugartraslado: orden.lugartraslado,
    seña: orden.seña,
    formadepago: orden.formadepago,
    fechaentrega: orden.fechaentrega,
    facturanum: orden.facturanum,
    observaciones: orden.observaciones,
  });


  return (
    
      <div className="p-6 space-y-4 sm:p-8">
        hola
    </div>
  );
};

export default ClienteEdit;
