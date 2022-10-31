import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useCartel from "../../store/carteles";
import useClients from "../../store/clientes";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import usePresupuesto from "../../store/presupuesto";

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



interface Values {
  fecha: string;
  clientes: [string]; // que muestre nombre de contacto y telefono en el front
  carteles: string[];
  operacion: string;
  lugardecolocacion: string; //lugar de entrega colocación/entrega
  montototal: number;
  formadepago: string;
  plazodeentrega: number;
  fechavalida: string; //presupuesto valido hasta
  observaciones: string;
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
}

const AddNewClient = ({ setShowModal }: Props) => {
  const { addPresupuesto, success, error, closeModal } =
    usePresupuesto((state) => state);

  const { carteles, getCarteles } = useCartel((state) => state);
  const { clients, getClients } = useClients((state) => state);


  const [cartel, setCartel] = useState<Cartel>({
    cant: 1,
    name: "",
    base: 0,
    altura: 0,
    medidas: 0,
    faz: "",
    total: 0,
    estructura: "",
    otros: "",
  });
  const [values, setValues] = useState<Values>({
    fecha: "",
    clientes: [""], // que muestre nombre de contacto y telefono en el front
    carteles: [],
    operacion: "",
    lugardecolocacion: "", //lugar de entrega colocación/entrega
    montototal: 0,
    formadepago: "",
    plazodeentrega: 0,
    fechavalida: "", //presupuesto valido hasta
    observaciones: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [monto, setMonto] = useState(montofinal)


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
	
console.log("hola",cartel)

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
    addPresupuesto(values);
	console.log("hola soy un valie", values)

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
    if (value){
      cartelSelect = carteles.find((e:any)=> e.descripcion===value)
		clienteSelect = clients.find((e:any)=> e.name===value)
		console.log("hola soy un valor que si vale", cartelSelect)
			if (cartelSelect){
        var cartelId= cartelSelect._id
				setValues ({
					...values,
					carteles: [cartelId],
				})
				setCartel({
					...cartel,
					name: value
				})
				totalArray=carteles.find((cartel:any)=>cartel.costo1faz)
				
			}
			if(value==="simple"|| value==="doble"){
				setCartel({
					...cartel,
					faz:value
					
				})
				
			}
			if(value==="doble"){
				totalArray.costo1faz=multiplicar(2, totalArray.costo1faz)
			}else{
				totalArray.costo1faz=totalArray.costo1faz/2
			}
			if(clienteSelect){
        var clienteId = clienteSelect._id
				setValues({
					...values,
					clientes: [clienteId]
				})
				console.log("hola amiguitos dolos", clienteSelect)
			}else{
				console.log("holalkdjsldkjsdlksdjsldkjamiguitos dolos", clienteSelect)

			}
			
	}
  };

  const crearCartel=()=>{
	if(cartel.cant>0){
		totales=[...totales, cartel]
	console.log("totales es", totales)
	sumTotales = totales.map((a:any)=>a.total)
	montofinal = sumTotales.reduce((a:any, b:any) => a + b, 0)
	setValues({
		...values,
		montototal:montofinal
	})

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
		otros: "",
	})
  }

  useEffect(() => {
      setValues({
        fecha: "",
        clientes:[""], // que muestre nombre de contacto y telefono en el front
        carteles: [],
        operacion: "",
        lugardecolocacion: "", //lugar de entrega colocación/entrega
        montototal: 0,
        formadepago: "",
        plazodeentrega: 0,
        fechavalida: "", //presupuesto valido hasta
        observaciones: ""

      });
    getCarteles(accessToken);
    getClients(headers);
  }, []);


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
              ? "Presupuesto agregado exitosamente"
              : error
              ? "Ocurrió un error"
              : "Nuevo Presupuesto"}
          </h3>
          {success && (
            <BsFillCheckCircleFill size={55} className="text-[#77B327]" />
          )}

          {error && <MdError size={55} className="text-red-700 ml-1" />}
        </div>
                  	 {/**form cartel */}
   <div className="justify-center">
            <div>
              <h1>agregar un cartel</h1>
              <div className="flex">
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
              </div>

              <div className="flex">
                <div>
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
						cartel.base && cartel.altura?
						cartel.medidas=multiplicar(cartel.base, cartel.altura)
						:
						""
					}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-2">
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
                <div className="ml-1">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    total
                  </label>
                  <input
                    className="appearance-none  block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="number"
                    placeholder="total"
                    name="total"
                    value={
						totalArray?
						cartel.total=multiplicar(multiplicar(cartel.medidas, totalArray.costo1faz), cartel.cant)
						:
						""
					}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex">
                <div>
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
			<button
			onClick={crearCartel}
                  className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                >
                  crear insumo
                </button>
          </div>
	 {/**form cartel */}
		
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-40 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="date"
            placeholder="Fecha"
            name="fecha"
            value={values.fecha}
            onChange={handleChange}
          />

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
				name="clientes"
				value={values.clientes}
				onChange={handleSelect}
              >
                {clients.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded-full">
                +
              </button>
            </div>
            {/**Holaaa soy un cartel */}
          </div>

          {/**Holaaa soy un cartel */}
		  <br />
		  <hr/>
		  <br />

          {/**Holaaa soy un opciones */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                operación
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="operacion"
                name="operacion"
                value={values.operacion}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Colocación
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="L. colocación"
                name="lugardecolocacion"
                value={values.lugardecolocacion}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2">
                Metodo
              </label>
              <select
                value={values.formadepago}
                onChange={handleSelect}
                name="formadepago"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                <option value="master">master</option>
                <option value="visa">visa</option>
                <option value="maestro">visa</option>
                <option value="efectivo">efectivo</option>
              </select>
            </div>
          </div>
          {/**Holaaa soy un cartel */}

          {/**Holaaa soy un opciones */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Monto Total
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                placeholder="Monto total"
                name="montototal"
                value={values.montototal}
                onChange={handleChange}
              />
            </div>

            <div className="w-30 md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Entrega
              </label>
              <input
                className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                placeholder="Albuquerque"
                name="plazodeentrega"
                value={values.plazodeentrega}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Fecha Válida
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Fecha"
                name="fechavalida"
                value={values.fechavalida}
                onChange={handleChange}
              />
            </div>
          </div>
          {/**Holaaa soy un cartel */}
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
                Make it as long and as crazy as you'd like
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
