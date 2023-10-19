// import React, { useEffect, useState } from "react";
// import Clientaxios from "../api/axios";
// import Clientaxios from '../api/axios';
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const SigIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   //   const [Error , setError] = useState(false);

//   // console.log("client====>", Clientaxios);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const RegisterResponce = await fetch("http://localhost:4500/registration", {
//         method: "POST",
//         headers: { "content-Type": "application/json" },
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password,
//         }),
//       });
//         console.log("first==>")
//       // const RegisterResponce = await Clientaxios.post("/sigIn", {
//       //   name: name,
//       //   email: email,
//       //   password: password,
//       // });
//       console.log("first================>")

//       const data = await RegisterResponce.json();
//       console.log("new Registration=====>", data);
//       // console.log("registration===>"+ JSON.stringify(data.error));
//     } catch (error) {
//       console.log("registration err" + error);
//     }
//   };

//   return (
//     <>
//       <h3>SigIn Page</h3>

//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         ></input>
//         <br></br>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         ></input>
//         <br></br>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         ></input>
//         <button type="submit">Submit </button>
//       </form>
//     </>
//   );
// };

// export default SigIn;


import React, { useEffect, useState } from "react";
// import Clientaxios from "../api/axios";
import Clientaxios from '../api/axios';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axiosInstance = Clientaxios(); // Call the function to get the Axios instance

    try {
      const response = await axiosInstance.post('/registration', {
        name: name,
        email: email,
        password: password,
      });

      const data = response.data;
      console.log('New Registration: ', data);
    } catch (error) {
      console.log('Registration Error: ' + error);
    }
  };

  return (
    <>
      <h3>SignIn Page</h3>

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
        <button type="submit">Submit</button>
      </form>
    <h3 className="mt-4">Already have an Account...? </h3><Button variant=""><Link to="/login">login Here</Link></Button>

    </>
  );
};

export default SignIn;
