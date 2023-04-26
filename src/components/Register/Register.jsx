import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  // const [email, setEamil] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    // setEamil(event.target.value);
  };
  const handlePasswordChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    // 1. prevent page reload
    event.preventDefault();

    // 2. collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    // console.log(name, email, password);

    setSuccess("");
    setError("");
    // validate password
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one upper case");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError("Plase add at least one lower case");
      return;
    } else if (password.length < 6) {
      setError("Password should be at least 6 character");
    }
    //3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        event.target.reset(); //
        setSuccess("User has been created successfully");
        emailVerification(result.user);
        updateUserData(result.user, name);
      })
      .catch((error) => {
        // console.error(error);
        setError(error.message);
      });
  };

  const emailVerification = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("Please verify your email address");
    });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("User name updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <h3>Pleasse Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
          className="mb-3"
        />
        <br />
        <input
          onChange={handleEmailChange}
          type="email"
          name="email" // add name attribute
          id="email"
          placeholder="Your Email"
          required
        />

        <br />
        <input
          onBlur={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          required
          className="mt-3 mb-3"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <p>
        <small>
          If you have account, please <Link to="/login">Login</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
