import React, { useState } from "react";

const Register = () => {
  const [email, setEamil] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEamil(event.target.value);
  };
  const handlePasswordChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };
  return (
    <div>
      <h3>Pleasse Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
        />
        <br />
        <input
          onBlur={handlePasswordChange}
          type="password"
          name="pass"
          id="pass"
          placeholder="Your Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
