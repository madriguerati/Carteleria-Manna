import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface User {
  email: string,
  password: string,
  roles: string[],
  id: string,
  name: string,
  lastname: string,
  dni: Number,
  fechaNacimiento: Date
}

interface UserLogin {
  email: string,
  password: string,
}

type UserStore = {
  user: any
  tokken: string
  success: boolean
  getUser: (user: string) => Promise<void>
  signup: (body: any) => Promise<void>
  signin: (body: UserLogin) => Promise<void>
  verificated: any
}

const useUser = create<UserStore>()(
  devtools((set) => ({
    //states
    user: {},
    tokken: '',
    success: false,

    //actions
    getUser: async (token) => {
      const headers : any = {
            "x-access-token" : token
      };
      const { data } = await axios.get('http://localhost:5000/api/user/profile', headers )
      set((state) => ({ user: (state.user = data) }));
    },
    signup: async (body) => {
      const { data } = await axios.post('http://localhost:5000/api/user/signUp', body);
      localStorage.setItem('auth', JSON.stringify(data.token));
      set((state) => ({ tokken: (state.tokken = data.token) }));
    },
    signin: async (body) => {
      const { data } = await axios.post('http://localhost:5000/api/user/signIn', body);
      localStorage.setItem('auth', JSON.stringify(data.token));
      set((state) => ({ tokken: (state.tokken = data.token) }));
    },
    verificated: (token: any) => {
      set((state) => ({ tokken: (state.tokken = token) }));
    },
  }))
)

export default useUser;