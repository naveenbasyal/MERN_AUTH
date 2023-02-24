import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSignup = async () => {
    const { name, email, phone, profession, password } = user;
    if (name && email && password && phone && profession) {
      try {
        const response = await axios.post("http://localhost:9002/signup", user);
        if (response.status === 200) {
          toast.success("Registered Succesfully");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (err) {
        if (err.response) {
          if (
            err.response.status === 400 &&
            err.response.data.msg === "AlreadyExist"
          ) {
            toast.error("Email Already exist, use different Email");
          } else {
            toast.error("Server error");
          }
        } else {
          toast.error("Network error");
        }
      }
    } else {  
      toast.error("Please fill the Details");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Signup</h1>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="form-group">
          <ToastContainer position="top-center" theme="colored" />
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={user.name}
            placeholder="Your Name"
            className="form-control my-3"
            required
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={user.email}
            placeholder="Your Email"
            className="form-control my-3"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            value={user.phone}
            placeholder="Mobile Number"
            className="form-control my-3"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            name="profession"
            value={user.profession}
            placeholder="Your Profession"
            className="form-control my-3"
            required
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
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
