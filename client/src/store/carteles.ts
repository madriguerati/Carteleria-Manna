

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
    insumosArray:[string]
}


type CartelStore = {
  carteles:any
  cartel: any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean
  addCartel: (body:{}) => Promise<void>
  getCarteles: (
		token: string
	) => Promise<void>;
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
          const { data } = await axios.post('http://localhost:5000/api/carteles/create', body );
        set({ success: true, error: false });
        } catch (error) {
          set({ error: true, success: false });
        }

      },
      getCarteles: async (token) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`http://localhost:5000/api/carteles`,
          { headers: { "x-access-token": token } })
          set((state) => ({ carteles: (state.carteles = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
      },
      deleteCartel: async (params, headers)=>{
        set({ loading: true });
        const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/carteles/${params}`,  headers);
        set({ loading: false });

      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default useCartel;