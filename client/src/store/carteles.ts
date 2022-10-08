import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Cartel {
    cantidad: number,
    cartel: string[],//tipo de cartel
    base: number,
    altura: number,
    medidas: number,
    faz:string[],//simple o doble
    valor: number,
    total: number,
    estructura:string,
    archivo: string,
    otros:string
}


type CartelStore = {
  cartel: any
  tokken: any
  success: boolean
  postCartel: (body:any, token:any) => Promise<void>
}


const useCartel = create<CartelStore>()(
    devtools((set) => ({
      //states
      cartel: {},
      tokken: '',
      success: false,
  
      //actions
      postCartel: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };

        const { data } = await axios.post('http://localhost:5000/api/carteles/create', body, { headers: { "x-access-token": token} });

      }
    }))
  )
  
  export default useCartel;