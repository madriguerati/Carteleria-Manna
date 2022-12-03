import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill, BsWhatsapp } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
import useOrdenes from "../../store/ordenes";
type Props = {
  setShowModal3: any;
  orden: any;
};
const InsumoEdit = ({ setShowModal3, orden }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const { clientes, getClients } = useClients((state) => state);
  var cliente: any = clientes.find((e: any) => e.name === orden.cliente);
  useEffect(() => {
    getClients(headers);

    console.log("hola soy clientes", clientes, cliente);
  }, []);
  const {
    ordenes,
    getOrdenesAll,
    putOrden,
    getOrdenes,
    deleteOrdenes,
    loading,
  } = useOrdenes((state) => state);
  const [openTab, setOpenTab] = useState(1);
  var color: any = "white";

  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
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
    porcentaje: orden.porcentaje,
  });
  const [totalOrden, setTotalOrden] = useState(orden.montototal);
  const [metodoPago, setMetodoPago] = useState([]);
  const [metodoPagoitems, setMetodoPagoitems] = useState([]);
  var [count, setCount] = useState(0);
  const [metodoObject, setMetodoObject] = useState({
    metodo: "",
    monto: 0,
  });

  var metodosPagosActual: any = [];
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setMetodoObject({
      ...metodoObject,
      [name]: value,
    })
  };
  
  const handleCloseModal = () => {
    setShowModal3(false);
    closeModal();
  };


  return (
<div>
  
</div>
  );
};

export default InsumoEdit;
