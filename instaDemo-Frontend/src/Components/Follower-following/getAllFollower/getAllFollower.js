import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../../../css files/HomeCss.css";
import useToken from "../../../hook/useToken";
import { MenuBar } from "../../Navbar";
import Button from "react-bootstrap/Button";
import Clientaxios from "../../../api/axios";



const Follower = () => {
  const { token } = useToken();
  const [allFollower, setAllFollower] = useState([]);

  const axiosInstance = Clientaxios();

  const getAllFollower = async (e) => {
    // e.preventDefault();
  
    try {

      // const followerResponce = await fetch(
      //   "http://localhost:4500/getFollower",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const GetFollower = await followerResponce.json();

      const followerResponce = await axiosInstance.get('/getFollower');
      const GetFollower =  followerResponce.data;
      // const followerResponce = axiosInstance.get('/getFollower')
console.log("getFollower=================>",GetFollower);   
      console.log("getFollower===>", GetFollower?.followers);
  



      // let confirmFollower = GetFollower?.followers.filter((follow)=>follow.status == "accepted");

      // console.log("confirmFollower=========>",confirmFollower);
        
      // ==========this is for remove error=========
      // const Follower = GetFollower?.followers.map((user)=>user.follower);
      // console.log("Follower=======>",Follower);
      // if(Follower == undefined)
      // {
      //   alert('YOu have not any Follower');
      //   setAllFollower();
      // }


      const confirmFollower = GetFollower?.followers.filter((getStatus)=>getStatus.status != "pending" );

      console.log("confirm Follower=======>",confirmFollower);

      if(confirmFollower.length > 0)
      {
        setAllFollower(confirmFollower);
        
      }else{
        alert("you have not any follower");
      }
      
      
    
      // setAllFollower(GetFollower?.followers);
    } catch (error) {
      console.log("error" + error);
    }

  };
  useEffect(()=>{
     getAllFollower();
  },[])

  // console.log("allFollower====>", allFollower);

  return (
    <>
      <div className="container">
        <MenuBar />
        {/* <h4 >Follower</h4> */}
        <div>
          <div className="text-center mt-5">
            {/* <Button
              variant="outline-danger"
              className="text-center"
              onClick={handleAllFollower}
            >
              get All Follower
            </Button> */}
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
            return <li key={id}>{user.follower.name}</li>; 
          })
        )}
      </div>
    </>
  );
};

export default Follower;
