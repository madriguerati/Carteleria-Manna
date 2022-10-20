import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface User {
	email: string;
	password: string;
	roles: string[];
	id: string;
	name: string;
	lastname: string;
	dni: Number;
	fechaNacimiento: Date;
}

interface UserLogin {
	email: string;
	password: string;
}

type UserStore = {
	user: any;
	users: any;
	isLogged: boolean;
	success: boolean;
	error: boolean;
	loading: boolean;
	getUser: (user: string) => Promise<void>;
	getUsers: (
		token: string,
		rol: string,
		sort: string,
		page: number,
		limit: number
	) => Promise<void>;
	createNewUser: (body: any) => Promise<void>;
	signin: (body: UserLogin) => Promise<void>;
	logout: () => void;
	closeModal: () => void;
	updateToken: (refreshToken: string) => Promise<void>;
};

const useUser = create<UserStore>()(
	devtools((set) => ({
		//inicial state
		user: {},
		users: [],
		isLogged: false,
		success: false,
		error: false,
		loading: false,

		//actions
		getUser: async (token) => {
			try {
				const { data } = await axios.get(
					"https://symptomatic-hole-production.up.railway.app/api/user/profile",
					{ headers: { "x-access-token": token } }
				);
				set((state) => ({ ...state, user: (state.user = data) }));
			} catch (error) {
				localStorage.removeItem("auth");
			}
		},
		getUsers: async (token, rol, sort, page, limit) => {
			const { data } = await axios.get(
				`https://symptomatic-hole-production.up.railway.app/api/user/allusers?roles=${rol}&sort=${sort}&page=${page}&limit=${limit}`,
				{ headers: { "x-access-token": token } }
			);
			if (!data) {
				set({ loading: true });
			}
			set((state) => ({ ...state, users: (state.users = data) }));
		},
		createNewUser: async (body) => {
			try {
				await axios.post(
					"https://symptomatic-hole-production.up.railway.app/api/user/signUp",
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		signin: async (body) => {
			try {
				const { data } = await axios.post(
					"https://symptomatic-hole-production.up.railway.app/api/user/signIn",
					body
				);
				localStorage.setItem("auth", JSON.stringify(data));
				set({ isLogged: true });
			} catch (error) {
				console.log(error)
			}
		},
		logout: () => {
			localStorage.removeItem("auth");
		},
		closeModal: () => {
			set({ error: false, success: false });
		},
		updateToken: async (refreshToken) => {
			const { data } = await axios.post(
				"https://symptomatic-hole-production.up.railway.app/api/user/refresh",
				{},
				{ headers: { "x-access-token": refreshToken } }
			);
			localStorage.setItem("auth", JSON.stringify(data));
		},
	}))
);

export default useUser;
