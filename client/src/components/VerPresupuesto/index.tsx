import useForm from "../../hooks/useForm";
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import {BsWhatsapp} from "react-icons/bs";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
type Props = {
  setShowModal3: any;
  presupuesto: any;
};
const InsumoEdit = ({ setShowModal3, presupuesto }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const [token] = useLocalStorage();
  

  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const { clientes, getClients } = useClients((state) => state);
  var cliente: any = clientes.find((e: any) => e.name === presupuesto.clientes);
  useEffect(() => {
    getClients(headers);

    console.log("hola soy clientes", clientes, cliente);
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
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
      <div className="p-6 space-y-4 sm:p-8">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center rounded "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1>Presupuesto</h1>
        </div>
        <div className="">
          <div className="  mb-5 flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg">
            <div>
              <b className="text-gray-600">Cliente: </b>
              <h1>{presupuesto.clientes}</h1>
            </div>
            <div className="ml-2">
              <b className="text-gray-600">Contacto </b>
              <h1>{presupuesto.contacto}</h1>
            </div>
            <div className="ml-2">
              <b className="text-gray-600">Fecha </b>
              <h1>{moment(presupuesto.fecha).format("L")}</h1>
            </div>
          </div>
          {/** tercera columna */}
          <div className="mt-5 mb-5 flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg">
            <div>
              <b className="text-gray-600">Tipo de operación</b>
              <h1>{presupuesto.operacion}</h1>
            </div>
            {presupuesto.operacion === "colocacion" ? (
              <div className="ml-2">
                <b className="text-gray-600">Dirección</b>
                <h1>
                  {presupuesto.lugardecolocacion
                    ? presupuesto.logardecolocacion
                    : "Sin especificar"}
                </h1>
              </div>
            ) : (
              ""
            )}
            <div className="ml-2">
              <b className="text-gray-600">Fecha de entrega </b>
              <h1>{moment(presupuesto.fechaentrega).format("L")}</h1>
            </div>

                 {/** tercera columna */}
          <div className="mt-4 flex justify-start border-green-600 border-b-4">
            <div>
              <p>
                <b>Total: </b> {presupuesto.montototal}
              </p>
            </div>
          </div>
          {/** tercera columna */}
          </div>
          <hr />

          {/** cartel columna */}

          <div className="flex mt-5 mb-5 grid sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
            {presupuesto.carteles.map((e: any) => (
              <div className=" text-lg  rounded-xl  border-2 border-gray-200 overflow-hidden  sm:w-full md:w-full lg:w-160 p-5 ">
                <p className="text-start">
                  <b>Nombre: </b>
                  {e.name}{" "}
                </p>
                <p className="text-start">
                  <b>base x altura : </b>
                  {e.base} x {e.altura}{" "}
                </p>
                <b>categoría</b>
                {e.category.map((item: any) => (
                  <div>-{item}</div>
                ))}
                <p className="text-start">
                  <b>estructura: </b>
                  {e.estructura}{" "}
                </p>
                <p className="text-start">
                  <b>otros: </b>
                  {e.otros}{" "}
                </p>
                <p className="text-start">
                  <b>faz: </b>
                  {e.faz}{" "}
                </p>
              </div>
            ))}
          </div>
          {/** cartles columna */}

     
                      {/** observaciones columna */}

          <b className="text-black flex justify-center m-5">
                        Observaciones
                      </b>
                      <div>
                        <div className="text-lg flex p-5 grid mr-5 ">
                          <h1>{presupuesto.observaciones}</h1>
                        </div>
                      </div>
                                            {/** observaciones columna */}
                                                                  {/** contacto columna */}
                                                                 
                                                                 
                      {/** contacto columna */}


        </div>
      </div>
    </div>
  );
};

export default InsumoEdit;
