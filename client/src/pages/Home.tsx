import Layout from "../components/Layout";
import useUser from "./../store/user";
import useOrdenes from "./../store/ordenes";
import useCarteles from "./../store/carteles";

import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useHeaders from "../hooks/useHeaders";
import moment from "moment";

const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

import { Link } from "react-router-dom";
import shallow from "zustand/shallow";
const Home = () => {
  const { users, user, getUsers } = useUser((state) => state, shallow);
  const { getOrdenes, ordenes } = useOrdenes((state) => state);
  const { getCarteles, carteles } = useCarteles((state) => state);

  var obrero: any = user.name;
  var ord: any[];
  ord = ordenes.map((e: any) =>
    e.carteles.map(
      (item: any) => item.category.includes("CARTELERIA") && e
    )
  );
  console.log("hoooooooooooooolaaaa", ord);

  useEffect(() => {
    getOrdenes(headers);
    getCarteles(accessToken);

    console.log("hola soy una orden", ordenes);
  }, []);

  return (
    <Layout>
      {user.roles?.find(
        (e: any) => e.name === "admin" || e.name === "gerente"
      ) && (
        <div className="xl:container mx-auto px-4 sm:px-8 h-screen my-auto grid items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-16 gap-y-16 py-16 md:py-0 text-center items-center">
            <Link to="/carteles">
              <figure className="bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/carteles_96x96.png"
                  alt="Carteles logo"
                />
                {/* <div className="absolute w-11/12 h-[93%] top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded border-2 border-[#76b3273b]" /> */}
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  CARTELES
                </figcaption>
              </figure>
            </Link>
            <Link to="/clientes">
              <figure className="bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/clientes_96x96.png"
                  alt="Clientes logo"
                />
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  CLIENTES
                </figcaption>
              </figure>
            </Link>
            <Link to="/insumos">
              <figure className="bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/insumos_96x96.png"
                  alt="Insumos logo"
                />
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  INSUMOS
                </figcaption>
              </figure>
            </Link>
            <Link to="/ordenes">
              <figure className="bg-gray-100 rounded-md py-10 drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/ordenes_96x96.png"
                  alt="Ordenes logo"
                />
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  ORDENES
                </figcaption>
              </figure>
            </Link>
            <Link to="/presupuesto">
              <figure className="bg-gray-100 rounded-md py-10  drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/pagos_96x96.png"
                  alt="Presupuesto logo"
                />
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  PRESUPUESTO
                </figcaption>
              </figure>
            </Link>
            <Link to="/proveedores">
              <figure className="bg-gray-100 rounded-md py-10  drop-shadow-lg duration-200 cursor-pointer hover:scale-105 hover:shadow-xl">
                <img
                  className="mx-auto"
                  src="https://carteleriamanna.com.ar/sistema/img/escritorio/proveedores_96x96.png"
                  alt="Proveedores logo"
                />
                <figcaption className="text-[#77B327] text-xl font-semibold tracking-wide mt-6">
                  PROVEEDORES
                </figcaption>
              </figure>
            </Link>
          </div>
        </div>
      )}
      {user.roles?.find((e: any) => e.name === "obrero") && (
        <div className="flex-wrap">
          {ord.map((orden: any) => orden.map((e:any)=> e &&
            <div className="block bg-red-200 m-5 p-5 ">
            <div className="flex bg-white m-5">
              <div className="m-2">
                <h1>
                  <b>Orden N° </b>
                  {e.facturanum}
                </h1>
                <div className="flex">
                  <div className="mt-2 mb-2">
                    <h1>
                      <b>cliente: </b>
                      {e.cliente}
                    </h1>
                  </div>
                </div>
                <div className="flex">
                  <div className="m-2">
                  <h1>tipo de cartel</h1>
                    {
                      e.carteles.map((item:any)=>(
                        <div>
                          <h1>
                          {item.name}
                          </h1>
                          <h1>
                          {item.base}
                          </h1>
                        </div>
                        
                        )
                      )
                    }
                    
                  </div>
                  <div className="m-2">
                    <h1>medidas</h1>
                  </div>
                </div>
              </div>
              <div className="justify-end m-2">
                <h1 className="justify-end">{moment(e.fecha).format("L")}</h1>
                <div>
                  <h1>estados</h1>
                </div>
              </div>
            </div>
            <div className="bg-white m-5">{e.observaciones}</div>
          </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
