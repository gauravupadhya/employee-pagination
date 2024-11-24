import React, { useState, useEffect } from 'react';
import './App.css';

const PaginationApp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error('Fetch failed');
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('failed to fetch data');
        alert('failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default PaginationApp;
