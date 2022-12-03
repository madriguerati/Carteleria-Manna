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
  const handleSelectMetodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setMetodoObject({
      ...metodoObject,
      metodo: value,
    });
      var objeto: any = metodoObject;
      var array: any = [...metodoPago, objeto];
      setMetodoPago(array);
      agregarMetodo()
  };
  const handleCloseModal = () => {
    setShowModal3(false);
    closeModal();
  };

  const agregarMetodo = () => {
    metodosPagosActual = [ 1];
    setMetodoPagoitems(metodosPagosActual);
    console.log("holaaaaa", metodoObject, metodoPago, count);
    setMetodoObject({
...metodoObject,
metodo:"",
monto:0
    })

  };
  const deleteCardPago = () => {
    console.log("Hola");
  };
  const organizarPago = () => {
    console.log("hola como estas ", metodoPago);
      var objeto: any = metodoObject;
      var array: any = [...metodoPago, objeto];
      setMetodoPago(array);
      console.log("hola", metodoPago); 
      var montos: any = metodoPago.map((e: any) => e.monto);
      var sum: any = montos.reduce((a: any, b: any) => a + b, 0);
      setValues({
        ...values,
        montototal: orden.montototal - sum,
      });console.log("holaaaaaaaaaaaaaaaaa", sum)

      putOrden(values, headers);
      console.log("hola", metodoPago);
      orden.montototal = orden.montototal - sum;
      setTotalOrden(orden.montototal-sum)
    
  };
  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-1  flex-row"
          role="tablist"
        >
          <li className="-mb-pxlast:mr-0 flex-auto text-center">
            <a
              className={
                "text-lg uppercase px-5 py-3 rounded-t-lg shadow-lg block leading-normal " +
                (openTab === 1
                  ? "border-t-4 border-[#77B327] bg-white text-[#77B327]"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Editar Orden
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-lg uppercase px-5 py-3 rounded-t-lg shadow-lg  block leading-normal " +
                (openTab === 2
                  ? "border-t-4 border-blue-600 bg-white text-blue-600 text-2xl"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Gestionar Pagos
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full  rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className=" ">
                  <div className="bg-white p-5 text-start text-2xl rounded">
                    <div className="relative flex justify-end mb-10 bg-[#77B327] p-5 rounded">
                      <button
                        className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center "
                        onClick={handleCloseModal}
                      >
                        <MdArrowBack />
                      </button>
                      <div className="flex text-end">
                        <b className="flex text-end">Orden: :</b>
                        {orden.facturanum}
                      </div>
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
                      {orden.operacion === "colocacion" ? (
                        <div className="ml-2">
                          <b className="text-gray-600">Dirección</b>
                          <h1>{orden.lugardecolocacion}</h1>
                        </div>
                      ) : (
                        ""
                      )}
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
                          <h1>{orden.montototal - orden.seña}</h1>
                        </div>
                      </div>
                      <div className="ml-2 border-b-4 border-blue-600 text-center ">
                        <b className="text-gray-600">Total</b>
                        <h1>{orden.montototal}</h1>
                      </div>
                    </div>
                    <hr />
                    <div className=" ">
                      <b className="justify-center flex m-5">Carteles</b>
                      <br />
                      <div className="flex grid sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
                        {orden.carteles.map((e: any) => (
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
                    </div>
                    <b className="text-black flex justify-center m-5">
                      Observaciones
                    </b>
                    <div>
                      <div className="text-lg flex p-5 grid mr-5 ">
                        <h1>{orden.observaciones}</h1>
                      </div>
                    </div>
                  </div>
                  <h1 className="flex justify-center text-lg border-b-2 p-5 ">
                    Contacto
                  </h1>
                  <div className="flex ">
                    <div className="flex justify-end grid p-5 sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
                      <div className="m-5 text-xl ">
                        <p>Email</p>
                        <h1>{cliente.email}</h1>
                      </div>
                      <div className="m-5 text-xl">
                        <p className="flex justify-end">Telefono</p>
                        <h1 className="flex justify-end">{cliente.telefono}</h1>
                      </div>
                      <div className="flex justify-end mt-3">
                        <div className="m-7 text-2xl">
                          <a
                            href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria`}
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
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <div className="  ">
                  <div className="p-5">
                    <div className="bg-white text-start text-2xl rounded">
                      <div className="relative flex justify-end mb-10 bg-[#77B327] p-5 rounded">
                        <button
                          className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center "
                          onClick={handleCloseModal}
                        >
                          <MdArrowBack />
                        </button>
                        <div className="flex text-end">
                          <b className="flex text-end">Orden: :</b>
                          {orden.facturanum}
                        </div>
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
                        {orden.operacion === "colocacion" ? (
                          <div className="ml-2">
                            <b className="text-gray-600">Dirección</b>
                            <h1>{orden.lugardecolocacion}</h1>
                          </div>
                        ) : (
                          ""
                        )}
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
                            <h1>
                              {totalOrden > 0 ? totalOrden - orden.seña : 0}
                            </h1>
                          </div>
                        </div>
                        <div className="ml-2 border-b-4 border-blue-600 text-center ">
                          <b className="text-gray-600">Total</b>
                          <h1>{orden.montototal}</h1>
                        </div>
                      </div>
                      <hr />
                      <div className="mt-5 ">
                        <div className="rounded-lg bg-gray-200 p-5">
                          <div className="borderflex w-full flex grid sm:gap-2 justify-center sm:grid-cols-2  md:gap-2 md:grid-cols-2 ">
                            <div className="flex justify-start align-center ">
                              <h1 className="py-4 ml-5">Agregar Pagos</h1>
                            </div>
                            <div className="flex justify-end cursor-pointer pr-5  align-center py-4 ">
                              <button
                                className="bg-green-600  text-white w-10 h-10 rounded-full"
                                onClick={agregarMetodo}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            
                            {metodoPago.length > 0
                              ? metodoPago.map((e: any, index: any) => (
                                  <div
                                    className="flex w-full p-2 mb-3 border-4 border-gray-300 flex justify-center  rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                                    onClick={deleteCardPago}
                                  >
                                    <div className="w-full">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Método de pago
                                      </label>
                                      <select
                                        id="small"
                                        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      >
                                        <option selected>dfdfdfd</option>
                                        <option value="Transferencia">
                                    Transferencia
                                  </option>
                                  <option value="Cheque">Cheque</option>
                                  <option value="Tarjeta">Tarjeta</option>
                                  <option value="Efectivo">Efectivo</option>
                                      </select>
                                    </div>
                                    <div className="ml-2">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Monto
                                      </label>
                                      <input
                                        className="bg-white w-full p-1 rounded"
                                        id="grid-city"
                                        type="number"
                                        placeholder="base"
                                        name="monto"
                                        value={e.monto}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <button
                                      className="rounded-full text-red-600 text-4xl text-bold w-10 h-10 mt-6 ml-2"
                                      onClick={organizarPago}
                                    >
                                      <TiDelete />
                                    </button>
                                  </div>
                                ))
                              : "Holaaaaaaaaaaaaa"}
                                  <div
                              className="flex w-full p-2 mb-3 border-4 border-gray-300 flex justify-center  rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                              onClick={deleteCardPago}
                            >
                              <div className="w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                  Método de pago
                                </label>
                                <select
                                  className="bg-white w-full p-1 rounded"
                                  id="grid-state"
                                  name="metodo"
                                  onChange={handleSelectMetodo}
                                >
                                  <option value="" defaultValue={""} disabled>
                                    Seleccionar cartel
                                  </option>
                                  <option value="Transferencia">
                                    Transferencia
                                  </option>
                                  <option value="Cheque">Cheque</option>
                                  <option value="Tarjeta">Tarjeta</option>
                                  <option value="Efectivo">Efectivo</option>
                                </select>
                              </div>
                              <div className="ml-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                  Monto
                                </label>
                                <input
                                  className="bg-white w-full p-1 rounded"
                                  id="grid-city"
                                  type="number"
                                  placeholder="base"
                                  name="monto"
                                  value={metodoObject.monto}
                                  onChange={handleChange}
                                />
                              </div>
                              <button
                                className="rounded-full text-red-600 text-4xl text-bold w-10 h-10 mt-6 ml-2"
                                onClick={organizarPago}
                              >
                                <TiDelete />
                              </button>
                            </div>
                                
                          </div>
                          <div className="flex justify-start">
                            <button
                              className="bg-blue-600 p-2 m-5 rounded-lg text-white w-40"
                              onClick={organizarPago}
                            >
                              aceptar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="flex ">
                      <div className="flex justify-end grid p-5 sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
                        <div className="m-5 text-xl ">
                          <p>Email</p>
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
                              href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria`}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsumoEdit;
