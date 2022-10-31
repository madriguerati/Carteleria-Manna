

import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Headers {
	"x-access-token": { token: string };
}

interface Presupuesto {
    fecha: Date,
    clientes: [string],// que muestre nombre de contacto y telefono en el front
    carteles: [string],
    operacion:string,
    lugardecolocacion: string,//lugar de entrega colocación/entrega
    montototal: number,
    formadepago:string,
    plazodeentrega:number,
    fechavalida: Date,//presupuesto valido hasta 
    observaciones:string
}


type PresupuestoStore = {
  presupuestos:any
  presupuesto: any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean
  addPresupuesto: (body:{}) => Promise<void>
  getPresupuestos: (headers:{})=>Promise<void>
  deletePresupuestos: (params:any, headers:any)=> Promise<void>
  closeModal: () => void;
}


const usePresupuesto = create<PresupuestoStore>()(
    devtools((set) => ({
      //states
      presupuestos:[],
      presupuesto: {},
      tokken: '',
      success: false,
      error: false,
      loading: false,
  
      //actions
     
      addPresupuesto: async (body) => {
        try {
          const { data } = await axios.post('https://symptomatic-hole-production.up.railway.app/api/presupuestos/create', body );
        set({ success: true, error: false });
        } catch (error) {
          set({ error: true, success: false });
        }

      },
      getPresupuestos: async (headers:any) => {
        set({ loading: true });

        try{
          const { data } = await axios.get('https://symptomatic-hole-production.up.railway.app/api/presupuestos', headers )
          set((state) => ({ presupuestos: (state.presupuestos = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false });

      },
      deletePresupuestos: async (params:any, headers:any)=>{
      
        const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/presupuestos/${params}`,  headers);
  
      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default usePresupuesto;