

import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Headers {
	"x-access-token": { token: string };
}

interface Cartel {
    descripcion: string,
    costo1faz: number,
    costo2faz:number,
    insumos:string[]
}


type CartelStore = {
  carteles:any
  cartel: any
  tokken: any
  success: boolean
  error: boolean
  addCartel: (body:{}) => Promise<void>
  getCarteles: (headers:{})=>Promise<void>
  deleteCartel: (params:any, headers:any)=> Promise<void>
  closeModal: () => void;
}


const useCartel = create<CartelStore>()(
    devtools((set) => ({
      //states
      carteles:[],
      cartel: {},
      tokken: '',
      success: false,
      error: false,
  
      //actions
      addCartel: async (body) => {
        const { data } = await axios.post('http://localhost:5000/api/carteles/create', body );

      },
      getCarteles: async (headers) => {
        try{
          const { data } = await axios.get('http://localhost:5000/api/carteles', headers )
          set((state) => ({ carteles: (state.carteles = data) }));
        }catch(error){
          console.log(error)
        }
      },
      deleteCartel: async (params, headers)=>{
      
        const { data } = await axios.delete(`http://localhost:5000/api/carteles/${params}`,  headers);
  
      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default useCartel;