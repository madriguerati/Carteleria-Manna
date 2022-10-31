import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import useCartel from "../../store/carteles";
import useInusmo from '../../store/insumo';
import useHeaders from "../../hooks/useHeaders";

import useLocalStorage from "../../hooks/useLocalStorage";

const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

var insumoparte: any = ""
var costoArray: any = ""
var unidadArray: any = ""
var Arraycosto1faz: any = []
var totalcosto1faz: any = 0;
var nameInsumo: any = ""
var Arraycosto2faz: any = []
var totalcosto2faz: any = 0;
var insumosCartel: any = 0



type Props = {
  setShowModal: any;
};

interface Values {
  descripcion: string;
  costo1faz: number;
  costo2faz: number;
  insumosArray: string[];
}

interface Insumo {
  name: string,
  costo: number,
  faz: string,
  cant1faz: number,
  cant2faz: number,
  unidad: string,
  costox1faz: number,
  costox2faz: number
}

const AddNewCartel = ({ setShowModal }: Props) => {
  const { addCartel, success, error, closeModal } = useCartel(
    (state) => state
  );
  const { insumos, getInsumos } = useInusmo(
    (state) => state
  );
  const [values, setValues] = useState<Values>({
    descripcion: "",
    costo1faz: 0,
    costo2faz: 0,
    insumosArray: [""]
  });


  const [insumo, setInsumo] = useState<Insumo>({
    name: "",
    costo: 0,
    faz: "",
    cant1faz: 0,
    cant2faz: 0,
    unidad: "",
    costox1faz: 0,
    costox2faz: 0
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

  }

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

  const addInsumoCartel = () => {
    console.log(insumo, values)
    setValues({
      ...values,
      insumosArray: [...values.insumosArray, insumo.name]
    })
    if (insumo.cant1faz) {
      var suma1 = insumo.costox1faz
      Arraycosto1faz = [...Arraycosto1faz, suma1]
      totalcosto1faz = Arraycosto1faz.reduce((a: any, b: any) => a + b, 0)

    } else {
      console.log("hola")
    }
    if (insumo.cant2faz) {
      var suma2 = insumo.costox2faz
      Arraycosto2faz = [...Arraycosto2faz, suma2]
      totalcosto2faz = Arraycosto2faz.reduce((a: any, b: any) => a + b, 0)
    } else {
      console.log("hola")
    }
    setInsumo({
      name: "",
      costo: 0,
      faz: "",
      cant1faz: 0,
      cant2faz: 0,
      unidad: "",
      costox1faz: 0,
      costox2faz: 0
    })
    console.log("holaaaaa")
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
      insumosArray: [""]
    })


    setTimeout(() => {
      closeModal();
    }, 2000);

    totalcosto1faz = 0;
    totalcosto2faz = 0;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();



  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    console.log(insumo)
      if(value==="simple"){
         return setInsumo({
          ...insumo,
          faz:"simple",
          cant2faz:0
         })
      }else if(value==="doble"){
       return setInsumo({
        ...insumo,
        faz:"doble"
       })
      }else{
        console.log("soy un", value)
      }

      insumoparte = insumos.filter((e: any) => e.name === value)
      if (insumoparte) {
        costoArray = insumoparte[0].costo
      unidadArray = insumoparte[0].unidad
      nameInsumo = insumoparte[0].name
        setInsumo({
          ...insumo,
          costo: costoArray,
          unidad: unidadArray,
          name: nameInsumo
        })
   

    }
  }
  useEffect(() => {
    success &&
      setValues({
        descripcion: "",
        costo1faz: 0,
        costo2faz: 0,
        insumosArray: [""]
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
          className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${success
              ? "bg-[#c2e593]"
              : error
                ? "bg-red-300"
                : "bg-[#77B327]"
            }`}
        >
          <h3
            className={`text-3xl font-semibold text-center ${success
                ? "text-[#77B327]"
                : error
                  ? "text-red-700"
                  : "text-zinc-800"
              }`}
          >
            {success
              ? "Cartel agregado exitosamente"
              : error
                ? "Ocurrio un error"
                : "Nuevo Cartel"}
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
                type="number"
                name="costo1faz"
                className="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Costo de 1 faz"
                value={
                  Arraycosto1faz ?
                    values.costo1faz = totalcosto1faz
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
                type="number"
                name="costo2faz"
                className="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Costo de 2 faz"
                value={
                  Arraycosto2faz ?
                    values.costo2faz = totalcosto2faz
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
              values.insumosArray.map((e: any) => (
                <div className="bg-[#0000FF] text-white active:bg-[#77B327] mt-2 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150">{e}</div>
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
        <div className="justify-center">
          <div>
            <h1 className="text-3xl font-semibold text-start">AGREGAR INSUMOS</h1>
            <select
              value={insumos.name}
              onChange={handleSelect}
              name="name"

              className="px-4  py-3 mr-1 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <option value='' defaultValue={''}>
                Seleccionar insumo
              </option>
              {insumos.map((e: any) => (
                <option key={e.id} value={e.name}>{e.name}</option>
              ))}
            </select>

            <input
              type="number"
              name="costo"
              className="px-4 py-3 mt-4 mr-1 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
              placeholder="costo"
              value={
                insumo.costo?
                  insumo.costo
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
                unidadArray ?
                  insumo.unidad = unidadArray
                  :
                  "unidad"
              }
              onChange={handleChangeInsumo}
            />
          </div>
          <select
              value={
                insumo.faz?
                insumo.faz
                :
                "simple"
              }
              onChange={handleSelect}
              name="insumo"
              className="px-4  py-3 mr-1 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
            <option value="simple">simple</option>
            <option value="doble">doble</option>
          </select>

          <input
            type="number"
            name="cant1faz"
            className="px-4 py-3 mt-4 w-20 mr-1 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="C. 1 faz"
            value={insumo.cant1faz}
            onChange={handleChangeInsumo}

          />

           
{/**condiciolan de costos doble o simples */}
{
  insumo.faz==="doble"?

  <input
  type="number"
  name="cant2faz"
  className="px-4 py-3 mt-4 w-20 rounded-md mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
  placeholder="C. 2 faz"
  value={insumo.cant2faz}
  onChange={handleChangeInsumo}
/>
:
""

}
{/**condiciolan de costos doble o simples */}

          <input
            type="number"
            name="costox1faz"
            className="px-4 py-3 mt-4 w-20 rounded-md  mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="cantidad de 1 faz"
            value={
              insumo.cant1faz ?
                insumo.costox1faz = multiplicar(insumo.cant1faz, insumo.costo)
                :
                "costo"
            }
            onChange={handleChangeInsumo}
          />
{/**condiciolan de costos doble o simples */}
{
  insumo.faz==="doble"?
  <input
  type="number"
  name="costox2faz"
  className="px-4 py-3 mt-4 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
  placeholder="costo 2 faz"
  value={
    insumo.cant2faz ?
      insumo.costox2faz = multiplicar(insumo.cant2faz, insumo.costo)
      :
      "costo"
  }
  onChange={handleChangeInsumo}
/>
:
""
}
{/**condiciolan de costos doble o simples */}

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
