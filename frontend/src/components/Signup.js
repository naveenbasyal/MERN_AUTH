import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSignup = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      axios
        .post("http://localhost:9002/signup", user)
        .then((res) => console.log(res));
    } else {
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Signup</h1>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={user.name}
            placeholder="Enter you Name"
            className="form-control my-3"
            required
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter you email"
            className="form-control my-3"
            required
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter your password"
            className="form-control my-3"
            required
          />
          <div className="btn btn-primary" onClick={onSignup}>
            SignUp
          </div>
        </div>
        <div className="form-group">
          <div className="text-center">
            <h5 className="text-center">Or</h5>
            <Link className="btn btn-secondary" to="/">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
