import React from 'react'
import moment from "moment";
import { BsSearch, BsPrinter } from "react-icons/bs";
import useOrdenes from "../../store/ordenes";
import useHeaders from "../../hooks/useHeaders";
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);


type Props = {
    e: any;
  };


function Card({ e }: Props) {

    const { putOrden, success, error, closeModal } = useOrdenes(
        (state) => state
      );
      const aceptar = () => {
        e.stateCarteleria = true;
        var values: any = {
          ...values,
          stateCarteleria: true,
          id:e._id
        };
        console.log("holaaaaaaaaaaaaa soy un camboio aaa", values, e);
    
        putOrden(values, headers);
      };
      const deshacer = () => {
        e.stateCarteleria = false;
        console.log("holaaaaaaaaaaaaa soy un camboio aaa", e._id);
        var values: any = {
          ...values,
          stateCarteleria: false,
          id: e._id,
        };
        console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
    
        putOrden(values, headers);
      };

  return (
    <div className="mb-2 rounded-lg  border-2 border-gray-200 border-b-gray-500">
                          <div className="block  mr-5 mt-5 ml-5 mb-1 p-1 rounded ">
                            <div className="flex w-full border-b-2">
                              <div className=" flex w-5/6  mt-2 mb-2">
                                <h1 className="m-4">
                                  <b>Orden N° </b>
                                  {e.facturanum}
                                </h1>
                                <h1 className="m-4">
                                  <b>cliente: </b>
                                  {e.cliente}
                                </h1>
                              </div>
                              <div className="flex">
                                <h1 className="w-5/6 m-4">
                                  {moment(e.fecha).format("L")}
                                </h1>
                                <div>
                                  {
                                    e.stateCarteleria === false
                                    ? <h1 className="text-white bg-red-600 rounded-lg align-center text-center p-2 m-2">
                                    Pendiente
                                  </h1>
                                  :
                                  <h1 className="text-white bg-green-600 rounded-lg align-center text-center p-2 m-2">
                                    Realizada
                                  </h1>
                                  }
                                </div>
                                <div className="flex justify-end m-4">
                                  <h1 className="align-center mr-2" style={{ cursor: "pointer" }}>
                                    <BsSearch />
                                  </h1>
                                  <h1 className="align-center mr-2" style={{ cursor: "pointer" }}>
                                    <BsPrinter />
                                  </h1>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="flex m-1 rounded  ">
                              <div className="m-2   w-2/3">
                                <div className="flex w-full">
                                  <div className="m-2 w-40">
                                    <h1><b>TIPO DE CARTEL</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <div>
                                        <h1>{item.name}</h1>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="m-2">
                                    <h1><b>MEDIDAS</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>
                                        {item.base} x {item.altura}
                                      </h1>
                                    ))}
                                  </div>
                                  <div className="m-2">
                                    <h1><b>ESTRUCTURA</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>{item.estructura}</h1>
                                    ))}
                                  </div>
                                  <div className="m-2">
                                    <h1><b>OTROS</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>{item.otros}</h1>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="justify-end m-2 w-2/4 p-3 bg-gray-100 rounded ">
                                
                                <b>OBSERVACIONES:</b>
                                <br />
                                {e.observaciones}
                                <div></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start ml-5 mb-2 mt-1">
                            <button
                              className="text-blue-500 w-40 items-center p-5 h-15 shadow border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-4 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={
                                e.stateCarteleria===false
                                ? aceptar
                                : deshacer

                            }
                            >
                              aceptar
                            </button>
                            {
                                e.stateCarteleria===true
                                ?  <h1
                                className="flex justify-center items-center text-red-600 m-5"
                                onClick={deshacer}
                                style={{ cursor: "pointer" }}
                              >
                                Cancelar
                              </h1>
                              :
                              ""
                            }
                          </div>
                        </div>
  )
}

export default Card
