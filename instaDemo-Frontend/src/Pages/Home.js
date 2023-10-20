import React, { useEffect, useState } from "react";
import Login from "./Login";
import useToken from "../hook/useToken";
import Card from "react-bootstrap/Card";
import "../css files/HomeCss.css";

import CardGroup from "react-bootstrap/CardGroup";
import Logout from "../Components/Logout";
import Follower from "../Components/Follower-following/getAllFollower/getAllFollower";
import { Link } from "react-router-dom";
import { MenuBar, Navbar } from "../Components/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import AllPost from "../Components/Post/AllPost";
import Clientaxios from "../api/axios";
import axios from "axios";

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   // const tokenString = localStorage.getItem('token');
//   // const userToken = JSON.parse(tokenString);
//   // return userToken?.token
// }

export const Home = () => {
  const { token } = useToken();
  // const {token,setToken} = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  const axiosInstance = Clientaxios();
  const [data, setData] = useState([]);
  const handleUserInfo = async () => {
    try {
      // const UserDataResponce = await fetch("http://localhost:4500/login/data", {
      //     method: "GET",
      //     headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });
      //     const UserInfo = await UserDataResponce.json();

      const UserDataResponce = await axiosInstance.get("/login/data");

      const UserInfo = await UserDataResponce.data;

      console.log("USer Infor========>", UserInfo);

      setData(UserInfo);
    } catch (error) {
      console.log("user All data=======>", error);
    }
  };

  useEffect(() => {
    handleUserInfo();
  }, []);
  return (
    <>
      <div className="container me-4">
        
        <MenuBar />

        <div>
          {/* <Button onClick={handleUserInfo}> Get user Info</Button> */}

          <div className="text-center mt-4 ms-5">
            <Card
              style={{ width: "28rem" }}
              className="card col-6 offset-3"
              key={data._id}
            >
              {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
              <Card.Body>
                <Card.Title>
                  <h1 className="text-primary">Profile</h1>
                </Card.Title>
                <Card.Text>
                  <h3 className="text-secondary">Welcome {data.name}</h3>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <h5>Username : {data.userName}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Email : {data.email}</h5>
                </ListGroup.Item>
                {/* <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
              </ListGroup>
              <Card.Body>
                {/* <Button variant="outline-secondary">
                  <Link to="/sendFollowReq">Get new Following</Link>
                </Button> */}
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
          <div className="text-center mt-4 me-5">
            <AllPost />
          </div>
        </div>
      </div>
    </>
  );
};
