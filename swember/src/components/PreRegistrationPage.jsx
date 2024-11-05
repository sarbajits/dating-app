import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreRegistrationPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		gender: '',
		lookingFor: '',
		campus: '',
		customCampus: '',
		email: '',
		mobile: '',
		agreePromotion: true,
	});
	const navigate = useNavigate();
	const [campuses, setCampuses] = useState([]);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [feedback, setFeedback] = useState('');
	const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
	const [error, setError] = useState('');
	const [showErrorPopup, setShowErrorPopup] = useState(false);

	// Fetch campuses from the database
	useEffect(() => {
		const fetchCampuses = async () => {
			try {
				const response = await fetch('https://swember.in/get_campuses.php');
				const data = await response.json();
				setCampuses(data);
			} catch (error) {
				console.error("Couldn't fetch campuses:", error);
			}
		};
		fetchCampuses();
	}, []);

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	// Handle campus selection and custom campus input
	const handleCampusChange = (e) => {
		const value = e.target.value;
		setFormData({ ...formData, campus: value, customCampus: value === 'custom' ? '' : null });
	};

	// Submit the registration form
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Validate form data
		if (!formData.name || !formData.gender || !formData.email) {
			setError('Please fill in all required fields (Name, Gender, Email).');
			setShowErrorPopup(true);
			return;
		}

		// Determine which campus value to send
		const campusToSubmit = formData.campus === 'custom' ? formData.customCampus : formData.campus;
	
		try {
			const response = await fetch('https://swember.in/register.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					...formData,
					campus: campusToSubmit, // Send the correct campus value
				}).toString(),
			});
			const data = await response.json();
			if (data.status === 'success') {
				setRegistrationSuccess(true);
				setShowFeedbackPopup(true);
			} else {
				setError(data.message || 'Registration failed. Please try again.');
				setShowErrorPopup(true);
			}
		} catch (error) {
			setError('An error occurred. Please try again later.',error);
			setShowErrorPopup(true);
		}
	};
	
	// Handle feedback input changes
	const handleFeedbackChange = (e) => {
		setFeedback(e.target.value);
	};

	// Submit the feedback form
	const handleFeedbackSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('https://swember.in/submit_feedback.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					name: formData.name,
					email: formData.email,
					feedback: feedback,
				}).toString(),
			});
			const data = await response.json();
			if (data.status === 'success') {
				navigate('/thank-you');
			} else {
				setError(data.message || 'Feedback submission failed. Please try again.');
				setShowErrorPopup(true);
			}
		} catch (error) {
			setError('An error occurred. Please try again later.',error);
			setShowErrorPopup(true);
		}
	};

	// Close the error popup
	const closeErrorPopup = () => {
		setShowErrorPopup(false);
		setError('');
	};

	// Close feedback popup and navigate to thank you page
	const closeFeedbackPopup = () => {
		setShowFeedbackPopup(false);
		navigate('/thank-you');
	};

	return (
		<div className='min-h-screen pt-20 px-4 bg-gradient-to-b from-blue-50 to-rose-50'>
			<div className='max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-gray-600'>Name</label>
						<input name='name' onChange={handleChange} className='w-full p-2 border rounded-md' required />
					</div>

					<div>
						<label className='block text-gray-600'>Gender</label>
						<select name='gender' onChange={handleChange} className='w-full p-2 border rounded-md' required>
							<option value=''>Select Gender</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>

					<div>
						<label className='block text-gray-600'>Looking For</label>
						<select name='lookingFor' onChange={handleChange} className='w-full p-2 border rounded-md' required>
							<option value=''>Select</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>

					<div>
						<label className='block text-gray-600'>Campus</label>
						<select name='campus' onChange={handleCampusChange} className='w-full p-2 border rounded-md'>
							<option value=''>Select Campus</option>
							{campuses.map((campus) => (
								<option key={campus.campus_id} value={campus.campus_id}>
									{campus.campus_name}
								</option>
							))}
							<option value='custom'>Other</option>
						</select>

						{formData.campus === 'custom' && (
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
						<input name='email' onChange={handleChange} required className='w-full p-2 border rounded-md' />
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
						<label className='ml-2 text-gray-600'>Agree to receive update in WhatsApp</label>
					</div>

					<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md'>
						Register
					</button>
				</form>

				{registrationSuccess && (
					<p className='text-green-500 mt-4'>Thank you for registering! Please leave feedback.</p>
				)}
			</div>

			{showFeedbackPopup && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md w-full'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>We value your feedback!</h2>
						<form onSubmit={handleFeedbackSubmit} className='space-y-4'>
							<textarea
								name='feedback'
								placeholder='Your feedback'
								value={feedback}
								onChange={handleFeedbackChange}
								className='w-full p-2 border rounded-md'
							/>
							<div className='flex justify-end space-x-2'>
								<button
									type='button'
									onClick={closeFeedbackPopup} // Navigate to thank-you page on cancel
									className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
								>
									Skip
								</button>
								<button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Error Popup */}
			{showErrorPopup && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-80 m-2'>
						<h2 className='text-lg font-semibold text-red-500 mb-4'>Error!</h2>
						<p className='text-gray-700 mb-4'>{error}</p>
						<button
							onClick={closeErrorPopup}
							className='px-4 py-2 bg-blue-500 text-white rounded-md'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PreRegistrationPage;
