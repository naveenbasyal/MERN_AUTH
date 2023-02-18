import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //-------On Submit-------
  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      await axios.post("http://localhost:3000/",{
        email,password
      })
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>
      <div className="row d-flex align-items-center justify-content-center">
        <form action="POST" className="my-5 col-6">
          <div className="form-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter you email"
              className="form-control my-3"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control my-3"
              required
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary my-2"
              onClick={onSubmit}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
