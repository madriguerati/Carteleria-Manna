

import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Headers {
	"x-access-token": { token: string };
}

interface Cartel {
    fecha: Date,
    clientes: string,// que muestre nombre de contacto y telefono en el front
    carteles: string,
    operacion:string,
    lugardecolocacion: string,//lugar de entrega colocación/entrega
    montototal: number,
    formadepago:string,
    plazodeentrega:number,
    fechavalida: Date,//presupuesto valido hasta 
    observaciones:string
}


type CartelStore = {
  presupuestos:any
  presupuesto: any
  tokken: any
  success: boolean
  error: boolean
  //addCartel: (body:{}) => Promise<void>
  getPresupuestos: (headers:{})=>Promise<void>
  //deleteCartel: (params:any, headers:any)=> Promise<void>
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
  
      //actions
     
      getPresupuestos: async (headers) => {
        try{
          const { data } = await axios.get('http://localhost:5000/api/presupuestos', headers )
          set((state) => ({ presupuestos: (state.presupuestos = data) }));
        }catch(error){
          console.log(error)
        }
      },
      deletePresupuestos: async (params, headers)=>{
      
        const { data } = await axios.delete(`http://localhost:5000/api/presupuestos/${params}`,  headers);
  
      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default usePresupuesto;