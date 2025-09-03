import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading users...</p>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<UserTable users={users} />} />
      <Route path="/users/:id" element={<UserDetail users={users} />} />
      <Route
        path="*"
        element={<h2 style={{ padding: "20px" }}>404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default App;
