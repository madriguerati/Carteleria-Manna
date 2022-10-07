import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Insumo {
  name: string,
  descripcion: string,
  unidad: number,
  costo: number,
  category: string[]
}


type UserStore = {
  insumo: any
  tokken: any
  success: boolean
  postInsumo: (body:any, token:any) => Promise<void>
}


const useInusmo = create<UserStore>()(
    devtools((set) => ({
      //states
      insumo: {},
      tokken: '',
      success: false,
  
      //actions
      postInsumo: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };

        const { data } = await axios.post('http://localhost:5000/api/insumo/create', body, { headers: { "x-access-token": token} });

      }
     // verificated: (token: any) => {
       // set((state) => ({ tokken: (state.tokken = token) }));
    //},
    }))
  )
  
  export default useInusmo;