import { useState } from "react";

type Props = {
	children: any;
	showModal2:boolean
	setShowModal2:any
};

const ModalEdit = ({children, showModal2,setShowModal2 }: Props) => {
	return (
		<>
			{showModal2? (
				<>
					<div className='justify-center items-center grid overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[500px] my-6 mx-auto max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{children}
							</div>
						</div>
					</div>
					<div className='opacity-60 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
};

export default ModalEdit;
