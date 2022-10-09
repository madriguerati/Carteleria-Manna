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
  error: boolean
  getUser: (user: string) => Promise<void>
  getUsers: (token: string, rol: string, sort: string, page: string, limit: string) => Promise<void>
  createNewUser: (body: any) => Promise<void>
  signin: (body: UserLogin) => Promise<void>
  logout: () => void
  closeModal: () => void
  updateToken: (refreshToken: string) => Promise<void>
  verificated: any
}

const useUser = create<UserStore>()(
  devtools((set) => ({
    //inicial state
    user: {},
    users: [],
    tokken: '',
    success: false,
    error: false,

    //actions
    getUser: async (token) => {
      try{
        const { data } = await axios.get('http://localhost:5000/api/user/profile', { headers: { "x-access-token": token} } )
        set((state) => ({ user: (state.user = data) }));
      }catch(error){
        localStorage.removeItem('auth');
        set({ tokken: '' });
      }
    },
    getUsers: async (token, rol, sort, page, limit) => {
      let headers:any = {
            "x-access-token" : token
      };
      const { data } = await axios.get(`http://localhost:5000/api/user/allusers?roles=${rol}&sort=${sort}&page=${page}&limit=${limit}`, { headers: { "x-access-token": token} } )
      set((state) => ({ users: (state.users = data) }));
    },
    createNewUser: async (body) => {
      try {
        await axios.post('http://localhost:5000/api/user/signUp', body);
        set({ success: true})
        set({ error: false})
      } catch (error) {
        set({ error: true})
        set({ success: false})
      }
    },
    signin: async (body) => {
      const { data } = await axios.post('http://localhost:5000/api/user/signIn', body);
      localStorage.setItem('auth', JSON.stringify(data));
      set((state) => ({ tokken: (state.tokken = data.token) })); 
    },
    logout: () => { 
      localStorage.removeItem('auth');
      set({ tokken: '' });
    },
    closeModal: () => {
      set({ error: false})
      set({ success: false})
    },
    updateToken: async(refreshToken) => {
      console.log('update token', refreshToken) 
      const { data } = await axios.post('http://localhost:5000/api/user/refresh', {}, { headers: { "x-access-token": refreshToken} } )
      localStorage.setItem('auth', JSON.stringify(data));
      set((state) => ({ tokken: (state.tokken = data.token) })); 
    },
    verificated: (token: any) => { 
      set((state) => ({ tokken: (state.tokken = token) }));
    },
  }))
)

export default useUser;