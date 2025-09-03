import React from "react";
import { useParams, Link } from "react-router-dom";

function UserDetail({ users }) {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>User Not Found</h2>
        <Link to="/users">Back to User List</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Details: {user.first_name} {user.last_name}
      </h2>

      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Company_name:</strong> {user.company_name}
      </p>
      <p>
        <strong>City:</strong> {user.city}
      </p>
      <p>
        <strong>State:</strong> {user.state}
      </p>
      <p>
        <strong>Zip:</strong> {user.zip}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Web:</strong>{" "}
        <a href={user.web} target="_blank" rel="noopener noreferrer">
          {user.web}
        </a>
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>

      <Link
        to="/users"
        style={{
          display: "inline-block",
          marginTop: "15px",
          textDecoration: "none",
          color: "#007bff",
        }}
      >
        ← Back to Users
      </Link>
    </div>
  );
}

export default UserDetail;
