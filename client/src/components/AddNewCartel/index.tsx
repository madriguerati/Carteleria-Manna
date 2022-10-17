import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useCartel from "../../store/carteles";
import useInusmo from '../../store/insumo';
import useHeaders from "../../hooks/useHeaders";

import useLocalStorage from "../../hooks/useLocalStorage";

const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

var insumoparte:any=""
var costoArray:any=""
var unidadArray:any=""
var Arraycosto1faz:any=[]
var totalcosto1faz:any=0;

var Arraycosto2faz:any=[]
var totalcosto2faz:any=0;



type Props = {
  setShowModal: any;
};

interface Values {
  descripcion: string;
  costo1: number;
  consto2: number;
  insumos: string;
}

const AddNewCartel = ({ setShowModal}: Props) => {
  const { addCartel, success, error, closeModal} = useCartel(
    (state) => state
  );
  const { insumos, getInsumos } = useInusmo(
    (state) => state
  );
  const [values, setValues] = useState<Values>({
    descripcion: "",
        costo1faz: 0,
        costo2faz: 0,
        insumosArray: []
  });


  const [insumo, setInsumo] = useState({
    name:"",
    costo: "",
    faz: "simple",
    cant1faz: "",
    cant2faz: "",
    unidad: "",
    costox1faz: "",
    costox2faz:''
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /** insumos */

  const handleChangeInsumo = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const { name, value } = e.currentTarget;
    setInsumo({
      ...insumo,
      [name]: value,
    });
    insumoparte = insumos.filter(
        (element: any) => element.name === value
      );
      console.log("hola", insumoparte)
      costoArray = insumoparte[0].costo
      unidadArray = insumoparte[0].unidad
}

const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

const addInsumoCartel = ()=>{
    setValues({
      ... values,
      ['insumosArray']:[...values.insumosArray, insumo]
      
    })
  if (insumo.cant1faz) {
    var suma1 = parseInt(insumo.costox1faz)
    Arraycosto1faz=[...Arraycosto1faz, suma1]
    totalcosto1faz=  Arraycosto1faz.reduce((a:any, b:any) => a + b, 0)

  }else{
    totalcosto1faz= 0
  }
  if (insumo.cant2faz) {
    var suma2 = parseInt(insumo.costox2faz)
    Arraycosto2faz=[...Arraycosto2faz, suma2]
    totalcosto2faz=  Arraycosto2faz.reduce((a:any, b:any) => a + b, 0)
  }else{
    totalcosto2faz=0
  }
  setInsumo({
    name:"",
    costo: "",
    faz: "simple",
    cant1faz: "",
    cant2faz: "",
    unidad: "",
    costox1faz: "",
    costox2faz:''
  })
  }



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
    addCartel(values);
    setValues({
      descripcion: "",
      costo1faz: 0,
      costo2faz: 0,
      insumosArray: []
    })
    

    setTimeout(() => {
      closeModal();
    }, 2000);

    totalcosto1faz=0;
    totalcosto2faz=0;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();



  };

  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  // 	let { value } = e.currentTarget;

  // 	setValues({
  // 		...values,
  // 		roles: [value],
  // 	});
  // };

  useEffect(() => {
    success &&
      setValues({
        descripcion: "",
        costo1faz: 10,
        costo2faz: 10,
        insumosArray: ['']
      });
      getInsumos(headers)
  }, [success]);


  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
      <div className=" sm:p-8">
        <button
          className="absolute right-4 top-6 bg-white text-gray-500 text-2xl w-10 h-10 rounded-full flex justify-center border border-gray-300"
          onClick={handleCloseModal}
        >
          x
        </button>
        
        <div
					className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${
						success
							? "bg-[#c2e593]"
							: error
							? "bg-red-300"
							: "bg-[#77B327]"
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
							? "Cliente agregado exitosamente"
							: error
							? "Ocurrio un error"
							: "Nuevo Cliente"}
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

        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <input
            type="text"
            name="descripcion"
            className="px-4 py-3 w-50 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="descripcion"
            value={values.descripcion}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username}</p>
          )}
          <div className="flex gap-4">
            <div className="w-full">
              <input
                type="text"
                name="costo1"
                className="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Costo de 1 faz"
                value={
                    Arraycosto1faz?
                    values.costo1faz=totalcosto1faz
                    :
                    0
                }
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="costo2"
                className="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Costo de 2 faz"
                value={
                    Arraycosto2faz?
                    values.costo2faz=totalcosto2faz
                    :
                    0
                }
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>
         
         <div className="flex flex-wrap justify-end m-5 border-t border-solid border-slate-200 rounded-b">
         {
            values.insumosArray.map(e=>(
                <div className="bg-[#0000FF] text-white active:bg-[#77B327] mt-2 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150">{e.name}</div>
            ))

          }
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
        <div className=" justify-center">
        <div>
        <h1 className="text-3xl font-semibold text-start">AGREGAR INSUMOS</h1>
            <select
                    onChange={handleChangeInsumo}
                    name="name"
                    className="px-4  py-3 mr-1 w-60 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  >
                    <option  disabled>
                      Seleccionar insumo
                    </option>
                    {insumos.map((e: any) => (
                      <option value={e.name}>{e.name}</option>
                    ))}
                  </select>

           <input
            type="number"
            name="costo"
            className="px-4 py-3 mt-4 mr-1 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="costo"
            value={
                costoArray?
                insumo.costo=costoArray
                :
                "costo"
            }
            onChange={handleChangeInsumo}
          />

          <input
            type="text"
            name="unidad"
            className="px-4 py-3 mt-4 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="unidad"
            value={
                unidadArray?
                insumo.unidad=unidadArray
                :
                "unidad"
            }
            onChange={handleChangeInsumo}
          />
        </div>
          <select
           name="faz"
            value={insumo.faz}
            selected={false} 
            className="px-4 py-3 mt-4 w-20 mr-1 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            onChange={handleChangeInsumo}
            >
                    <option disabled>Seleccionar insumo</option>
                    <option value="simple">simple</option>
                    <option value="doble">doble</option>
                  </select>
           
           <input
            type="text"
            name="cant1faz"
            className="px-4 py-3 mt-4 w-20 mr-1 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="C. 1 faz"
            value={insumo.cant1faz}
            onChange={handleChangeInsumo}
          />

          <input
            type="text"
            name="cant2faz"
            className="px-4 py-3 mt-4 w-20 rounded-md mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="C. 2 faz"
            value={insumo.cant2faz}
            onChange={handleChangeInsumo}
          />
          <input
            type="text"
            name="costox1faz"
            className="px-4 py-3 mt-4 w-20 rounded-md  mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="cantidad de 1 faz"
            value={insumo.cant1faz?
                insumo.costox1faz=multiplicar(insumo.cant1faz, insumo.costo)
                :
                "0"
                }
            onChange={handleChangeInsumo}
          />
    
        <input
            type="text"
            name="costox2faz"
            className="px-4 py-3 mt-4 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="cant 2 faz"
            value={insumo.cant2faz?
            insumo.costox2faz=multiplicar(insumo.cant2faz, insumo.costo)
            :
            "0"
            }
            onChange={handleChangeInsumo}
          />

          <button
                onClick={addInsumoCartel}
                  className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                >
                  crear insumo
                </button>
          </div>
      </div>
    </div>
  );
};

export default AddNewCartel;
