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
    <div style={{ padding: "20px" }}>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>City:</strong> {user.city}
      </p>
      <p>
        <strong>State:</strong> {user.state}
      </p>
      <p>
        <strong>Company:</strong> {user.company_name}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={user.web} target="_blank" rel="noopener noreferrer">
          {user.web}
        </a>
      </p>

      <Link to="/users" style={{ display: "inline-block", marginTop: "10px" }}>
        ← Back to Users
      </Link>
    </div>
  );
}

export default UserDetail;
