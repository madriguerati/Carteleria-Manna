import { validateInfo } from './../utils/validate';
import useForm from './../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useUser from '../store/user';

const Register = () => {
  const { user, success, signup } = useUser((state) => state);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
    setErrors(
      validateInfo({
        ...values,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  
    if(values.username && Object.keys(errors).length === 0) {
      // try {
        // const data = await axios.post('http://localhost:5000/api/user/signUp', values)  
        // console.log(data)
        signup(values);
        console.log('user', user)
        // alert('Registrado');
        // navigate("/")
      // } catch (error) {
      //   alert('Correo ya registrado');
      // }
    }
    console.log(user, success, 'nose')
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">Registrarse</h1>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <input
                type="text"
                name="username"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre de Usuario"
                value={values.username}
                onChange={handleChange}
            />
            {errors.username && <p className='text-red-700'>{errors.username}</p>}
            <input
                type="email"
                name="email"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleChange}
            />
            {errors.email && <p className='text-red-700'>{errors.email}</p>}
            <input
                type="password"
                name="password"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
            />
            {errors.password && <p className='text-red-700'>{errors.password}</p>}
            <input
                type="password"
                name="password2"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Repita la contraseña"
                value={values.password2}
                onChange={handleChange}
            />
            {errors.password2 && <p className='text-red-700'>{errors.password2}</p>}
            <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            >
              Registrarse
            </button>
            <div className="flex flex-col items-center mt-5">
              <p className="mt-1 text-sm font-base text-black">
                Ya estás registrado?<Link to='/account/login' className="ml-2 font-medium text-red-700 cursor-pointer">Iniciar Sesión</Link>
              </p>
              <h1>{user.email}</h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register