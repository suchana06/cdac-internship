// UserInformation.js
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/UserInformation.css"; // Import the CSS file
import axios from "axios";

function UserInformation({ users, fetchData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token is present in local storage
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      // Redirect to the login page if no token is found
      navigate("/login");
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to delete the admin by ID
      await axios.delete(`http://localhost:5000/userRoutes/delete/${id}`);
      alert('deleted');
      // Fetch updated user data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchFields = [
      String(user.id),
      String(user.name),
      String(user.email),
      String(user.phoneNumber),
      String(user.login),
      String(user.logout),
    ];

    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="heading">User Information</h2>

      {/* Search Bar */}
      <div className="search-container centered">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Login</th>
                <th>Logout</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneno}</td>
                  <td>{user.role}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <Link to={`/updateuser/${user.id}`}>
                      <button className="btn btn-edit">Update</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserInformation;
