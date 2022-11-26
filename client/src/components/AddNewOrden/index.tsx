import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useCartel from "../../store/carteles";
import useClients from "../../store/clientes";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import usePresupuesto from "../../store/presupuesto";
import useOrdenes from "../../store/ordenes";
import useUser from "../../store/user";
import moment from 'moment'
import { value } from "rumble-charts/types/helpers";

const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

type Props = {
  setShowModal: any;
};

var totalArray: any = [];
var totales: any = [];
let sumTotales: any = [];
var montofinal: any = 0;
var clienteSelect: any = {};
var cartelSelect: any = {};
var obreros: any = [];
var fechaActual: any =moment().format('MM/DD/YYYY')

interface Values {
  idUser: string;
  fecha: string;
  cliente: string;
  contacto: string; //nombre de contacto
  carteles: object[];
  operacion: string;
  lugardecolocacion: string;
  montototal: number;
  seña: number;
  formadepago: string;
  fechaentrega: string;
  facturanum: string;
  plazodeentrega: string;
  observaciones: string;
  porcentaje: number;
}
interface Cartel {
  cant: number;
  name: string;
  base: number;
  altura: number;
  medidas: number;
  faz: string;
  total: number;
  estructura: string;
  otros: string;
  category: string[]
}

const AddNewOrden = ({ setShowModal }: Props) => {
  const { postOrden, success, error, closeModal } = useOrdenes(
    (state) => state
  );

  const { carteles, getCarteles } = useCartel((state) => state);
  const { clientes, getClients } = useClients((state) => state);
  const { getUsers2, users, logout, user } = useUser((state) => state);
  const [hola, setHola] = useState(false);
const [porcentaje, setPorcentaje]=useState([10,20,30,40,50,60,70,80,90,100])
  const [cartel, setCartel] = useState<Cartel>({
    cant: 1,
    name: "",
    base: 0,
    altura: 0,
    medidas: 0,
    faz: "",
    total: 0,
    estructura: "",
    category: [],
    otros: "",
  });
  const [values, setValues] = useState<Values>({
    idUser: user._id,
    fecha: "",
    cliente: "",
    contacto: "", //nombre de contacto
    carteles: [],
    operacion: "",
    lugardecolocacion: "",
    seña: 0,
    montototal: 0,
    formadepago: "",
    fechaentrega: "",
    facturanum: "",
    plazodeentrega: "",
    observaciones: "",
    porcentaje: 0
  });
  const [errors, setErrors] = useState<any>({});
  const [monto, setMonto] = useState(montofinal);
  var totalganancia : any =0
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    setCartel({
      ...cartel,
      [name]: value,
    });

   
    
    console.log("esto es el total ", values.montototal)
  };

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // setErrors(
    // 	validateInfo({
    // 		...values,
    // 	})
    // );

    // const error = validateInfo(values);

    // if (Object.keys(error).length === 0) {
    // 	createNewUser(values);
    // }
    postOrden(values, headers);
    console.log("hola soy un valie", values);
 
    setValues({
      idUser: user._id,
      fecha: "",
      cliente: "",
      contacto: "", //nombre de contacto
      carteles: [],
      operacion: "",
      lugardecolocacion: "",
      seña: 0,
      montototal: 0,
      formadepago: "",
      fechaentrega: "",
      facturanum: "",
      plazodeentrega: "",
      observaciones: "",
      porcentaje: 0
    });
     
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      formadepago: value,
    });
    if (value) {
      cartelSelect = carteles.find((e: any) => e.descripcion === value);
      clienteSelect = clientes.find((e: any) => e.name === value);
      console.log("hola soy un valor que si vale", cartelSelect);
      if (cartelSelect) {
        setCartel({
          ...cartel,
          name: value,
          category: cartelSelect.category
        });
        totalArray = carteles.find((cartel: any) => cartel.costo1faz);
      }
      if (value === "simple" || value === "doble") {
        setCartel({
          ...cartel,
          faz: value,
        });
      }
      if (value === "doble") {
        totalArray.costo1faz = multiplicar(2, totalArray.costo1faz);
      } else {
        totalArray.costo1faz = totalArray.costo1faz / 2;
      }
      if (clienteSelect) {
        var clienteId = clienteSelect._id;
        setValues({
          ...values,
          cliente: clienteId,
        });
        console.log("hola amiguitos dolos", clienteSelect);
      } else {
        console.log("holalkdjsldkjsdlksdjsldkjamiguitos dolos", clienteSelect);
      }
    }
  };

  const handleSelectCliente= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      cliente: value,
    });
  }
  const handleSelectOperación= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  }
  const handleSelectPorcentaje= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    var holaaa: any =montofinal
   if(value){
    var valuesporcen: any = value
    var porcentaje: any  = 0
    var montototalissimo: 0
    totalganancia=0
    porcentaje=(valuesporcen/100)
      totalganancia = multiplicar(porcentaje, holaaa)
      montototalissimo = totalganancia + holaaa
      setValues({
        ...values,
        montototal: montototalissimo
      })
    console.log("esto es el total sdsdsds ", montototalissimo)
   }
  }

  const crearCartel = () => {
    if (cartel.cant > 0) {
      totales = [...totales, cartel];
      console.log("totales es", totales);
      sumTotales = totales.map((a: any) => a.total);
      montofinal = sumTotales.reduce((a: any, b: any) => a + b, 0);
      setValues({
        ...values,
        montototal: montofinal,
        carteles: [...values.carteles.concat(totales)]
      });
    }
    setCartel({
      cant: 1,
      name: "",
      base: 0,
      altura: 0,
      medidas: 0,
      faz: "",
      total: 0,
      estructura: "",
      category: [],
      otros: "",
    });
  };

  useEffect(() => {
    setValues({
      idUser: user._id,
      fecha: "",
      cliente: "",
      contacto: "", //nombre de contacto
      carteles: [],
      operacion: "",
      lugardecolocacion: "",
      seña: 0,
      montototal: 0,
      formadepago: "",
      fechaentrega: "",
      facturanum: "",
      plazodeentrega: "",
      observaciones: "",
      porcentaje: 0
    });
    getCarteles(accessToken);
    getClients(headers);
    getUsers2(headers);
    console.log("holaaaaaaaaaaa somo s usuariosa", user);
   
    
    obreros = users?.filter((e: any) =>
      e.roles.find((r: any) => r.name === "obrero")
    );
    console.log("hola me rio mucho de ti ", users);
   
  }, []);

  const agregarCartel = () => {
    hola == false ? setHola(true) : setHola(false);
  };
  
  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 overflow-auto my-20 ">
      <div className="p-6 space-y-4 sm:p-8">
        <button
          className="absolute right-4 top-6 bg-white text-gray-500 text-2xl w-10 h-10 rounded-full flex justify-center border border-gray-300"
          onClick={handleCloseModal}
        >
          x
        </button>
        <div
          className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${
            success ? "bg-[#c2e593]" : error ? "bg-red-300" : "bg-[#77B327]"
          }`}
        >
          <h3
            className={`text-3xl font-semibold text-center ${
              success
                ? "text-[#77B327]"
                : error
                ? "text-red-700"
                : "text-zinc-800"
            }`}
          >
            {success
              ? "Orden agregada exitosamente"
              : error
              ? "Ocurrió un error"
              : "Nueva Orden"}
          </h3>
          {success && (
            <BsFillCheckCircleFill size={55} className="text-[#77B327]" />
          )}

          {error && <MdError size={55} className="text-red-700 ml-1" />}
        </div>
        {/**form cartel */}
        <div className="justify-end">
          <h1
            onClick={agregarCartel}
            style={{ color: "blue", cursor: "pointer" }}
            className="text-start"
          >
            agregar cartel (+)
          </h1>
        </div>
        <div
          className="justify-center border-2 pl-2 pt-2" 
          style={hola === false ? { display: "none" } : { cursor: "pointer" }}
        >
          <div className="">
            <div className="flex ">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  cant
                </label>
                <input
                  className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="cant"
                  name="cant"
                  value={cartel.cant}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  cartel
                </label>
                <select
                  className="block appearance-none w-40 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="name"
                  value={cartel.name}
                  onChange={handleSelect}
                >
                  <option value="" defaultValue={""} disabled>
                    Seleccionar cartel
                  </option>
                  {carteles.map((e: any) => (
                    <option value={e.descripcion}>{e.descripcion}</option>
                  ))}
                </select>
              </div>
              <div className="ml-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  base
                </label>
                <input
                  className="appearance-none  block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="base"
                  name="base"
                  value={cartel.base}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  altura
                </label>
                <input
                  className="appearance-none ml-2 block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="altura"
                  name="altura"
                  value={cartel.altura}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  medidas
                </label>
                <input
                  className="appearance-none  block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="medidas"
                  name="medidas"
                  value={
                    cartel.base && cartel.altura
                      ? (cartel.medidas = multiplicar(
                          cartel.base,
                          cartel.altura
                        ))
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  total
                </label>
                <input
                  className="appearance-none  block w-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="total"
                  name="total"
                  value={
                    totalArray
                      ? (cartel.total = multiplicar(
                          multiplicar(cartel.medidas, totalArray.costo1faz),
                          cartel.cant
                        ))
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex">
              
              <div >
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  faz
                </label>
                <select
                  value={cartel.faz}
                  onChange={handleSelect}
                  name="faz"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="" defaultValue={""} disabled>
                    Seleccionar cartel
                  </option>
                  <option value="simple">simple</option>
                  <option value="doble">doble</option>
                </select>
              </div>
              <div className="ml-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  estructura
                </label>
                <input
                  className="appearance-none  block w-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="estructura"
                  name="estructura"
                  value={cartel.estructura}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  otros
                </label>
                <input
                  className="appearance-none  block w-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="otros"
                  name="otros"
                  value={cartel.otros}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
         <div className="justify-end flex pr-3 pb-3">
         <button
            onClick={crearCartel}
            className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-40 justify-center items-center font-medium focus:outline-none"
          >
           Agregar cartel
          </button>
         </div>
        </div>
        {/**form cartel */}

        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      
          {/**primera columna  */}

          <div className="flex flex-wrap-mx-3 ">
          <div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-20 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="string"
            placeholder="hola"
            name="fecha"
            value={values.fecha=fechaActual}
            onChange={handleChange}
          />
        </div>
            <div className="w-40 md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="clientes"
                value={values.cliente}
                onChange={handleSelectCliente}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="w-40 md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Operación
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="operacion"
                name="operacion"
                value={values.operacion}
                onChange={handleSelectOperación}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                <option value="colocacion">
                  Colocación
                </option>
                <option value="retiro">
                  Retiro en oficina
                </option>
                <option value="traslado">
                  Traslado
                </option>
                
              </select>
            </div>
          </div>
          

          {/**segunda columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-3 md:grid-cols-3">
          <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Dirección de colocación
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="D. colocación"
                name="lugardecolocacion"
                value={values.lugardecolocacion}
                onChange={handleChange}
              />
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2">
                Metodo de pago
              </label>
              <select
                value={values.formadepago}
                onChange={handleSelect}
                name="formadepago"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="" defaultValue={""} disabled>
                  seleccione método de pago
                </option>
                <option value="master">master</option>
                <option value="visa">visa</option>
                <option value="maestro">visa</option>
                <option value="efectivo">efectivo</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Fecha entrega
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Fecha"
                name="fechaentrega"
                value={values.fechaentrega}
                onChange={handleChange}
              />
            </div>
          </div>


          {/**tercera columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-3 md:grid-cols-3 ">
          
          
            
            <div className="w-full mb-6 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                porcentaje
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="operacion"
                name="porcentaje"
                value={values.porcentaje}
                onChange={handleSelectPorcentaje}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {
                  porcentaje.map((e:any)=>(
                    <option value={e}>
                  {e}
                </option>
                  ))
                }
               
                
              </select>
            </div>
              <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                seña
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Seña"
                name="seña"
                value={values.seña}
                onChange={handleChange}
              />
            </div>
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Total"
                name="montototal"
                value={
                  values.seña?
                  values.montototal+totalganancia-values.seña
                  :
                  values.montototal
                }
                onChange={handleChange}
              />
            </div>

          
          
          </div>

          
          {/**segunda columna  */}

          <div className="flex flex-wrap-mx-3">
          
          
          </div>
          {/** ultima comuna */}
          <div className="flex flex-wrap-mx-3">

          <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                factura numero
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="facturanum"
                name="facturanum"
                value={values.facturanum}
                onChange={handleChange}
              />
            </div>
            <div className="ml-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                contacto
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Contacto"
                name="contacto"
                value={values.contacto}
                onChange={handleChange}
              />
            </div>
          </div>
    
          <div className="flex flex-wrap -mx-3 mb-2">
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Observaciones
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 h-20 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="observaciones"
                name="observaciones"
                onChange={handleChange}
                value={values.observaciones}
              />
              <p className="text-gray-600 text-xs italic">
                Algo para tener en cuenta
              </p>
            </div>
          </div>

          <div className="flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewOrden;
