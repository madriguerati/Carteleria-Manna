import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';


interface Headers {
	"x-access-token": { token: string };
}

interface Orden {
  fecha: string,
  cliente: string,
  contacto: string,//nombre de contacto
  carteles: string[],
  operacion:string,
  lugardecolocacion:string,
  lugartraslado:string,
  montototal: number,
  seña: number,
  formadepago: string,
  fechaentrega: string,
  facturanum: string,
  plazodeentrega: string;
  observaciones:string
}


type UserStore = {
  orden: any
  ordenes:any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean,
  postOrden: (body:any, token:any) => Promise<void>
  putOrden: (body:any, token:any) => Promise<void>
  getOrdenes: (token:any) => Promise<void>
  deleteOrdenes: (params:any, headers:any)=> Promise<void>
  closeModal: () => void
}


const useOrdenes = create<UserStore>()(
    devtools((set) => ({
      //states
      orden: {},
      ordenes:[],
      tokken: '',
      success: false,
      error: false,
      loading: false,
  
      //actions
      putOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ success: true})
      set({ loading: true}) 
        const { data } = await axios.put('https://symptomatic-hole-production.up.railway.app/api/ordenes', body, { headers: { "x-access-token": token} });
        set({ success: false})
        
        set({ loading: false}) 


      },
      postOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ loading: true})
       try{ 
        const { data } = await axios.post('https://symptomatic-hole-production.up.railway.app/api/ordenes/create', body, { headers: { "x-access-token": token} });
       if(data){
       }
      }catch (error) {
        console.log(error)
       }
       set({ loading: false})

      },
      getOrdenes: async (headers) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get('https://symptomatic-hole-production.up.railway.app/api/ordenes', headers )
          set((state) => ({ ordenes: (state.ordenes = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false})  
      },
      deleteOrdenes: async (params, headers)=>{
        set({ loading: true}) 
        const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/ordenes/${params}`,   headers);
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
  
  export default useOrdenes;