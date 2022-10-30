import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface Headers {
	"x-access-token": { token: string };
}

type ClientStore = {
	clients: [];
	success: boolean;
	error: boolean;
	loading: boolean
	getClients: (headers: {}) => Promise<void>;
	addClient: (body: {}) => Promise<void>;
	putClients: (body:any, token:any) => Promise<void>
	deleteClients: (params: {}, headers:any) => Promise<void>;
	closeModal: () => void;
};

const useClients = create<ClientStore>()(
	devtools((set) => ({
		//initial state
		clients: [],
		success: false,
		error: false,
		loading: false,

		//actions
		putClients: async (body, token) => {
        
			let headers:any = {
			"x-access-token" : token
		  };
		  set({ success: true})
		  set({ loading: true}) 
			const { data } = await axios.put('https://symptomatic-hole-production.up.railway.app/api/clientes', body, { headers: { "x-access-token": token} });
			set({ success: false})
			
			set({ loading: false}) 
	
	
		  },
		getClients: async (headers) => {
			try {
				set({ loading: true}) 
				const { data } = await axios.get(
					"https://symptomatic-hole-production.up.railway.app/api/clientes",
					headers
				);
				set((state) => ({ clients: (state.clients = data) }));	
			} catch (error) {
				console.log(error)
			}
			set({ loading: false})  
		},
		addClient: async (body) => {
			try {
				await axios.post(
					"https://symptomatic-hole-production.up.railway.app/api/clientes/create",
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		deleteClients: async (params, headers)=>{
			set({ loading: true}) 
			const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/clientes/${params}`,   headers);
			set({ loading: false})  
		  },
		closeModal: () => {
			set({ error: false, success: false });
		},
	}))
);

export default useClients;
