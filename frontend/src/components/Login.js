import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // REact Toastify
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
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
  const onLogin = async () => {
    const { email, password } = user;
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:9002/login", user);
        if (response.status === 200) {
          toast.success("Login Success");
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      } catch (err) {
        if (err.response) {
          if (
            err.response.status === 400 &&
            err.response.data.msg === "User not found"
          ) {
            toast.error("User not found , please check the email");
          } else if (
            err.response.status === 400 &&
            err.response.data.msg === "PasswordNotMatch"
          ) {
            toast.error("Incorrect Password");
          } else {
            toast.error("Server error");
          }
        } else {
          toast.error("Network error");
        }
      }
    } else {
      toast.error("Please fill the details ");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="form-group">
          {/* -----------Toast Messages --------- */}
          <ToastContainer position="top-center" theme="colored" />
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
