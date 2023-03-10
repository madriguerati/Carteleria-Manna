import React from 'react'
import moment from "moment";
import { BsSearch, BsPrinter } from "react-icons/bs";
import useOrdenes from "../../store/ordenes";
import useHeaders from "../../hooks/useHeaders";
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import  Swal from 'sweetalert2';


type Props = {
    e: any;
  };

var num: any =0
function Card({ e }: Props) {

    const { putOrden, getOrdenesAll, success, error, closeModal } = useOrdenes(
        (state) => state
      );
      const aceptar = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            e.stateCarteleria = "realizada";
        var values: any = {
          ...values,
          stateCarteleria:"realizada",
          id:e._id
        };
        console.log("holaaaaaaaaaaaaa soy un camboio aaa", values, e);
    
        putOrden(values, headers);
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
        
      };
      const deshacer = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            if(e.stateCarteleria=== "entregada"){
          
              e.stateCarteleria ="realizada"
              var values: any = {
                ...values,
                stateCarteleria: "realizada",
                id: e._id,
              };
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
          
              putOrden(values, headers);
            } else if(e.stateCarteleria==="realizada") {
              e.stateCarteleria = "pendiente";
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", e._id);
              var values: any = {
                ...values,
                stateCarteleria: "pendiente",
                id: e._id,
              };
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
          
              putOrden(values, headers);
            }
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
        
      };

      const entregado = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            e.stateCarteleria = "entregada";
            console.log("holaaaaaaaaaaaaa soy un camboio aaa", e._id);
            var values: any = {
              ...values,
              stateCarteleria: "entregada",
              id: e._id,
            };
            console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
            putOrden(values, headers);
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
       
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
                              <div className="md:flex sm:block">
                                <h1 className="w-5/6 m-4">
                                  {moment(e.fecha).format("L")}
                                </h1>
                                <div>
                                  {
                                    e.stateCarteleria === "pendiente"
                                    ? <h1 className="text-white bg-red-600 rounded-lg align-center text-center p-2 m-2">
                                    Pendiente
                                  </h1>
                                  :
                                 ""
                                  }
                                  {
                                     e.stateCarteleria ==="realizada"
                                     ? <h1 className="text-white bg-green-600 rounded-lg align-center text-center p-2 m-2">
                                     Realizada
                                   </h1>
                                   :
                                  "" 
                                  }
                                  {
                                    e.stateCarteleria ==="entregada"
                                    ?
                                    <h1 className="text-white bg-blue-600 rounded-lg align-center text-center p-2 m-2">
                                    Entregado
                                  </h1>
                                  : ""
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
                            <div className="md:flex sm:block m-1 rounded  ">
                              <div className="m-2  md:w-[800px] border">
                                <div className="flex grid sm:gap-1 sm:grid-cols-1 md:gap-4 md:grid-cols-4">
                               
                                  <div className=" m-5">
                                    <b>TIPO DE CARTEL</b>
                                    <h1>{e.carteles.map((item: any) => (
                                      <div>
                                        <h1>{item.name}</h1>
                                      </div>
                                    ))}</h1>
                                  </div>
                                  <div className="m-5">
                                    <h1><b>MEDIDAS</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>
                                        {item.base} x {item.altura}
                                      </h1>
                                    ))}
                                  </div>

                                 <div className="m-5">
                                    <h1><b>ESTRUCTURA</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>{item.estructura}</h1>
                                    ))}
                                  </div>
                                  <div className="m-5 w-[200px]">
                                    <h1><b>OTROS</b></h1>
                                    {e.carteles.map((item: any) => (
                                      <h1>{item.otros}</h1>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="justify-end m-2 md:w-[600px] sm:w-full p-3 bg-gray-100 rounded ">
                                
                                <b>OBSERVACIONES:</b>
                                <br />
                                {e.observaciones}
                                <div></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start ml-5 mb-2 mt-1">
                          {
                              e.stateCarteleria== "pendiente"
                              ?
                              <button
                              className="text-blue-500 w-40 items-center p-5 h-15 shadow border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-4 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={
                                e.stateCarteleria==="pendiente"
                                ? aceptar
                                : entregado

                            }
                            >
                              {
                                e.stateCarteleria==="pendiente"
                                ?<p>Aceptar Orden</p>
                                :""
                              }
                              {
                                e.stateCarteleria==="realizada"?
                                <p>Entregar Orden</p>
                                :
                                ""
                              }
                            </button>
                            :
                            ""
                            
                            }
                            {
                              e.stateCarteleria== "realizada"
                              ?
                              <button
                              className="text-blue-500 w-40 items-center p-5 h-15 shadow border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-4 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={
                                e.stateCarteleria==="pendiente"
                                ? aceptar
                                : entregado

                            }
                            >
                              {
                                e.stateCarteleria==="pendiente"
                                ?<p>Aceptar Orden</p>
                                :""
                              }
                              {
                                e.stateCarteleria==="realizada"?
                                <p>Entregar Orden</p>
                                :
                                ""
                              }
                            </button>
                            :
                            ""
                            
                            }
                            {
                              e.stateCarteleria== "entregada"
                              ?
                            ""
                            :
                            ""
                            
                            }
                            {
                                e.stateCarteleria==="realizada"
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
                            {
                                e.stateCarteleria==="entregada"
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
