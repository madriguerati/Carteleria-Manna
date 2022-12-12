
type Props ={
    ordenes:any
}

const OrdenesTableDashboard =({ordenes}:Props)=>{
   return(
    <>
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
          ordenes.map((e:any)=>(
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
   </>
   )
}
export default OrdenesTableDashboard 