import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface Headers {
	"x-access-token": { token: string };
}

type ProveedoresStore = {
	proveedores: [];
	proveedor:{};
	success: boolean;
	error: boolean;
	loading: boolean
	getProveedores: (headers: {}) => Promise<void>;
	putProveedor: (body:any, token:any) => Promise<void>
	addProveedores: (body: {}) => Promise<void>;
	deleteProveedores: (params: {}, headers:any) => Promise<void>;
	closeModal: () => void;
};

const useProveedores = create<ProveedoresStore>()(
	devtools((set) => ({
		//initial state
		proveedores: [],
		proveedor:{},
		success: false,
		error: false,
		loading: false,

		//actions
		putProveedor: async (body, token) => {
        
			let headers:any = {
			"x-access-token" : token
		  };
		  set({ success: true})
		  set({ loading: true}) 
			const { data } = await axios.put('https://symptomatic-hole-production.up.railway.app/api/proveedores', body, { headers: { "x-access-token": token} });
			set({ success: false})
			
			set({ loading: false}) 
	
	
		  },
		getProveedores: async (headers) => {
			try {
				set({ loading: true}) 
				const { data } = await axios.get(
					"https://symptomatic-hole-production.up.railway.app/api/proveedores",
					headers
				);
				set((state) => ({ proveedores: (state.proveedores = data) }));	
			} catch (error) {
				console.log(error)
			}
			set({ loading: false})  
		},
		addProveedores: async (body) => {
			try {
				await axios.post(
					"https://symptomatic-hole-production.up.railway.app/api/proveedores/create",
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		deleteProveedores: async (params, headers)=>{
      
			const { data } = await axios.delete(`https://symptomatic-hole-production.up.railway.app/api/proveedores/${params}`,   headers);
	  
		  },
		closeModal: () => {
			set({ error: false, success: false });
		},
	}))
);

export default useProveedores;
