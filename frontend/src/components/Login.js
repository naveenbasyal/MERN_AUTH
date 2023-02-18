import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
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
  const onLogin=()=>{
    axios.post("http://localhost:9002/login",user)
    .then(res=>console.log(res))
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="form-group">
          <input
            onChange={handleChange}
            type="email"
            value={user.email}
            name="email"
            placeholder="Enter you email"
            className="form-control my-3"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            value={user.password}
            name="password"
            placeholder="Enter your password"
            className="form-control my-3"
            required
          />
          <input
            type="button"
            value="Submit"
            className="btn btn-primary my-2"
            onClick={onLogin}
          />
        </div>

        <div className="form-group">
          <div className="text-center">
            <h5 className="text-center">Or</h5>
            <Link className="btn btn-secondary" to="/signup">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
