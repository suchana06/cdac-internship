import axios from "axios";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
   
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" >Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
