import useForm from '../../hooks/useForm';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartel from '../../store/carteles';
import useUser from '../../store/user';
import useInsumo from '../../store/insumo';
import useLocalStorage from "./../../hooks/useLocalStorage";




const CartelPost = () => {

    const { cartel, success, postCartel} = useCartel((state) => state);
    
    const [accessToken] = useLocalStorage()

    const {insumos, getInsumos} = useInsumo((state) => state);
    
    const [resultado, setResultado]=useState(0)
    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        descripcion:'',
        costo1: '',
        costo2: '',
        insumos: [],
    });
    const [addInsumo, setAddInsumo] = useState({
      costo:'',
      cant1faz:'',
      result1faz:'',
      cant2faz:'',
      result2faz:'',
      unidades:''
  });
  const [valoresInsumo, setValoresInsumo] = useState()

    const multiplicar = (a: number, b: number): number => {
      return a * b;
  }

    
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
        postCartel(values, accessToken) 
  }
  useEffect(() => {
    getInsumos(accessToken)
  }, [])
 

  const handleSelect =(e:any)=> {
    var valorInsumoNew:any = insumos.filter((element:any)=> element.name=== e.target.value)
   
  }
  const a:any = valorInsumoNew.costo

  
  return (
    <div className="flex">
      <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">Crear/actualizar Cartel</h1>
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
            <br />
            
          
            <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            >
              crear cartel
            </button>
           
          </form>
         
         
           <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">agregar insumo</h1>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          
          <select onChange={(element)=>handleSelect(element)} >
          <option selected="false" disabled>
            Seleccionar insumo
          </option>
          {insumos.map((e:any) => (
            <option value={e.name}>{e.name}</option>

          ))}
        </select>
            <input
                type="number"
                name="cantidad"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="costo con 1 faz"
                value={a}
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
            <br />
          
            <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            >
              crear insumo
            </button>
           
          </form>
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>

       </div>
  )
}


export default CartelPost