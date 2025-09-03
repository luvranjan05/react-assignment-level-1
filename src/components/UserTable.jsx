import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserTable({ users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
 
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term)
    );
  });


  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Website</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td style={{ ...tdStyle, color: "black" }}>
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {user.first_name}
                </Link>
              </td>
              <td style={tdStyle}>{user.last_name}</td>
              <td style={tdStyle}>{user.age}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <a href={user.web} target="_blank" rel="noopener noreferrer">
                  {user.web}
                </a>
              </td>
            </tr>
          ))}

          {currentUsers.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

<div style={{ marginTop: "20px", textAlign: "center" }}>
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    style={pageButtonStyle}
  >           
    &lt;
  </button>

  {[...Array(Math.min(5, totalPages))].map((_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange(index + 1)}
      style={{
        ...pageButtonStyle,
        fontWeight: currentPage === index + 1 ? "bold" : "normal",
        background: currentPage === index + 1 ? "#e0e0e0" : "white",
      }}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={pageButtonStyle}
  >
    &gt;
  </button>
</div>

    </div>
  );
}


const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const pageButtonStyle = {
  margin: "0 5px",
  padding: "5px 10px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  cursor: "pointer",
};

export default UserTable;
