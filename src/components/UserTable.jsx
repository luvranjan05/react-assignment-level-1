import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserTable({ users }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by first or last name (case insensitive)
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Users Table */}
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
          {filteredUsers.map((user) => (
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
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default UserTable;
