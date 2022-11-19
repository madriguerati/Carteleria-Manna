import Layout from "../components/Layout/index";
import useOrdenes from "../store/ordenes";
import useLocalStorage from "../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import { useEffect, useState, Fragment } from "react";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';


const Dashboard = () => {
    const { ordenes, getOrdenesAll, getOrdenes, deleteOrdenes, loading } = useOrdenes(
        (state) => state
      );

      useEffect(() => {
        getOrdenes(accessToken);
        console.log("holaaaaaa", ordenes);
    
        
      }, []);

      //Start operadores
      var totalOrdenes: any = ordenes.map((e:any)=>1 )
      var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);
      //End operadores

    return (
        <Layout>
           <div className="max-w-sm w-80 p-20 bg-white rounded overflow-hidden shadow-lg flex justify-center m-2">
            <div>
            <div>
                <h1 className="text-center">
                    {sumTotalOrdenes}
                </h1>
            </div>
            <div className="flex justify-center">
                <p className="text-center">Total ventas</p>
            </div>
            </div>
           </div>
        </Layout>
    )
}

export default Dashboard