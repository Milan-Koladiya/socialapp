
import React from "react";
import FollowButton from "../../UI Component/FollowButton";
import useToken from "../../../hook/useToken";
import { Button } from "react-bootstrap";
import { MenuBar } from "../../Navbar";

const FollowUserProfile = () => {
  const { token } = useToken();
  const handleFollowClick = async (e) => {

    e.preventDefault();
    const user = {
      id: "651e5fd8c81ff322a5f8ecd0",
    };
    console.log("targetedUserId=====>", user.id);
    try {
      const sendFollowingResponce = await fetch(
        `http://localhost:4500/following/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sendFollowing = await sendFollowingResponce.json();
      console.log("sendFollowing====>", sendFollowing);
    } catch (error) {
      console.log("sendFollowing req==>", error);
    }
  };

    

  return (
    <>
    <MenuBar />
    <div className="text-center mt-4">

     <h3>Targetd User Profile</h3>
      <Button onClick={handleFollowClick}>Follow</Button>
      {/* <FollowButton userId={user} onFollowClick={handleFollowClick} /> */}
    </div>
    </>
  );
};

export default FollowUserProfile;



// import { Button } from "react-bootstrap";
// import useToken from "../hook/useToken"
// const FollowUserProfile=()=>{

//     const {token} = useToken();
//      const handleFollowClick = async(e)=>{
//        e.preventDefault();
//        const getAllUserresponce = await fetch(`http://localhost:4500/following`,{

//        })
//      }
//     return(
//         <>
//         <h3>Targetd user Profile</h3>
//         <Button onClick={handleFollowClick}></Button>
//         </>
//     )
// }