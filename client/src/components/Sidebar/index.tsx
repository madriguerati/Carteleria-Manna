import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
	MdOutlineSpaceDashboard,
	MdOutlineAnalytics,
	MdOutlineIntegrationInstructions,
	MdOutlineMoreHoriz,
	MdOutlineSettings,
	MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import useUser from "./../../store/user";
import { useEffect } from "react";

const Sidebar = () => {
	const { getUser, tokken, user, logout } = useUser((state) => state);

	useEffect(() => {
    const loggedUserJSON : any = localStorage.getItem('auth');
    const token = JSON.parse(loggedUserJSON);
		getUser(token);
	}, []);

	console.log(user.roles, "user");
	return (
		<div>
			<Disclosure as='nav'>
				<Disclosure.Button className='absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-[#77B327] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group'>
					<GiHamburgerMenu
						className='block lg:hidden h-6 w-6'
						aria-hidden='true'
					/>
				</Disclosure.Button>
				<div className='p-6 h-screen bg-zinc-800 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200'>
					<div className='flex flex-col justify-start item-center'>
						<div className='border-b border-gray-100 pb-4 w-full'>
							<img
								src='https://carteleriamanna.com.ar/sistema/img/generales/logo.png'
								alt='Manna Logo'
								className='w-3/4 self-center'
							/>
						</div>
						<div className=' my-4 border-b border-gray-100 pb-4'>
							<div className='flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<MdOutlineSpaceDashboard className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Dashboard
								</h3>
							</div>
							<div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<CgProfile className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Profile
								</h3>
							</div>
							<div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<FaRegComments className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Carteles
								</h3>
							</div>
							<div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<MdOutlineAnalytics className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Órdenes
								</h3>
							</div>
							<div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<BiMessageSquareDots className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Pagos
								</h3>
							</div>
							<div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<MdOutlineIntegrationInstructions className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Reportes{user.username}
								</h3>
							</div>
						</div>
						{/* setting  */}
						{user.roles?.find(
							(rol: any) =>
								rol.name === "admin" || rol.name === "gerente"
						) && (
							<div className=' my-4 border-b border-gray-100 pb-4'>
								<div className='flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
									<MdOutlineSettings className='text-2xl text-gray-500 group-hover:text-white ' />
									<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
										Administrar{user.roles?.map((e: any) => e.name)}
									</h3>
								</div>
								{/* <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-gray-500 group-hover:text-white " />
                <h3 className="text-base text-gray-400 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div> */}
							</div>
						)}
						{/* logout */}
						<div className=' my-4'>
							<div onClick={logout} className='flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<MdOutlineLogout className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-base text-gray-400 group-hover:text-white font-semibold '>
									Logout
								</h3>
							</div>
						</div>
					</div>
				</div>
			</Disclosure>
		</div>
	);
};

export default Sidebar;
