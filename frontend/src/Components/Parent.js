import React, { useState } from "react";
import Admin_loginForm from "./Admin_loginForm"; // Adjust the path accordingly
import SignUp from "./SignUpPage"; // Import your sign-up page component

const ParentComponent = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
  };

  return (
    <div>
      {!adminLoggedIn ? (
        <Admin_loginForm onAdminLogin={handleAdminLogin} />
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default ParentComponent;
