import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface User {
  email: string,
  password: string,
  roles: string[],
  id: string,
}

interface UserLogin {
  email: string,
  password: string,
}

type UserStore = {
  user: any;
  tokken: string,
  success: boolean
  signup: (body: any) => Promise<void>;
  signin: (body: UserLogin) => Promise<void>;
  verificated: any
}

const useUser = create<UserStore>()(
  devtools((set) => ({
    //states
    user: {},
    tokken: '',
    success: false,

    //actions
    signup: async (body) => {
      const response = await axios.post('http://localhost:5000/api/user/signUp', body);
      set((state) => ({ user: (state.user = response.data) }));
      set({ success: true });
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