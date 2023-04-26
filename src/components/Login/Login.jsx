import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    // 1. prevent page reload
    event.preventDefault();
    // 2. collect form data
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    setSuccess("");
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        event.target.reset();
        setSuccess("Log in Successfully");
        setError(""); // remove prvious error
      })
      .catch((error) => {
        // setError(error.message);
        setError("Invalid email or password");
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        setError("hocce na kn");
      });
  };

  return (
    <div>
      <h3>Please Login ......</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="mb-0">
        Forget password?{" "}
        <button className="btn btn-link" onClick={handleResetPassword}>
          Reset Password
        </button>
      </p>
      <p>
        <small>
          If you don't have any account, please{" "}
          <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-success">{success}</p>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Login;
