import React, { useEffect, useState } from 'react';

// Pagination constants
const ROWS_PER_PAGE = 10;

function App() {
  const [employees, setEmployees] = useState([]); // Store employee data
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [error, setError] = useState(null); // Track API errors

  // Fetch employee data on initial render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError('Failed to fetch data');
        window.alert('Failed to fetch data'); // Alert for error handling
      }
    };

    fetchEmployees();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / ROWS_PER_PAGE);

  // Calculate the data to display for the current page
  const currentData = employees.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee List</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
