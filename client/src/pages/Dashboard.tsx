import Layout from "../components/Layout/index";
import useOrdenes from "../store/ordenes";
import useLocalStorage from "../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import { useEffect, useState, Fragment } from "react";
import useUser from "../store/user";
import useHeaders from "../hooks/useHeaders";
import {AiOutlineUser} from 'react-icons/ai'

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

const Dashboard = () => {
  const { ordenes, getOrdenesAll, getOrdenes, deleteOrdenes, loading } =
    useOrdenes((state) => state);
  const { getUsers2, users, logout } = useUser((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);

  useEffect(() => {
    getOrdenes(accessToken);
    getUsers2(headers);
    console.log("holaaaaaa", users);
  }, []);

  //Start operadores
  var totalOrdenes: any = ordenes.map((e: any) => 1);
  var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);
//pendientes
var ordenesPendientes:any = ordenes.map((e:any)=>e.stateImpresiones === false && e.stateCarteleria===false)
var sumOrdenesPendientes: any = ordenesPendientes.reduce((a: any, b: any) => a + b, 0);
//realizadas
var ordenesRealizadas:any = ordenes.map((e:any)=>e.stateImpresiones === true && e.stateCarteleria===true)
var sumOrdenesRealizadas: any = ordenesRealizadas.reduce((a: any, b: any) => a + b, 0);
//entregados
var ordenesEntregados:any = ordenes.map((e:any)=>e.entregadoImpresiones === true && e.entregadoCarteleria===true)
var sumOrdenesEntregados: any = ordenesEntregados.reduce((a: any, b: any) => a + b, 0);
  //End operadores
  //vendedores
  var vendedores: any = users.filter((e:any)=>e.roles.find((e:any)=>e.name==="vendedor"))

  return (
    <Layout>
     <div>
        <div className="flex">
            <div className="w-1/2  bg-white rounded overflow-hidden shadow-lg m-2">
                <div>
                    <h1 className="text-center border-b-2 bg-green-200 p-2">Vendedores</h1>
                </div>
                <div className="m-1 ">
                   {
                    vendedores.map((e:any)=>(
                     <div className="m-2 p-2 flex rounded overflow-hidden shadow-lg">
                      <div className="w-1/3 text-3xl text-gray-400 text-center ">
                        <AiOutlineUser />
                      </div>
                       <div className="w-1/2 flex">
                       <h1 className="text-2xl text-center mr-2 ">{e.name}</h1> 
                       <h1 className="text-2xl text-center ">{e.lastname}</h1> 
                       </div>
                       <h1 className=" w-1/5 text-2xl text-center ">{e.ordenes.length}</h1>
                     </div>
                    ))
                   }
                </div>
            </div>
            <div className="flex">
            <div className="w-80 bg-white rounded overflow-hidden shadow-lg m-2">
      <div className="  flex justify-center content-center ">
        
        <div className="relative p-5">
          <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">{sumTotalOrdenes}</b>
          <Chart
            height={250}
            series={[
              {
                data: [sumOrdenesPendientes, sumOrdenesRealizadas, sumOrdenesEntregados],
              },
            ]}
            width={250}
          >
            <Transform method={["transpose", "stackNormalized"]}>
              <Pies
                colors={[
                    'red',
                    'green',
                    'blue'
                    
                  ]}
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
                  opacity: .5,
                }}
              />
            </Transform>
          </Chart>
        </div>
      </div>
      <h1 className="text-center text-xl m-5">ordenes totales</h1>
      </div>
                <div className="w-80 bg-white rounded overflow-hidden shadow-lg m-2">
                 <h1>Hola</h1>   
                </div>
            </div>
        </div>
     </div>
    </Layout>
  );
};

export default Dashboard;
