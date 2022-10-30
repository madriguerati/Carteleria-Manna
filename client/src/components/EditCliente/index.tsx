import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useClients from "../../store/clientes";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";

type Props = {
  setShowModal2: any;
  client: any;
  setRefresh:any;
  refresh:any;
};
const ClienteEdit = ({ setShowModal2, client, setRefresh, refresh}: Props) => {
  const { success, putClients, closeModal, error, loading } = useClients(
    (state) => state
  );
  const [token] = useLocalStorage();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: client.id,
    name: client.name,
    telefono: client.telefono,
    cuit: client.cuit,
    email: client.email,
    direccion: client.direccion,
    condicioniva: client.condicioniva,
    razonsocial: client.razonsocial,
  });

  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("hola soy un cambio", values)
  };

  const handleCloseModal = () => {
    setShowModal2(false);
    closeModal();
  };
 

  const handleSubmit = (e: React.SyntheticEvent) => {
    putClients(values, token);
    handleCloseModal()
    setRefresh(true)
    success;
    loading
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaa", refresh)
  };

  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
      <div className="p-6 space-y-4 sm:p-8">
        <button
          className="absolute right-4 top-6 bg-white text-gray-500 text-2xl w-10 h-10 rounded-full flex justify-center border border-gray-300"
          onClick={handleCloseModal}
        >
          x
        </button>
        <div
          className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${
            success ? "bg-[#c2e593]" : error ? "bg-red-300" : "bg-[#77B327]"
          }`}
        >
          <h3
            className={`text-3xl font-semibold text-center ${
              success
                ? "text-[#77B327]"
                : error
                ? "text-red-700"
                : "text-zinc-800"
            }`}
          >
            {success
              ? "Insumo editado exitosamente"
              : error
              ? "Ocurrio un error"
              : "Editar Insumo"}
          </h3>
          {success && (
            <BsFillCheckCircleFill size={55} className="text-[#77B327]" />
          )}

          {error && <MdError size={55} className="text-red-700 ml-1" />}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <div className="flex">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                name
              </label>
              <input
                type="text"
                name="name"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={values.name}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="ml-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                telefono
              </label>
              <input
                type="number"
                name="telefono"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Telefono"
                value={values.telefono}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
          </div>
          

          <div>
            <div className="flex">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-2">
                  Cuit
                </label>
                <input
                  type="text"
                  name="cuit"
                  className="px-4 py-3 mt-1 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                  placeholder="Cuit"
                  value={values.cuit}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p className="text-red-600 text-sm">{errors.lastname}</p>
                )}
              </div>
              <div className="ml-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-2">
                  EMAIL
                </label>
                <input
                  type="text"
                  name="email"
                  className="px-4 py-3 mt-1 w-60 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                  placeholder="EMAIL"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p className="text-red-600 text-sm">{errors.lastname}</p>
                )}
              </div>
            </div>
          </div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1">
            DIRECCION
          </label>

          <input
            type="text"
            name="direccion"
            className="px-4 py-3 mt-2 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
            placeholder="DIRECCION"
            value={values.direccion}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <div className="flex">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1">
                Condicion I.V.A
              </label>
              <input
                type="text"
                name="condicioniva"
                className="px-4 py-3 mt-2 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Condicion I.V.A"
                value={values.condicioniva}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm">{errors.lastname}</p>
              )}
            </div>
            <div className="ml-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-1">
                Razón Social
              </label>
              <input
                type="text"
                name="razonsocial"
                className="px-4 py-3 mt-2 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="RAZON SOCIAL"
                value={values.razonsocial}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteEdit;
