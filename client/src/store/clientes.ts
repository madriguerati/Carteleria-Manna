import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface Headers {
	headers: { token: string };
}

type ClientStore = {
	clients: [];
	getClients: (headers: Headers) => Promise<void>;
};

const useClients = create<ClientStore>()(
	devtools((set) => ({
		//initial state
		clients: [],

		//actions
		getClients: async (headers) => {
			const { data } = await axios.get(
				"http://localhost:5000/api/clientes",
				headers
			);
			set((state) => ({ clients: (state.clients = data) }));
		},
	}))
);

export default useClients;