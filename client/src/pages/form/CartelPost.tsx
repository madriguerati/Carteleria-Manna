import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCartel from "../../store/carteles";
import useUser from "../../store/user";
import useInsumo from "../../store/insumo";
import useLocalStorage from "./../../hooks/useLocalStorage";

const CartelPost = () => {
  const { cartel, success, postCartel } = useCartel((state) => state);

  const [accessToken] = useLocalStorage();

  const { insumos, getInsumos } = useInsumo((state) => state);

  const [resultado, setResultado] = useState(0);

  const navigate = useNavigate();

  var insumoparte: any = {};
  var [costoInsumo, setCostoInsumo] = useState(0);
  const [unidadInsumo, setUnidadInsumo] = useState(0);
  var faz: any = ""
  var name: any = ""
  var arregloInsumos:any=[]

//

  const [values, setValues] = useState({

    descripcion: "",
    costo1: "",
    costo2: "",
    insumos: [''],
  });
  const [addInsumo, setAddInsumo] = useState({
    name:"",
    costo: "",
    faz: "simple",
    cant1faz: "",
    cant2faz: "",
    unidad: "",
  });

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };


  /** area de  insumos */
  const addInsumoCartel = ()=>{
    setValues({
      ... values,
      [insumos]: addInsumo
    })
    console.log("hoal este es mi value", values.insumos, arregloInsumos)
  }
 

  const handleChangeInsumo = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const { name, value } = e.currentTarget;
    setAddInsumo({
      ...addInsumo,
      [name]: value,
    });
console.log("hola", value, insumos)
    insumoparte = insumos.filter(
      (element: any) => element.name === value
    );
    setCostoInsumo(insumoparte[0].costo);
    setUnidadInsumo(insumoparte[0].unidad);
 
    
  };

  const handleSelectInsumo = (e: any) => {
    
  };
  /** area de  insumos */

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    postCartel(values, accessToken);
  };
  useEffect(() => {
    getInsumos(accessToken);
    console.log("hola", addInsumo, values)
  }, []);



  const handleSelectFaz = (e: any) => {
  faz = e.target.value
  name= insumoparte[0].name

  };

  return (
    <div className="flex">
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-4xl text-center font-bold">
              Crear/actualizar Cartel
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col mt-4">
              <input
                type="text"
                name="descripcion"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="descripción"
                value={values.descripcion}
                onChange={handleChange}
              />
              <input
                type="number"
                name="costo1"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="costo con 1 faz"
                value={values.costo1}
                onChange={handleChange}
              />
              <input
                type="number"
                name="costo2"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="costo con 2 faz"
                value={values.costo2}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center items-center font-medium focus:outline-none"
              >
                crear cartel
              </button>
            </form>

            <div className="flex flex-col mt-4">
                <div className="flex">
                  <select
                    onChange={handleChangeInsumo}
                    name="name"
                    className="px-4  py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  >
                    <option  disabled>
                      Seleccionar insumo
                    </option>
                    {insumos.map((e: any) => (
                      <option value={e.name}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="flex">
                  <input
                    type="number"
                    name="costo"
                    className="px-1 mx-3 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="costo"
                    value={
                      costoInsumo?
                      addInsumo.costo=costoInsumo
                      :
                      "no hay costo del insumo"
                    }
                    onChange={handleChangeInsumo}
                  />
                  <input
                    type="number"
                    name="unidad"
                    className="px-1 mx-3 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="unidad"
                    value={
                      unidadInsumo?
                      addInsumo.unidad=unidadInsumo
                      :
                      "hola"
                    }
                    onChange={handleChangeInsumo}
                  />

                  <select
                  name="faz"
                  value={addInsumo.faz}
                  selected={false} 
                  onChange={handleChangeInsumo}
                  >
                    <option disabled>Seleccionar insumo</option>
                    <option value="simple">simple</option>
                    <option value="doble">doble</option>
                  </select>
                </div>
                <br />
                <div className="flex">
                  <input
                    type="number"
                    name="cant1faz"
                    className="px-1 mx-3 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="unidad 1 faz"
                    value={addInsumo.cant1faz}
                    onChange={handleChangeInsumo}
                  />
                  <input
                    type="number"
                    name="cant2faz"
                    className="px-1 mx-3 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="unidad 2 faz"
                    value={addInsumo.cant2faz}
                    onChange={handleChangeInsumo}
                  />
                </div>
                <button
                onClick={addInsumoCartel}
                  className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                >
                  crear insumo
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartelPost;
