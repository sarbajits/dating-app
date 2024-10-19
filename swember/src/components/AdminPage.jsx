import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Search, filter, and sort states for users
  const [userSearch, setUserSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [userSort, setUserSort] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Search, sort states for feedback
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [feedbackSort, setFeedbackSort] = useState('date');

  useEffect(() => {
    fetchUsers();
    fetchFeedbacks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://swember.in/get_users.php');
      if (response.data.status === 'success') {
        setUsers(response.data.data);
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://swember.in/get_feedback.php');
      if (response.data.status === 'success') {
        setFeedbacks(response.data.data);
      } else {
        console.error('Failed to fetch feedbacks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Filtering users
  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) &&
      (genderFilter === 'all' || user.gender === genderFilter)
    )
    .sort((a, b) => {
      if (userSort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (userSort === 'age') {
        return a.age - b.age;
      }
      return 0; // Default sort (by name)
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Filtering feedbacks
  const filteredFeedbacks = feedbacks
    .filter(feedback =>
      feedback.user_name.toLowerCase().includes(feedbackSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (feedbackSort === 'date') {
        return new Date(b.submission_date) - new Date(a.submission_date);
      }
      return a.user_name.localeCompare(b.user_name); // Default sort (by name)
    });

  // Print function
  const handlePrint = (section) => {
    const printContent = section === 'users' ? document.getElementById('user-table') : document.getElementById('feedback-list');
    const width = 800;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    const printWindow = window.open('', '_blank', `width=${width},height=${height},top=${top},left=${left}`);
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print ${section}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>${section.charAt(0).toUpperCase() + section.slice(1)} Data</h1>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        
        {/* Search, Filter, Sort Options */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          />
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border border-gray-300 p-2 rounded w-full sm:w-1/3">
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select value={userSort} onChange={(e) => setUserSort(e.target.value)} className="border border-gray-300 p-2 rounded w-full sm:w-1/3">
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
          </select>
        </div>

        {/* Items per Page Selection */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm">Show:</label>
          <select value={itemsPerPage} onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1); // Reset to the first page on changing items per page
          }} className="border border-gray-300 p-2 rounded">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
            <option value={filteredUsers.length}>All</option>
          </select>
        </div>

        {/* Users Table with Horizontal Scroll */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table id="user-table" className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Print Button */}
        <div className="mt-4">
          <button 
            onClick={() => handlePrint('users')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Print Users
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        
        {/* Search and Sort Options */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search feedback..."
            value={feedbackSearch}
            onChange={(e) => setFeedbackSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          />
          <select value={feedbackSort} onChange={(e) => setFeedbackSort(e.target.value)} className="border border-gray-300 p-2 rounded w-full sm:w-1/3">
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Feedback List with Horizontal Scroll */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto" id="feedback-list">
          <ul className="divide-y divide-gray-200">
            {filteredFeedbacks.map((feedback) => (
              <li key={feedback.id} className="p-6">
                <p className="font-semibold">{feedback.user_name}</p>
                <p className="mt-1 text-gray-600">{feedback.comment}</p>
                <p className="mt-2 text-sm text-gray-500">{new Date(feedback.submission_date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Print Button for Feedback */}
        <div className="mt-4">
          <button 
            onClick={() => handlePrint('feedback')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Print Feedback
          </button>
        </div>
      </section>
    </div>
  );
}
