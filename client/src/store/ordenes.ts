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
  carteles: [string],
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
  ordenes2:any
  error: boolean
  loading: boolean,
  postOrden: (body:any, token:any) => Promise<void>
  getOrdenesAll: (
		token: string,
		page: number,
		limit: number
	) => Promise<void>;
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
      ordenes2:[],
      tokken: '',
      success: false,
      error: false,
      loading: false,
  
      //actions
      putOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
        const { data } = await axios.put('http://localhost:5000/api/ordenes', body, { headers: { "x-access-token": token} });
       

      },
      postOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ success: true, error: false });
       try{ 
        const { data } = await axios.post('http://localhost:5000/api/ordenes/create', body, { headers: { "x-access-token": token} });
      }catch (error) {
        set({ error: true, success: false });
       }

      },
      getOrdenes: async (headers) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get('http://localhost:5000/api/ordenes', headers )
          set((state) => ({ ordenes2: (state.ordenes2 = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false})  
      },
      getOrdenesAll: async (token, page, limit) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`http://localhost:5000/api/ordenes/allordenes?page=${page}&limit=${limit}`,
          { headers: { "x-access-token": token } })
          set((state) => ({ ordenes: (state.ordenes = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
        },
      deleteOrdenes: async (params, headers)=>{
        set({ success: true, error: false });
        const { data } = await axios.delete(`http://localhost:5000/api/ordenes/${params}`,   headers);
        set({ success: true, error: false });  
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