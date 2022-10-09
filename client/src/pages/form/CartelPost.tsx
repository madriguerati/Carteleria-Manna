import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartel from '../../store/carteles';
import useUser from '../../store/user';



const CartelPost = () => {

    const { cartel, success, postCartel} = useCartel((state) => state);
    const { tokken} = useUser((state) => state);
    const [resultado, setResultado]=useState(0)
    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        cantidad: '',
        cartel:'',//tipo de cartel
        base: '',
        altura: '',
        medidas: resultado,
        faz: '',//simple o doble
        valor: '',
        total: '',
        estructura:'',
        archivo: '',
        otros:''
    });
  
    const multiplicar = (a: number, b: number): number => {
      return a * b;
  }
  const a:any= values.base;
  const b:any= values.altura;
  const costo:any =200
  const cantidad:any = values.cantidad

    
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
      setResultado(multiplicar(a,b))
    console.log(resultado)
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
        postCartel(values, tokken) 
  }
 

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">Crear/actualizar Cartel</h1>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <input
                type="number"
                name="cantidad"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="cantidad"
                value={values.cantidad}
                onChange={handleChange}
            />
            <input
                type="text"
                name="cartel"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="tipo de cartel"
                value={values.cartel}
                onChange={handleChange}
            />
            <input
                type="number"
                name="base"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="base"
                value={values.base}
                onChange={handleChange}
            />
            <input
                type="number"
                name="altura"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="altura"
                value={values.altura}
                onChange={handleChange}
            />
            <input
                type="number"
                name="medidas"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="medidas"
                value={
                  a&&b?
                  multiplicar(a,b)
                  :
                  0
                }
                onChange={handleChange}
            />
            <input
                type="text"
                name="faz"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="faz"
                value={values.faz}
                onChange={handleChange}
            />
            <input
                type="number"
                name="valor"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="valor"
                value={
                  resultado?
                 multiplicar( multiplicar(resultado, costo), cantidad)
                  :
                  0
                }
                onChange={handleChange}
            />
            <input
                type="number"
                name="total"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="total"
                value={
                  resultado?
                  multiplicar(resultado, costo)
                  :
                  0
                }
                onChange={handleChange}
            />
            <input
                type="text"
                name="estructura"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="estructura"
                value={values.estructura}
                onChange={handleChange}
            />
            <input
            type="text"
            name="archivo"
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="archivo"
            value={values.archivo}
            onChange={handleChange}
        />
            <input
                type="text"
                name="otros"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="otros"
                value={values.otros}
                onChange={handleChange}
            />
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
    </>
  )
}


export default CartelPost