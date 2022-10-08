import { useState } from "react";

type Props = {
	showModal: boolean;
	setShowModal: any;
	children: any;
};

const Modal = ({ showModal, setShowModal, children }: Props) => {
	return (
		<>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
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

export default Modal;
