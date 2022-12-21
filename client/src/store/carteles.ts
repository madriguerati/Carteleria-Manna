

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
    insumosArray:[string],
    category: string[]
}


type CartelStore = {
  carteles:any
  carteles2:any
  cartel: any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean
  addCartel: (body:{}) => Promise<void>
  getCarteles: (
		token: string
	) => Promise<void>;
  putCarteles: (body:any, token:any) => Promise<void>
  getCartelesAll: (
		token: string,
		page: number,
		limit: number,
    name: string
	) => Promise<void>;
  deleteCartel: (params:any, headers:any)=> Promise<void>
  closeModal: () => void;
}

//qqqqqq
const useCartel = create<CartelStore>()(
    devtools((set) => ({
      //states
      carteles:[],
      carteles2:[],
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
      putCarteles: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
        };
        set({ success: true})
        set({ loading: true}) 
        const { data } = await axios.put('https://carteleriamannaversionprueba.up.railway.app/api/carteles', body, { headers: { "x-access-token": token} });
        set({ success: false})
        
        set({ loading: false}) 
    
    
        },
      getCarteles: async (token) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`https://carteleriamannaversionprueba.up.railway.app/api/carteles`,
          { headers: { "x-access-token": token } })
          set((state) => ({ carteles2: (state.carteles2 = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
      },
      getCartelesAll: async (token, page, limit, name) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`http://localhost:5000/api/carteles/allcarteles?page=${page}&limit=${limit}&name=${name}`,
          { headers: { "x-access-token": token } })
          set((state) => ({ carteles: (state.carteles = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
      },
      deleteCartel: async (params, headers)=>{
        set({ loading: true });
        const { data } = await axios.delete(`https://carteleriamannaversionprueba.up.railway.app/api/carteles/${params}`,  headers);
        set({ loading: false });

      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default useCartel;