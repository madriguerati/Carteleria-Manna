import Layout from "../components/Layout/index";
import useOrdenes from "../store/ordenes";
import useLocalStorage from "../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import { useEffect, useState, Fragment } from "react";
import useUser from "../store/user";
import useCartel from "../store/carteles";
import { Progress } from "@material-tailwind/react";

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
  
  const { ordenes, getOrdenesAll, getOrdenes, deleteOrdenes, loading } =
    useOrdenes((state) => state);
  const { carteles, cartel, getCarteles } = useCartel((state) => state);
  const { getUsers2, users, logout, user } = useUser((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [ordenesGlobales, setOrdenesGlobales] = useState(ordenes);
  var fechaActual: any = moment().format("MM/DD/YYYY");
  const [fecha, setFecha]=useState(fechaActual)
  const [values, setValues] = useState({
    date1: fecha,
    date2: fecha+1,
  });
  useEffect(() => {
    getOrdenes(accessToken);
    getUsers2(headers);
    getCarteles(accessToken);
    
  }, []);
 
  var arrayprueba: any = carteles.map((e: any) => ({
    cartel: e.descripcion,
    item: [],
  }));
  var cont: any = 0;

  for (let i = 0; i < carteles.length; i++) {
    for (let k = 0; k < ordenesGlobales.length; k++) {
      //console.log(" en mi orden", ordenesGlobales[k].carteles.length, "factura", ordenesGlobales[k].facturanum)
      var arregloOrdenes: any = [];
      arregloOrdenes = ordenesGlobales[k].carteles.map((e: any) => e.name);
      
      if (arregloOrdenes.includes(carteles[i].descripcion)) {
        var filtrado: any = ordenesGlobales[k].carteles.filter(
          (e: any) => e.name === carteles[i].descripcion
        );
        
        var nuevoarrr: any = arrayprueba.find(
          (item: any) => item.cartel === carteles[i].descripcion
        );
        if (nuevoarrr) {
          arrayprueba[i].item.unshift(filtrado.length);
        }
      } else {
        //console.log("hola");
        //console.log(" en mi orden", ordenesGlobales[k].carteles.length, "factura", ordenesGlobales[k].facturanum)
      }
    }
  }
  //Start operadores
  var totalOrdenes: any = ordenesGlobales.map((e: any) => 1);
  var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);

  //pendientes
  var ordenesPendientes: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === "pendiente" && e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesCarteleria: any = ordenesGlobales.map(
    (e: any) => e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesImpresiones: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === "pendiente"
  );
  var sumOrdenesPendientes: any = ordenesPendientes.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesPendientesCarteleria: any = ordenesPendientesCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesPendientesImpresiones: any = ordenesPendientesImpresiones.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //realizadas
  var ordenesRealizadas: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === "realizada" && e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasCarteleria: any = ordenesGlobales.map(
    (e: any) => e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasImpresiones: any = ordenesGlobales.map(
    (e: any) => e.stateImpresiones === "realizada"
  );
  var sumOrdenesRealizadas: any = ordenesRealizadas.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesRealizadasCarteleria: any = ordenesRealizadasCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesRealizadasImpresiones: any = ordenesRealizadasImpresiones.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //entregados
  var ordenesEntregados: any = ordenesGlobales.map(
    (e: any) =>
      e.stateImpresiones === "entregada" && e.stateCarteleria === "entregada"
  );
  var ordenesEntregadosCarteleria: any = ordenesGlobales.map(
    (e: any) =>
    e.stateCarteleria === "entregada"
  );
 
  var ordenesEntregadosImpresiones: any = ordenesGlobales.map(
    (e: any) =>
    e.stateImpresiones === "entregada"
  );
  
  var sumOrdenesEntregados: any = ordenesEntregados.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesEntregadosImpresiones: any = ordenesEntregadosImpresiones.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesEntregadosCarteleria: any = ordenesEntregadosCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //End operadores

  //totales
  var totalesSeña: any = ordenesGlobales.map((e: any) => e.seña);
  var sumSeñas: any = totalesSeña.reduce((a: any, b: any) => a + b, 0);
  var totales: any = ordenesGlobales.map((e: any) => e.montototal);
  var sumTotales: any = totales.reduce((a: any, b: any) => a + b, 0);
  //totales

  //vendedores
  var vendedores: any = users.filter((e: any) =>
    e.roles.find((e: any) => e.name === "vendedor")
  );
  
 
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("una fecha ", values);
  };
  const searchByDate = () => {
    setValues({
      ...values,
      date1: fechaActual,
      date2: fechaActual+1
    })
    let busca: any = ordenes.filter(
      (n: any) =>
        moment(n.fecha).format("L") >= moment(values.date1).format("L") &&
        moment(n.fecha).format("L") <= moment(values.date2).format("L")
    );
    setOrdenesGlobales(busca);
console.log("hola", sumOrdenesPendientes,
sumOrdenesRealizadas,
sumOrdenesEntregados,
sumOrdenesPendientesCarteleria,
                          sumOrdenesRealizadasCarteleria,
                          sumOrdenesEntregadosCarteleria,)
  };
  //carteles rating
  var num: any = arrayprueba.map((e: any) =>
    e.item.reduce((a: any, b: any) => a + b, 0)
  );
  //fin carteles
  var hola: any =num.sort(function(a:any, b:any){return b- a})
  return (
    <Layout>
      <div>
        <div className="rounded p-2">
          <h1 className="text-4xl text-start text-gray-400">
            Hola, {user.name}
          </h1>
        </div>
        <div className=" mr-2 mb-2 ml-2 rounded  flex justify-end">
          <h1 className="text-xl text-gray-400 text-center pt-3">
            Filtrar resultadosq por fecha
          </h1>
          <div className="w-1/4 flex justify-end align-center pt-2 ml-2">
            <h1 className="text-1xl text-gray-600 text-center mr-1 pt-2 ">
              desde
            </h1>

            <input
              type="date"
              id="input-group-1"
              className="bg-gray-50 border w-1/4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-2 pr-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              name="date1"
              value={values.date1}
              onChange={handleChange}
            />
            <h1 className="text-1xl text-gray-600 pt-2 mr-1 ml-1 content-center flex">
              hasta
            </h1>

            <input
              type="date"
              id="input-group-1"
              className="bg-gray-50 border w-1/4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-2 pr-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              name="date2"
              value={values.date2}
              onChange={handleChange}
            />
            <button
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={searchByDate}
            >
              filtrar
            </button>
          </div>
        </div>

        <div className="flex m-2 content-center">
          <div className="flex flex-wrap flex-row sm:flex-col m-1 mr-3 justify-center items-center w-full sm:w-1/3 p-5 bg-white rounded-md shadow-xl border-l-4 border-blue-300">
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
              <div className="font-bold text-5xl">{sumTotales + sumSeñas}</div>
              <div className="font-bold text-sm">Totales</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row m-1 sm:flex-col justify-center items-center w-full sm:w-1/5 mr-4 p-5 bg-white rounded-md shadow-xl border-l-4 border-purple-300">
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
          <div className="flex flex-wrap flex-row  m-1 sm:flex-col justify-center items-center w-full sm:w-1/5 mr-4 p-5 bg-white rounded-md shadow-xl border-l-4 border-red-300">
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
          <div className="flex flex-wrap flex-row m-1 sm:flex-col justify-center items-center w-full sm:w-1/5  mr-6    p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300">
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
              <div className="font-bold text-5xl text-center">
                {sumTotalOrdenes}
              </div>
              <div className="font-bold text-sm">ventas</div>
            </div>
          </div>
        </div>

        <div className="flex m-2 ">
          <div className="bg-white rounded overflow-hidden shadow-lg m-1"></div>

          <div className="w-1/4  bg-white rounded shadow-lg mt-2">
            <div className=" m-1/2 overflow-x-auto relative shadow-md ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Vendedor
                    </th>
                    <th scope="col" className="py-3 px-6">
                     Ventas
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendedores.map((e: any) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {e.name} {e.lastname}
                      </th>
                      <td className="py-4 px-6">{e.ordenes.length}</td>
                      <td className="py-4 px-6">{
                      e.state === false
                      ? <h1 className="bg-gray-200 rounded text-center">Fuera de sesión</h1>
                      : <h1 className="bg-green-200 rounded text-center">Activo</h1>
                      }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex w-1/3">
          <div>
            <div className="w-80 bg-white rounded overflow-hidden shadow-lg  ml-7 mt-2">
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
                          sumOrdenesPendientesCarteleria+sumOrdenesPendientesImpresiones,
                          sumOrdenesRealizadasCarteleria+ sumOrdenesRealizadasImpresiones,
                          sumOrdenesEntregadosCarteleria+ sumOrdenesEntregadosImpresiones,
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
          </div>

          <div>
            <div className="w-80 bg-white rounded overflow-hidden shadow-lg  ml-7 mt-2">
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
                          sumOrdenesPendientesImpresiones,
                          sumOrdenesRealizadasImpresiones,
                          sumOrdenesEntregadosImpresiones,
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
              <h1 className="text-center text-xl m-5">Impresiones</h1>
            </div>
          </div>
          <div>
            <div className="w-80 bg-white rounded overflow-hidden shadow-lg  ml-7 mt-2">
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
                          sumOrdenesPendientesCarteleria,
                          sumOrdenesRealizadasCarteleria,
                          sumOrdenesEntregadosCarteleria,
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
              <h1 className="text-center text-xl m-5">Carteleria</h1>
            </div>
            </div>
           
          
      
         
        </div>
        </div>
        <div className="flex">
        <div className=" w-1/2  bg-white rounded shadow-lg m-2 ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Producto
                  </th>
                  <th scope="col" className="py-3 px-6">
                    sidebar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    porcentaje
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrayprueba.map((e: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.cartel}
                    </th>
                    <td className="py-4 px-6">
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div className={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full  `} style={{"width":40}}> {e.item.reduce((a: any, b: any) => a + b, 0)}</div>
  </div>
                    </td>
                    <td className="py-4 px-6">{e.item.reduce((a: any, b: any) => a + b, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className=" w-1/2  bg-white rounded shadow-lg m-2 ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="py-3 px-6">
                    Fecha
                  </th>
                  <th scope="col" className="py-3 px-6">
                    N° factura
                  </th>
                  <th scope="col" className="py-3 px-6">
                   cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                    carteles
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Entrega
                  </th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {ordenesGlobales.map((e: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {moment(e.fecha).format("L")}
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.facturanum}
                    </th>
                    <td className="py-4 px-6">
                    
          {e.cliente}
                    </td>
                    <td className="py-4 px-6">{e.carteles.length}</td>
                    <td className="py-4 px-6">
                    
          {e.fechaentrega}
                    </td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
