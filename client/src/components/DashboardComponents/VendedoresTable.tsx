
type Props ={
    vendedores:any
}
const VendedoresTable =({vendedores}:Props)=>{
    return(
<>
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
</>
    )
}
export default VendedoresTable