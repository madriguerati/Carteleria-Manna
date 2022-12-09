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
  const { ordenes2, getOrdenesAll, getOrdenes, deleteOrdenes, loading } =
    useOrdenes((state) => state);
  const { carteles2, cartel, getCarteles } = useCartel((state) => state);
  const { getUsers2, users, logout, user } = useUser((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  var fechaActual: any = moment().format("MM/DD/YYYY");
  const [fecha, setFecha] = useState(fechaActual);
  const [values, setValues] = useState({
    date1: fecha,
    date2: fecha + 1,
  });
  useEffect(() => {
    getOrdenes(accessToken);
    getUsers2(headers);
    getCarteles(accessToken);
  }, []);

  var arrayprueba: any = carteles2.map((e: any) => ({
    cartel: e.descripcion,
    item: [],
  }));
  var cont: any = 0;

 
  //Start operadores
  var totalOrdenes: any = ordenes2.map((e: any) => 1);
  var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);

  //pendientes
  var ordenesPendientes: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "pendiente" && e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesImpresiones: any = ordenes2.map(
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
  var sumOrdenesPendientesImpresiones: any =
    ordenesPendientesImpresiones.reduce((a: any, b: any) => a + b, 0);
  //realizadas
  var ordenesRealizadas: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "realizada" && e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasImpresiones: any = ordenes2.map(
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
  var sumOrdenesRealizadasImpresiones: any =
    ordenesRealizadasImpresiones.reduce((a: any, b: any) => a + b, 0);
  //entregados
  var ordenesEntregados: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "entregada" && e.stateCarteleria === "entregada"
  );
  var ordenesEntregadosCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "entregada"
  );

  var ordenesEntregadosImpresiones: any = ordenes2.map(
    (e: any) => e.stateImpresiones === "entregada"
  );

  var sumOrdenesEntregados: any = ordenesEntregados.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesEntregadosImpresiones: any =
    ordenesEntregadosImpresiones.reduce((a: any, b: any) => a + b, 0);
  var sumOrdenesEntregadosCarteleria: any = ordenesEntregadosCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //End operadores

  //totales
  var totalesSeña: any = ordenes2.map((e: any) => e.seña);
  var sumSeñas: any = totalesSeña.reduce((a: any, b: any) => a + b, 0);
  var totales: any = ordenes2.map((e: any) => e.montototal);
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
      date2: fechaActual + 1,
    });
    let busca: any = ordenes2.filter(
      (n: any) =>
        moment(n.fecha).format("L") >= moment(values.date1).format("L") &&
        moment(n.fecha).format("L") <= moment(values.date2).format("L")
    );
    ordenes2=busca;
   
  };
  //carteles2 rating
  var num: any = arrayprueba.map((e: any) =>
    e.item.reduce((a: any, b: any) => a + b, 0)
  );
  //fin carteles2
  var hola: any = num.sort(function (a: any, b: any) {
    return b - a;
  });
  return (
    <Layout>
      <div>
        <div className="p-2 bg-[#77B327] m-2 rounded">
          <h1 className="text-4xl text-start text-white m-5">
            Hola, {user.name} {user.lastname}
          </h1>
        </div>
        <div className=" mr-2 mb-2 ml-2 rounded mt-2 p-2  flex justify-end">
          <div className="w-1/4 flex justify-end align-center pt-2 ml-2">
            

            <div date-rangepicker className="flex items-center">
  <div className="relative">
    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
    </div>
    <input name="date1"
              value={values.date1}
              onChange={handleChange} type="text" className="text-2xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-20 text-center pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
  </div>
  <span className="mx-4 text-gray-500">to</span>
  <div className="relative">
    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
    </div>
    <input name="date1"
              value={values.date2}
              onChange={handleChange} type="text" className=" text-2xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  md:w-40 sm:w-20 pl-10 p-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
</div>
</div>
            <button
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 text-2xl font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={searchByDate}
            >
              filtrar
            </button>
          </div>
        </div>

        <div className="flex m-2 content-center"></div>

        <div
          className="flex grid sm:gap-1  sm:grid-cols-1
          md:gap-2 md:grid-cols-2 m-2"
        >
          <div className="flex content-center justify-center">
            <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160 p-5 mr-4">
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
                <div className="font-bold text-5xl">
                  {sumTotales + sumSeñas}
                </div>
                <div className="font-bold text-sm">Totales</div>
              </div>
            </div>

            <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160 p-5 m-1">
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
                <div className="font-bold text-5xl text-start">
                  {sumTotales}
                </div>
                <div className="font-bold text-sm">por cobrar</div>
              </div>
            </div>
          </div>
          <div className="flex content-center justify-center">
            <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160 p-5 mr-4">
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
                <div className="font-bold text-5xl text-start">{sumSeñas}</div>
                <div className="font-bold text-sm">Señas cobradas</div>
              </div>
            </div>
            <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160 p-5">
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
        </div>

        <div
          className="flex grid sm:gap-1  sm:grid-cols-1
          md:gap-4 md:grid-cols-4 m-2"
        >
          <div className="bg-white rounded shadow-lg mt-2">
            <div className=" m-1/4 overflow-x-auto relative shadow-md ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <tr className="bg-white text-lg border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {e.name} {e.lastname}
                      </th>
                      <td className="py-4 px-6">{e.ordenes.length}</td>
                      <td className="py-4 px-6">
                        {e.state === false ? (
                          <h1 className="bg-gray-600 rounded text-center text-white">
                            off
                          </h1>
                        ) : (
                          <h1 className="bg-green-600 rounded text-center text-white">
                            on
                          </h1>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160">
            <div className=" w-full ">
              <div className="  flex w-full justify-center content-center ">
                <div className="relative p-5">
                  <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">
                    {sumTotalOrdenes}
                  </b>
                  <Chart
                    height={250}
                    series={[
                      {
                        data: [
                          sumOrdenesPendientesCarteleria +
                            sumOrdenesPendientesImpresiones,
                          sumOrdenesRealizadasCarteleria +
                            sumOrdenesRealizadasImpresiones,
                          sumOrdenesEntregadosCarteleria +
                            sumOrdenesEntregadosImpresiones,
                        ],
                      },
                    ]}
                    width={300}
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

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-160 md:w-160 lg:w-160">
            <div className=" w-full ">
              <div className="  flex w-full justify-center content-center ">
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
                    width={300}
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

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-160 md:w-160 lg:w-160">
            <div className=" w-full ">
              <div className="  flex w-full justify-center content-center ">
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
                    width={300}
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
              <h1 className="text-center text-xl m-5">Taller</h1>
            </div>
          </div>
        </div>

        <div className="flex m-2 grid sm:gap-1  sm:grid-cols-1
          md:gap-2 md:grid-cols-2">


                        

       
<div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full mt-2 bg-white">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    N° factura
                </th>
                <th scope="col" className="py-3 px-6">
                    Cliente
                </th>
                <th scope="col" className="py-3 px-6">
                  Contacto
                </th>
                <th scope="col" className="py-3 px-6">
                    Carteles
                </th>
                <th scope="col" className="py-3 px-6">
                    Estado
                </th>
            </tr>
        </thead>
        <tbody>
            {
              ordenes2.map((e:any)=>(
                <tr className="bg-white border-b text-lg dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {e.facturanum}
                </th>
                <td className="py-4 px-6">
                    {e.cliente}
                </td>
                <td className="py-4 px-6">
                    {e.contacto}
                </td>
                <td className="py-4 px-6">
                    {e.carteles.length}
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{ e.stateCarteleria}</a>
                </td>
            </tr>
              ))
            }
        </tbody>
    </table>
</div>





          <div className=" w-full bg-white rounded mt-2 shadow-lg ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr className="bg-white border-b text-lg dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.cartel}
                    </th>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full  `}
                          style={{ width: 40 }}
                        >
                          {" "}
                          {e.item.reduce((a: any, b: any) => a + b, 0)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {e.item.reduce((a: any, b: any) => a + b, 0)}
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
