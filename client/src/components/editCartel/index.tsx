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
  cartel: any;
};
const ClienteEdit = ({ setShowModal2, cartel }: Props) => {

  const [values, setValues] = useState({
    descripcion: cartel.descripcion,
    id: cartel.id,
    costo1faz: 0,
    costo2faz: 0,
    category: [""],
    insumosArray: cartel.insumosArray,
  });
  var insumoparte: any = "";
  var costoArray: any = "";
  var unidadArray: any = "";
  var Arraycosto1faz: any = [];


  var nameInsumo: any = "";
  var Arraycosto2faz: any = [];
  var insumosCartel: any = 0;
  var Arraycosto1fazSup: any =values.insumosArray.map((e:any)=>e.costox1faz)
  var Arraycosto2fazSup: any =values.insumosArray.map((e:any)=>e.costox2faz)


  var array:any =  []
var c1f:any=0
var c2f:any=0

useEffect(() => {
  getInsumos(headers)
  console.log("hola", Arraycosto1fazSup)
}, []);

  const { success, putCarteles, closeModal, error, loading } = useCarteles(
    (state) => state
  );
  const { insumos, getInsumos } = useInusmo((state) => state);
  const [token] = useLocalStorage();
  const [category, setCategory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const [totalcosto1faz, setTotalcosto1faz] = useState(cartel.costo1faz)
  const [totalcosto2faz, setTotalcosto2faz] = useState(cartel.costo2faz)

  const [click, setClick] = useState(false)


  const navigate = useNavigate();

 
  const [insumo, setInsumo] = useState({
    name: "",
    costo: 0,
    faz: "",
    cant1faz: 0,
    cant2faz: 0,
    unidad: "",
    costox1faz: 0,
    costox2faz: 0,
  });
  const [hola, setHola] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("hola soy un cambio", values);
  };

  const handleCloseModal = () => {
    setShowModal2(false);
    closeModal();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
        
        Swal.fire({
          title: '¿Estas seguro?',
          text: "Queres hacer estos cambios",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, modificarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            putCarteles(values, token);
            Swal.fire(
              'Modificado'
            )
          }
        })
     
    
   
  };

  const addInsumoCartel = () => {
    var comprobacionInsumos: any = values.insumosArray.map((e:any)=>e.name)
    if(comprobacionInsumos.includes(insumo.name)){
    }else{
        var suma1 = insumo.costox1faz;
      Arraycosto1faz = [...Arraycosto1faz, suma1];
      Arraycosto1fazSup=[...Arraycosto1fazSup, suma1]
      var newtotalcosto1faz = Arraycosto1fazSup.reduce((a: any, b: any) => a + b, 0);
        var suma2 = insumo.costox2faz;
        Arraycosto2faz = [...Arraycosto2faz, suma2];
        var newtotalcosto2faz = Arraycosto2fazSup.reduce((a: any, b: any) => a + b, 0);
        setTotalcosto2faz(newtotalcosto2faz)
      setTotalcosto1faz(newtotalcosto1faz)


    
      setValues({
        ...values,
        insumosArray: [...values.insumosArray, insumo],
      })
    }
    
    setInsumo({
      name: "",
      costo: 0,
      faz: "",
      cant1faz: 0,
      cant2faz: 0,
      unidad: "",
      costox1faz: 0,
      costox2faz: 0,
    });
  };
 
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    console.log(insumo);
    if (value === "simple") {
      return setInsumo({
        ...insumo,
        faz: "simple",
        cant2faz: 0,
      });
    } else if (value === "doble") {
      return setInsumo({
        ...insumo,
        faz: "doble",
      });
    } else {
      console.log("soy un", value);
    }

    insumoparte = insumos.filter((e: any) => e.name === value);
    if (insumoparte) {
      costoArray = insumoparte[0].costo;
      unidadArray = insumoparte[0].unidad;
      nameInsumo = insumoparte[0].name;
      setInsumo({
        ...insumo,
        costo: costoArray,
        unidad: unidadArray,
        name: nameInsumo,
      });
    }
  };

  const categoryForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;

    console.log("holaaaaaaaaaaaa", value);
    if (value === "IMPRESIONES") {
      if (values.category.includes(value)) {
        setValues({
          ...values,
          category: values.category.filter((e: any) => e !== value),
        });
      } else {
        setValues({
          ...values,
          category: [...values.category, value],
        });
        console.log("holaaaa", values.category);
      }
    } else {
      if (values.category.includes(value)) {
        setValues({
          ...values,
          category: values.category.filter((e: any) => e !== value),
        });
        console.log("dddddddddddddddd", values.category);
      } else {
        setValues({
          ...values,
          category: [...values.category, value],
        });
        console.log("holaaaa", values.category);
      }
      console.log("holaaaa", values.category);
    }
  };
  
 
  const agregarCartel = () => {
    hola == false ? setHola(true) : setHola(false);
  };

  /** insumos */

  const handleChangeInsumo = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setInsumo({
      ...insumo,
      [name]: value,
    });
  };
  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

  const deleteInsumos =(e:any)=>{
    array = values.insumosArray.filter((item:any)=>item.name!==e.name)
    
    Arraycosto1faz =array
    Arraycosto2faz =array
    c1f =totalcosto1faz-e.costox1faz
    c2f =totalcosto2faz-e.costox2faz
   console.log("jaaaaaaaaaaaaghghghghghaaaa", c2f)
    
    
    setTotalcosto1faz(c1f)
    setTotalcosto2faz(c2f)

      setValues({
        ...values,
        insumosArray: array,
        costo1faz: c1f,
        costo2faz: c2f

      })
      console.log("hola perrrisssss", array.length, totalcosto1faz, cartel.costo1faz)
      if(array.length===0){
        setClick(true)
        console.log(cartel.costo1faz, click)
      }
      console.log(cartel.costo1faz, click)
      console.log("jajajajaja", cartel.costo1faz)
  console.log("hola", Arraycosto1fazSup)
  if(c1f<0 || c2f<0){
    setTotalcosto1faz(0)
    setTotalcosto2faz(0)
    
  } 
   
    }

  return (
    
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
              ? "Insumo editado exitosamente"
              : error
              ? "Ocurrio un error"
              : "Editar Insumo"}
          </h3>
          {success && (
            <BsFillCheckCircleFill size={55} className="text-[#77B327]" />
          )}

          {error && <MdError size={55} className="text-red-700 ml-1" />}
        </div>
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
          className="justify-center"
          style={hola === false ? { display: "none" } : { cursor: "pointer" }}
        >
          <div>
            <h1 className="text-3xl font-semibold text-start">
              AGREGAR INSUMOS
            </h1>
            <select
              value={insumo.name}
              onChange={handleSelect}
              name="name"
              className="px-4  py-3 mr-1 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <option value="" defaultValue={""}>
                Seleccionar insumo
              </option>
              {insumos?.map((e: any) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="costo"
              className="px-4 py-3 mt-4 mr-1 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
              placeholder="costo"
              value={insumo.costo ? insumo.costo : "costo"}
              onChange={handleChangeInsumo}
            />

            <input
              type="text"
              name="unidad"
              className="px-4 py-3 mt-4 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
              placeholder="unidad"
              value={unidadArray ? (insumo.unidad = unidadArray) : "unidad"}
              onChange={handleChangeInsumo}
            />
          </div>
          <select
            value={insumo.faz ? insumo.faz : "simple"}
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
          {insumo.faz === "doble" ? (
            <input
              type="number"
              name="cant2faz"
              className="px-4 py-3 mt-4 w-20 rounded-md mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
              placeholder="C. 2 faz"
              value={insumo.cant2faz}
              onChange={handleChangeInsumo}
            />
          ) : (
            ""
          )}
          {/**condiciolan de costos doble o simples */}

          <input
            type="number"
            name="costox1faz"
            className="px-4 py-3 mt-4 w-20 rounded-md  mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="cantidad de 1 faz"
            value={
              insumo.cant1faz
                ? (insumo.costox1faz = multiplicar(
                    insumo.cant1faz,
                    insumo.costo
                  ))
                : "costo"
            }
            onChange={handleChangeInsumo}
          />
          {/**condiciolan de costos doble o simples */}
          {insumo.faz === "doble" ? (
            <input
              type="number"
              name="costox2faz"
              className="px-4 py-3 mt-4 w-20 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
              placeholder="costo 2 faz"
              value={
                insumo.cant2faz
                  ? (insumo.costox2faz = multiplicar(
                      insumo.cant2faz,
                      insumo.costo
                    ))
                  : "costo"
              }
              onChange={handleChangeInsumo}
            />
          ) : (
            ""
          )}
          {/**condiciolan de costos doble o simples */}

          <button
            onClick={addInsumoCartel}
            className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
          >
            crear insumo
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <div className="flex">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                name
              </label>
              <input
                type="text"
                name="descripcion"
                className="px-4 py-3 w-80 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={values.descripcion}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="mt-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                costo 1 faz
              </label>
              <input
                type="text"
                name="costo1faz"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={totalcosto1faz?
                values.costo1faz=totalcosto1faz
                :
                0
                }
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="m-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                costo 2 faz
              </label>
              <input
                type="text"
                name="costo2faz"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={totalcosto2faz?
                  values.costo2faz=totalcosto2faz
                  :
                  0
                  }
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
          </div>
          <div className="flex">
            {category.map((e: any) => (
              <div
                className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                key={e.id}
              >
                <div className="flex items-center pl-3">
                  <input
                    id={e}
                    type="checkbox"
                    value={e}
                    onChange={(e: any) => categoryForm(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    key={e.id}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {e}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-start m-5 rounded-b">
            {values.insumosArray.map((e: any) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => deleteInsumos(e)}
                className="bg-[#0000FF] text-white active:bg-[#77B327] mt-2 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
              >
                {e.name}
              </div>
            ))}
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
  );
};

export default ClienteEdit;
