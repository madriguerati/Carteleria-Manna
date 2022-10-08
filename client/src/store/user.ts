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
  users: any
  tokken: string
  success: boolean
  getUser: (user: string) => Promise<void>
  getUsers: (token: string, rol: string, sort: string, page: string, limit: string) => Promise<void>
  // signup: (body: any) => Promise<void>
  signin: (body: UserLogin) => Promise<void>
  logout: () => void
  verificated: any
}

const useUser = create<UserStore>()(
  devtools((set) => ({
    //states
    user: {},
    users: [],
    tokken: '',
    success: false,

    //actions
    getUser: async (token) => {
      let headers:any = {
            "x-access-token" : token
      };

      try{
        const { data } = await axios.get('http://localhost:5000/api/user/profile', { headers: { "x-access-token": token} } )
        set((state) => ({ user: (state.user = data) }));
      }catch(error){
        console.log(error)
      }
    },
    getUsers: async (token, rol, sort, page, limit) => {
      let headers:any = {
            "x-access-token" : token
      };
      const { data } = await axios.get(`http://localhost:5000/api/user/allusers?roles=${rol}&sort=${sort}&page=${page}&limit=${limit}`, { headers: { "x-access-token": token} } )
      set((state) => ({ users: (state.users = data) }));
    },
    // signup: async (body) => {
    //   const { data } = await axios.post('http://localhost:5000/api/user/signUp', body);
    //   localStorage.setItem('auth', JSON.stringify(data.token));
    //   set((state) => ({ tokken: (state.tokken = data.token) }));
    // },
    signin: async (body) => {
      const { data } = await axios.post('http://localhost:5000/api/user/signIn', body);
      localStorage.setItem('auth', JSON.stringify(data.token));
      set((state) => ({ tokken: (state.tokken = data.token) }));
    },
    logout: () => {
      localStorage.removeItem('auth');
      set({ tokken: '' });
    },
    verificated: (token: any) => {
      set((state) => ({ tokken: (state.tokken = token) }));
    },
  }))
)

export default useUser;