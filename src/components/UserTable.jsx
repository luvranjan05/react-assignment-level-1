import React from "react";
import { Link } from "react-router-dom";

function UserTable({ users }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.id}</td>

              {/* First name links to detail page */}
              <td style={{ ...tdStyle, color: "black" }}>
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {user.first_name}
                </Link>
              </td>

              <td style={tdStyle}>{user.last_name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.age}</td>
              <td style={tdStyle}>{user.city}</td>
              <td style={tdStyle}>{user.company_name}</td>

              {/* Website opens in new tab */}
              <td style={tdStyle}>
                <a href={user.web} target="_blank" rel="noopener noreferrer">
                  {user.web}
                </a>
              </td>
            </tr>
          ))}
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
