import Layout from "../components/Layout/index";
import useOrdenes from "../store/ordenes";
import useLocalStorage from "../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import { useEffect, useState, Fragment } from "react";
import useUser from "../store/user";
import useHeaders from "../hooks/useHeaders";
import { AiOutlineUser } from "react-icons/ai";
import { Grid } from "gridjs-react";

import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  DropShadow,
  Gradient,
} from "rumble-charts";
import moment from "moment";

const Dashboard = () => {
  var fechaActual: any =moment().format('MM/DD/YYYY')
  const { ordenes, getOrdenesAll, getOrdenes, deleteOrdenes, loading } =
    useOrdenes((state) => state);
  const { getUsers2, users, logout, user } = useUser((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [ordenesGlobales, setOrdenesGlobales] = useState(ordenes)

  useEffect(() => {
    getOrdenes(accessToken);
    getUsers2(headers);
    searchByDate()
    console.log("holaaaaa", ordenesGlobales)
  }, []);
  
  //Start operadores
  var totalOrdenes: any = ordenesGlobales.map((e: any) => 1);
  var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);
  
  //pendientes
  var ordenesPendientes: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === false && e.stateCarteleria === false
  );
  var sumOrdenesPendientes: any = ordenesPendientes.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //realizadas
  var ordenesRealizadas: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === true && e.stateCarteleria === true
  );
  var sumOrdenesRealizadas: any = ordenesRealizadas.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //entregados
  var ordenesEntregados: any = ordenesGlobales.map(
    (e: any) =>
      e.entregadoImpresiones === true && e.entregadoCarteleria === true
  );
  var sumOrdenesEntregados: any = ordenesEntregados.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //End operadores

  //totales
 var totalesSeña: any = ordenesGlobales.map((e:any)=>e.seña)
 var sumSeñas: any = totalesSeña.reduce(
  (a: any, b: any) => a + b,
  0
);
var totales: any = ordenesGlobales.map((e:any)=>e.montototal)
 var sumTotales: any = totales.reduce(
  (a: any, b: any) => a + b,
  0
);
  //totales

  //vendedores
  var vendedores: any = users.filter((e: any) =>
    e.roles.find((e: any) => e.name === "vendedor")
  );

  const [values, setValues]= useState({
    date1: fechaActual,
    date2: fechaActual+1
  }
  )
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
    console.log("una fecha ", values)
  };

  const searchByDate=()=>{
    let busca: any = ordenes.filter(
      (n: any) => moment(n.fecha).format('L') >= moment(values.date1).format('L') && moment(n.fecha).format('L') <= moment(values.date2).format('L')    );
    setOrdenesGlobales(busca)
    console.log("holsdsdsdsdsdaaaaa", values.date2)
  }
  return (
    <Layout>
      <div>
        <div className="rounded p-2">
          <h1 className="text-4xl text-start text-gray-400">Hola, {user.name}</h1>
        </div>
        <div className=" mr-2 mb-2 ml-2 rounded  flex justify-end">
          <h1 className="text-xl text-gray-400 text-center pt-3">Filtrar resultadosq por fecha</h1>
          <div className="w-1/4 flex justify-end align-center pt-2 ml-2">
            <h1 className="text-1xl text-gray-600 text-center mr-1 pt-2 ">desde</h1>

            <input
              type="date"
              id="input-group-1"
              className="bg-gray-50 border w-1/4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-2 pr-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              name="date1"
              value={values.date1}
              onChange={handleChange}
            />
            <h1 className="text-1xl text-gray-600 pt-2 mr-1 ml-1 content-center flex">hasta</h1>

            <input
              type="date"
              id="input-group-1"
              className="bg-gray-50 border w-1/4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-2 pr-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              name="date2"
              value={values.date2}
              onChange={handleChange}
            />
            <button className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={searchByDate}>
              filtrar
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-wrap flex-row sm:flex-col m-1 justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-blue-300">
            <div className="flex justify-between w-full">
              <div>
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="flex items-center text-xs px-3 bg-blue-200 text-blue-800 rounded-full"
                >
                  100%
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-5xl">{sumTotales+sumSeñas}</div>
              <div className="font-bold text-sm">Totales</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row m-1 sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-purple-300">
            <div className="flex justify-between w-full">
              <div>
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="flex items-center text-xs px-3 bg-purple-200 text-purple-800 rounded-full"
                >
                  25%
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-5xl text-center">{sumTotales}</div>
              <div className="font-bold text-sm">por cobrar</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row  m-1 sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-red-300">
            <div className="flex justify-between w-full">
              <div>
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="flex items-center text-xs px-3 bg-red-200 text-red-800 rounded-full"
                >
                  50%
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-5xl text-center">{sumSeñas}</div>
              <div className="font-bold text-sm">Señas cobradas</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row m-1 sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300">
            <div className="flex justify-between w-full">
              <div>
                <div className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div
                  style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                  className="flex items-center text-xs px-3 bg-green-200 text-green-800 rounded-full"
                >
                  25%
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-5xl text-center">{sumTotalOrdenes}</div>
              <div className="font-bold text-sm">ventas</div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2  bg-white rounded overflow-hidden shadow-lg m-2">
            <div className="p-5 mr-15">
            <Chart height={300} width={600}>
              <Bars
                colors="category10"
                groupPadding="3%"
                innerPadding="0.5%"
                minY={0}
                series={[
                  {
                    data: [1, 2, 3],
                  },
                  {
                    data: [
                      5,
                      {
                        color: "violet",
                        y: 7,
                      },
                      11,
                    ],
                  },
                  {
                    data: [13, 17, 19],
                  },
                ]}
              />
            </Chart>
            </div>
          </div>
          <div className="flex">
            <div className="w-80 bg-white rounded overflow-hidden shadow-lg m-2">
              <div className="  flex justify-center content-center ">
                <div className="relative p-5">
                  <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">
                    {sumTotalOrdenes}
                  </b>
                  <Chart
                    height={250}
                    series={[
                      {
                        data: [
                          sumOrdenesPendientes,
                          sumOrdenesRealizadas,
                          sumOrdenesEntregados,
                        ],
                      },
                    ]}
                    width={250}
                  >
                    <Transform method={["transpose", "stackNormalized"]}>
                      <Pies
                        colors={["red", "green", "blue"]}
                        combined
                        cornerRadius={5}
                        innerPadding={10}
                        innerRadius="40%"
                        padAngle={0.025}
                        pieAttributes={{
                          onMouseLeave: function noRefCheck() {},
                          onMouseMove: function noRefCheck() {},
                        }}
                        pieStyle={{
                          opacity: 2,
                        }}
                      />
                    </Transform>
                  </Chart>
                </div>
              </div>
              <h1 className="text-center text-xl m-5">ordenes totales</h1>
            </div>
            <div className="w-80 bg-white rounded  shadow-lg m-2">
              <div>
                <h1 className="text-center border-b-2 bg-white p-2">
                  Vendedores
                </h1>
              </div>
              <div className="">
                {vendedores.map((e: any) => (
                  <div className="m-2 p-2 flex rounded  shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">{e.name}</h1>
                      <h1 className="text-2xl text-start ">{e.lastname}</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      {e.ordenes.length}
                    </h1>
                  </div>
                ))}
                <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>

                  <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                    <div className="w-1/3 text-3xl text-gray-200 text-center ">
                      <AiOutlineUser />
                    </div>
                    <div className="w-1/2 flex">
                      <h1 className="text-2xl text-start mr-2 ">hola</h1>
                      <h1 className="text-2xl text-start ">holaaaaa</h1>
                    </div>
                    <h1 className=" w-1/5 text-2xl text-center ">
                      comoooo
                    </h1>
                  </div>


              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 p-5  bg-white rounded overflow-hidden shadow-lg m-2">
           
          </div>
        </div>


      </div>
    </Layout>
  );
};

export default Dashboard;
