import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useToken from "../hook/useToken";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Clientaxios from "../api/axios";

// const Login = ({setToken}) => {
const Login = () => {
  const { token, setToken } = useToken();

  const navigate = useNavigate();

  // console.log("setToken====>" + setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    // navigate('/dtfrhgdr');

    e.preventDefault();
    const axiosInstance = Clientaxios();
    try {

      // const LoginResponce = await fetch("http://localhost:4500/login", {
      //   method: "POST",
      //   headers: { "content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: email,
      //     password: password,
      //   }),
      // });
      // const Token = await LoginResponce.json();

      const LoginResponce = await axiosInstance.post("/login",{
        email: email,
        password: password,
      });
     
      const Token = await LoginResponce.data;
      

      // -------as we get props setToken is function as below in useToken Custom hook--------
      // const setToken = (userToken) => {
      //   sessionStorage.setItem("token", JSON.stringify(userToken));
      //   // console.log("userToken:"+userToken.token);
      //   setToken(userToken.token);
      // };
      // --------whaere Token value pass as userToken------------
      setToken(Token);
      console.log("token======>", Token);

      // console.log("token===>" + JSON.stringify(Token.token));
    } catch (error) {
      console.log("logIN error" + error);
    }
  };
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("login", true);
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      {/* <h3>Login page</h3>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br></br>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form> */}

      <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h3 className="mt-4">Not Register...? </h3>
      <Button variant="">
        <Link to="/sigIn">Register Here</Link>
      </Button>
    </>
  );
};

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
