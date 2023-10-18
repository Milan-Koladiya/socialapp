import React, { useEffect, useState } from "react";
import Clientaxios from "../api/axios";

const SigIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [Error , setError] = useState(false);

  // console.log("client====>", Clientaxios);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const RegisterResponce = await fetch("http://localhost:4500/registration", {
      //   method: "POST",
      //   headers: { "content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: name,
      //     email: email,
      //     password: password,
      //   }),
      // });
        console.log("first==>")
      const RegisterResponce = await Clientaxios.post("/sigIn", {
        name: name,
        email: email,
        password: password,
      });
      console.log("first================>")

      const data = await RegisterResponce.json();
      console.log("new Registration=====>", data);
      // console.log("registration===>"+ JSON.stringify(data.error));
    } catch (error) {
      console.log("registration err" + error);
    }
  };

  return (
    <>
      <h3>SigIn Page</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br></br>
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
        <button type="submit">Submit </button>
      </form>
    </>
  );
};

export default SigIn;
