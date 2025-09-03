import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserTable({ users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const usersPerPage = 10;

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div>
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search by first or last name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th
              onClick={() => requestSort("first_name")}
              style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd" }}
            >
              First Name {getSortArrow("first_name")}
            </th>
            <th
              onClick={() => requestSort("last_name")}
              style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd" }}
            >
              Last Name {getSortArrow("last_name")}
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd" }}
            >
              Age {getSortArrow("age")}
            </th>
            <th
              onClick={() => requestSort("email")}
              style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd" }}
            >
              Email {getSortArrow("email")}
            </th>
            <th
              onClick={() => requestSort("web")}
              style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd" }}
            >
              Website {getSortArrow("web")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {user.first_name}
                </Link>
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {user.last_name}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {user.age}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {user.email}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <a href={user.web} target="_blank" rel="noopener noreferrer">
                  {user.web}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          &lt;
        </button>

        {[...Array(Math.min(5, totalPages))].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              border: "1px solid #ccc",
              background: currentPage === index + 1 ? "#eee" : "#fff",
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default UserTable;
