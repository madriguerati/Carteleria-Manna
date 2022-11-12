import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useClients from "../../store/clientes";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";

type Props = {
  setShowModal2: any;
  cartel: any;
};
const ClienteEdit = ({ setShowModal2, cartel}: Props) => {
  const { success, putClients, closeModal, error, loading } = useClients(
    (state) => state
  );
  const [token] = useLocalStorage();
  const [category, setCategory] = useState(["IMPRESIONES", "CARTELERIA"]);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    descripcion: cartel.descripcion,
    id: cartel.id,
    costo1faz: cartel.costo1faz,
    costo2faz: cartel.costo2faz,
    category:[""]
  });

  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("hola soy un cambio", values)
  };

  const handleCloseModal = () => {
    setShowModal2(false);
    closeModal();
  };
 

  const handleSubmit = (e: React.SyntheticEvent) => {
    putClients(values, token);
    handleCloseModal()
    success;
    loading
  };

  const categoryForm=(e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    
    
   
  console.log("holaaaaaaaaaaaa", value)
  if (value === "IMPRESIONES"){
    if (values.category.includes(value)){
      setValues({
        ...values,
        category: values.category.filter((e:any)=>e!==value)
      })
    }else{
  
      setValues({
        ...values,
        category: [...values.category, value]
      })
      console.log("holaaaa", values.category)
    }
  }else{
     if (values.category.includes(value)){
      setValues({
        ...values,
        category: values.category.filter((e:any)=>e!==value)
      })
      console.log("dddddddddddddddd", values.category)
    }else{
      
      setValues({
        ...values,
        category: [...values.category, value]
      })
      console.log("holaaaa", values.category)
    }
    console.log("holaaaa", values.category)
  }
  
  }
  

  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
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
                name="descripcion"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={values.costo1faz}
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
                name="descripcion"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={values.costo2faz}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
           
          </div>
          <div className="flex">
            {
              category.map((e:any)=>(
                  <div className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600" key={e.id}>
          <div className="flex items-center pl-3">
              <input 
              id={e} 
              type="checkbox" 
              
              value={e} 
              onChange={(e:any)=>categoryForm(e)}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label key={e.id} className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{e}</label>
          </div>
      </div>
                )
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteEdit;
