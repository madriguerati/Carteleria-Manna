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
		getClients: async (headers) => {
			try {
				set({ loading: true}) 
				const { data } = await axios.get(
					"http://localhost:5000/api/clientes",
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
					"http://localhost:5000/api/clientes/create",
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		deleteClients: async (params, headers)=>{
      
			const { data } = await axios.delete(`http://localhost:5000/api/clientes/${params}`,   headers);
	  
		  },
		closeModal: () => {
			set({ error: false, success: false });
		},
	}))
);

export default useClients;
