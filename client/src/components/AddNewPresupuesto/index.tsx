import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError , MdExitToApp} from "react-icons/md";
import useCartel from "../../store/carteles";
import useClients from "../../store/clientes";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import usePresupuesto from "../../store/presupuesto";
import AddCartel from '../AddCartel'
import moment from 'moment'
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

type Props = {
  setShowModal: any;
};

var totalArray:any= []
var totales:any =[]
let sumTotales:any=[]
var montofinal:any = 0
var clienteSelect:any={}
var cartelSelect:any={}
var fechaActual: any =moment().format('MM/DD/YYYY')
var totalganancia: any=0



interface Values {
  fecha: string;
  clientes: string; // que muestre nombre de contacto y telefono en el front
  carteles: string[];
  operacion: string;
  lugardecolocacion: string; //lugar de entrega colocación/entrega
  montototal: number;
  formadepago: string;
  plazodeentrega: number;
  fechavalida: string; //presupuesto valido hasta
  observaciones: string;
  contacto: string;
  porcentaje: string
}


const AddNewClient = ({ setShowModal }: Props) => {
  const { addPresupuesto, success, error, closeModal } =
    usePresupuesto((state) => state);

  const { carteles, getCarteles } = useCartel((state) => state);
  const { clientes, getClients } = useClients((state) => state);
  const [montoModificado, setMontoModificado]=useState(0)
  const [porcentaje, setPorcentaje]=useState([10,20,30,40,50,60,70,80,90,100])

  const handleSelectCliente= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      clientes: value,
    });
  }
  const handleSelectOperación= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  }
  const [values, setValues] = useState<Values>({
    fecha: fechaActual,
    clientes: "", // que muestre nombre de contacto y telefono en el front
    carteles: [],
    operacion: "",
    lugardecolocacion: "", //lugar de entrega colocación/entrega
    montototal: 0,
    formadepago: "",
    plazodeentrega: 0,
    fechavalida: "", //presupuesto valido hasta
    observaciones: "",
    contacto: "",
    porcentaje:"" 
  });
  const [errors, setErrors] = useState<any>({});
 

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
console.log("holaaaaaaaaaaaaa", values)
  };

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPresupuesto(values);
	console.log("hola soy un valie", values)
  
    setTimeout(() => {
      handleCloseModal()
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
		
  };


  useEffect(() => {
      setValues({
        fecha: fechaActual,
        clientes:"", // que muestre nombre de contacto y telefono en el front
        carteles: [],
        operacion: "",
        lugardecolocacion: "", //lugar de entrega colocación/entrega
        montototal: 0,
        formadepago: "",
        plazodeentrega: 0,
        fechavalida: "", //presupuesto valido hasta
        observaciones: "",
        contacto:"",
        porcentaje:""

      });
    getCarteles(accessToken);
    getClients(headers);
  }, []);

  const handleSelectPorcentaje= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    var holaaa: any =montoModificado
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
        montototal: montototalissimo,
        porcentaje: totalganancia
      })
    console.log("esto es el total sdsdsds ",montofinal, values)
   }
  }



  const handleSelectClient= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    clienteSelect=clientes.filter((e:any)=>e.name===value)
    if(clienteSelect){
      console.log("hola soy un cliente", clienteSelect, clienteSelect[0].name)
      setValues({
        ...values,
        clientes: clienteSelect[0].name
      });
    }
  }
  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 overflow-auto my-20 ">
    <div className="p-6 space-y-4 sm:p-8">
   
      <div className="flex border-b-[#77B327] border-b-4 rounded ">
     
    <div
         className={`flex items-center w-full justify-start p-5 ${
           success
             ? "bg-white"
             : error
             ? "bg-red-300"
             : ""
         }`}
       >
         <h3
           className={`md:text-3xl sm:text-lg font-semibold text-center ${
             success
               ? "text-[#77B327]"
               : error
               ? "text-red-700"
               : "text-zinc-800"
           }`}
         >
           {success
             ? "Presupuesto exitosamente"
             : error
             ? "Ocurrio un error"
             : "Crear Presupuesto"}
         </h3>
         {success && (
           <BsFillCheckCircleFill
             size={55}
             className='text-[#77B327]'
           />
         )}
 
         {error && (
           <MdError size={55} className='text-red-700 ml-1' />
         )}
       </div>
       <button
        className='flex text-end m-6 sm:m-2 text-black sm:mt-5 md:text-3xl pr-7 h-10  flex text-end justify-end  w-full '
        onClick={handleCloseModal}
      >
        <MdExitToApp/>
      </button> 
    </div>
     
      {/**form cartel */}
<AddCartel values ={values} setValues={setValues} montoModificado={montoModificado} setMontoModificado={setMontoModificado}/>
      {/**form cartel */}


      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
    
        
          {/**primera columna  */}

          <div className="flex  grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2 ">
         <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
         <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="string"
            placeholder="hola"
            name="fecha"
            value={values.fecha=fechaActual}
            onChange={handleChange}
          />
        </div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="clientes"
                value={values.clientes}
                onChange={handleSelectClient}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

         </div>
            <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
            <div className="w-full  mb-6 md:mb-0">
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
            <div className=" w-full">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      contacto
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      type="text"
      placeholder="Contacto"
      name="contacto"
      value={values.contacto}
      onChange={handleChange}
    />
  </div>
            </div>
          </div>
          

          {/**segunda columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-2 md:grid-cols-2">
          {
            values.operacion==="retiro"
            ? ""
            :
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
          }

            <div className="w-full mb-6">
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

           
          </div>



          <div className="flex flex-wrap-mx-3">
          
          
          </div>
          {/** ultima comuna */}
        <div className=" mt-2 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
          <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
          
          
          
            
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
                values.montototal
              }
              onChange={handleChange}
            />
          </div>

        
        
       
          </div>
          <div className="flex flex-wrap-mx-3">

<div className="w-full">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  Fecha
</label>
<input
  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="grid-first-name"
  type="date"
  placeholder="hola"
  name="fechavalida"
  value={values.fechavalida}
  onChange={handleChange}
/>
</div>

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

export default AddNewClient;
