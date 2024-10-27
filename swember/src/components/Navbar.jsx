import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const menuItems = [
		{ title: 'Home', path: '/' },
		{ title: 'About', path: '/about' },
		{ title: 'Contact', path: '/contact' },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<motion.div
						className='flex items-center space-x-2 cursor-pointer'
						onClick={() => navigate('/')}
						whileHover={{ scale: 1.05 }}
					>
						{/* <Heart className="h-8 w-8 text-rose-500" /> */}
						<img src='https://swember.in/assets/logo.png' alt='Logo' className='h-14 w-14' style={{ transform: 'translateY(-6px)' }}/>

						{/* <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
               Swember
            </span> */}
						<img src='https://swember.in/assets/swember.gif' alt='Swember' className='h-16' />
					</motion.div>

					{/* Desktop Menu */}
					<div className='hidden md:flex items-center space-x-8'>
						{menuItems.map((item) => (
							<motion.button
								key={item.title}
								className='text-gray-600 hover:text-gray-900 font-medium'
								whileHover={{ scale: 1.05 }}
								onClick={() => navigate(item.path)}
							>
								{item.title}
							</motion.button>
						))}
						<motion.button
							className='bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium'
							whileHover={{ scale: 1.05 }}
							onClick={() => navigate('/pre-register')}
						>
							Pre-Register
						</motion.button>
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden'>
						<button onClick={() => setIsOpen(!isOpen)} className='text-gray-600 hover:text-gray-900'>
							{isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='md:hidden bg-white border-t'
					>
						<div className='px-4 pt-2 pb-3 space-y-1'>
							{menuItems.map((item) => (
								<motion.button
									key={item.title}
									className='block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md'
									whileHover={{ scale: 1.02 }}
									onClick={() => {
										navigate(item.path);
										setIsOpen(false);
									}}
								>
									{item.title}
								</motion.button>
							))}
							<motion.button
								className='w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium mt-4'
								whileHover={{ scale: 1.02 }}
								onClick={() => {
									navigate('/pre-register');
									setIsOpen(false);
								}}
							>
								Pre-Register
							</motion.button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
