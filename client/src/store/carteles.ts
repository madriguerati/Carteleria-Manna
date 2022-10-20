

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
  loading: boolean
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
      loading: false,
  
      //actions
      addCartel: async (body) => {
        try {
          const { data } = await axios.post('https://symptomatic-hole-production.up.railway.app/api/carteles/create', body );
        set({ success: true, error: false });
        } catch (error) {
          set({ error: true, success: false });
        }

      },
      getCarteles: async (headers) => {
        try{
          const { data } = await axios.get('https://symptomatic-hole-production.up.railway.app/api/carteles', headers )
          set((state) => ({ carteles: (state.carteles = data) }));
          if (!data) {
            set({ loading: true });
          }
        }catch(error){
          console.log(error)
        }
      },
      deleteCartel: async (params, headers)=>{
      
        const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/carteles/${params}`,  headers);
        if (!data) {
          set({ loading: true });
        }
      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default useCartel;