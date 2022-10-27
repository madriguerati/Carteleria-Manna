import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';


interface Headers {
	"x-access-token": { token: string };
}

interface Insumo {
  id:string;
  name: string,
  descripcion: string,
  unidad: number,
  costo: number,
  category: string[],
  proveedor: string
}


type UserStore = {
  insumo: any
  insumos:any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean,
  postInsumo: (body:any, token:any) => Promise<void>
  putInsumo: (body:any, token:any) => Promise<void>
  getInsumos: (token:any) => Promise<void>
  deleteIsumos: (params:any, headers:any)=> Promise<void>
  closeModal: () => void
}


const useInusmo = create<UserStore>()(
    devtools((set) => ({
      //states
      insumo: {},
      insumos:[],
      tokken: '',
      success: false,
      error: false,
      loading: false,
  
      //actions
      putInsumo: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ success: true})
      set({ loading: true}) 
        const { data } = await axios.put('https://symptomatic-hole-production.up.railway.app/api/insumo', body, { headers: { "x-access-token": token} });
        set({ success: false})
        
        set({ loading: false}) 


      },
      postInsumo: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ loading: true})
       try{ 
        const { data } = await axios.post('https://symptomatic-hole-production.up.railway.app/api/insumo/create', body, { headers: { "x-access-token": token} });
       if(data){
       }
      }catch (error) {
        console.log(error)
       }
       set({ loading: false})

      },
      getInsumos: async (headers) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get('https://symptomatic-hole-production.up.railway.app/api/insumos', headers )
          set((state) => ({ insumos: (state.insumos = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false})  
      },
      deleteIsumos: async (params, headers)=>{
        set({ loading: true}) 
        const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/insumo/${params}`,   headers);
        set({ loading: false})  
      },
      closeModal: () => {
        //set({ error: false})
        set({ success: false})
      },
     // verificated: (token: any) => {
       // set((state) => ({ tokken: (state.tokken = token) }));
    //},
    }))
  )
  
  export default useInusmo;