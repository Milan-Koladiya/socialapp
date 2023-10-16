import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../../../css files/HomeCss.css";
import useToken from "../../../hook/useToken";
import { MenuBar } from "../../Navbar";
import Button from "react-bootstrap/Button";

const Follower = () => {
  const { token } = useToken();
  const [allFollower, setAllFollower] = useState([]);

  const handleAllFollower = async (e) => {
    e.preventDefault();

    try {
      const followerResponce = await fetch(
        "http://localhost:4500/getFollower",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const GetFollower = await followerResponce.json();

      console.log("getFollower===>", GetFollower?.followers);
      // console.log("getFollower===>", GetFollower?.followers?.[0]?.status);
      // const getStatus = (GetFollower?.followers.map((status) => status.status)).toString();
      // const followerList = (GetFollower?.followers.map((status)=>status.status)).filter((isAccepted)=> isAccepted !== "accepted")
      // // getStatus.toString();
      // console.log("getStatus", getStatus);

      // if(getStatus === "accepted")
      // {
      //   setAllFollower('')
      // }else{
      //   setAllFollower(followerList)
      // }
      setAllFollower(GetFollower?.followers);
    } catch (error) {
      console.log("error" + error);
    }
  };

  // console.log("allFollower====>", allFollower);

  return (
    <>
      <div className="container">
        <MenuBar />
        {/* <h4 >Follower</h4> */}
        <div>
          <div className="text-center mt-5">
            <Button
              variant="outline-danger"
              className="text-center"
              onClick={handleAllFollower}
            >
              get All Follower
            </Button>
          </div>
          {/* <button onClick={handleAllFollower}>Follower</button> */}
        </div>
        {/* 
      {
        (allFollower || [])?.map((user, id) => {
          return <li key={id}>{user.follower}</li>;
        })
      } */}
        {allFollower === null ? (
          <h3>You have Not Any Followers</h3>
        ) : (
          (allFollower || [])?.map((user, id) => {
            return <li key={id}>{user.follower}</li>;
          })
        )}
      </div>
    </>
  );
};

export default Follower;
