import { useState } from 'react';
import { motion } from 'framer-motion';

const PreRegistrationPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		gender: '',
		lookingFor: '',
		campus_id: '',
		customCampus: '',
		email: '',
		mobile: '',
		agreePromotion: true,
	});

	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [feedbackData, setFeedbackData] = useState('');
	const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleCampusChange = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, campus_id: value, customCampus: value === '5' ? '' : null });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('https://swember.in/register.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData).toString(),
			});
			const data = await response.json();
			if (data.status === 'success') {
				setRegistrationSuccess(true);
				setShowFeedbackPopup(true);
			} else {
				console.error('Error:', data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleFeedbackChange = (e) => {
		setFeedbackData(e.target.value);
	};

	const handleFeedbackSubmit = async (e) => {
		e.preventDefault();
		try {
			const feedbackResponse = await fetch('https://swember.in/feedback.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					name: formData.name,
					email: formData.email,
					mobile: formData.mobile || '',
					feedback: feedbackData,
				}).toString(),
			});
			const feedbackDataResponse = await feedbackResponse.json();
			if (feedbackDataResponse.status === 'success') {
				alert('Thank you for your feedback!');
				setShowFeedbackPopup(false);
			} else {
				console.error('Error:', feedbackDataResponse.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='min-h-screen pt-20 px-4 bg-gradient-to-b from-blue-50 to-rose-50'>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='max-w-md mx-auto'>
				<div className='bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg'>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label className='block text-gray-600'>Name</label>
							<input name='name' onChange={handleChange} className='w-full p-2 border rounded-md' />
						</div>

						<div>
							<label className='block text-gray-600'>Gender</label>
							<select name='gender' onChange={handleChange} className='w-full p-2 border rounded-md'>
								<option value=''>Select Gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
						</div>

						<div>
							<label className='block text-gray-600'>Looking For</label>
							<select name='lookingFor' onChange={handleChange} className='w-full p-2 border rounded-md'>
								<option value=''>Select</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
						</div>

						<div>
							<label className='block text-gray-600'>Campus</label>
							<select
								name='campus_id'
								onChange={handleCampusChange}
								className='w-full p-2 border rounded-md'
							>
								<option value=''>Select Campus</option>
								<option value='1'>RCM</option>
								<option value='2'>KIIT</option>
								<option value='3'>SOA</option>
								<option value='4'>Trident</option>
								<option value='5'>Other</option>
							</select>
							{formData.campus_id === '5' && (
								<input
									name='customCampus'
									placeholder='Specify your campus'
									onChange={handleChange}
									className='w-full p-2 border rounded-md mt-2'
								/>
							)}
						</div>

						<div>
							<label className='block text-gray-600'>Email</label>
							<input
								name='email'
								onChange={handleChange}
								required
								className='w-full p-2 border rounded-md'
							/>
						</div>

						<div>
							<label className='block text-gray-600'>Mobile (Optional)</label>
							<input name='mobile' onChange={handleChange} className='w-full p-2 border rounded-md' />
						</div>

						<div>
							<input
								type='checkbox'
								name='agreePromotion'
								onChange={handleChange}
								checked={formData.agreePromotion}
							/>
							<label className='ml-2 text-gray-600'>Agree to Promotions</label>
						</div>

						<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md'>
							Register
						</button>
					</form>

					{registrationSuccess && (
						<p className='text-green-500 mt-4'>Thank you for registering! Please leave feedback.</p>
					)}
				</div>
			</motion.div>

			{showFeedbackPopup && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md w-full'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>We value your feedback!</h2>
						<form onSubmit={handleFeedbackSubmit} className='space-y-4'>
							<textarea
								name='feedback'
								placeholder='Your feedback'
								value={feedbackData}
								onChange={handleFeedbackChange}
								className='w-full p-2 border rounded-md'
								required
							/>
							<div className='flex justify-end space-x-2'>
								<button
									type='button'
									onClick={() => setShowFeedbackPopup(false)}
									className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
								>
									Cancel
								</button>
								<button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PreRegistrationPage;
