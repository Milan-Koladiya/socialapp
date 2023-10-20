import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../../hook/useToken";
import ListGroup from "react-bootstrap/ListGroup";
import { MenuBar } from "../../Navbar";
import RejectFollowReq from "../rejectFollowReq/RejectFollowReq";
import AcceptFollowButton from "../../UI Component/AcceptFollowButton";
import Clientaxios from "../../../api/axios";

const UpdatedNotifaction = () => {
  const { token } = useToken();
  const axiosInstance = Clientaxios();

  // State to hold follower requests
  const [allFollowerReq, setAllFollowerReq] = useState([]);

  // Function to fetch and display all follower requests

  const handleAllFollowerReq = async (e) => {
    // e.preventDefault();

    try {
      //   const resAllfollowerReq = await fetch(
      //     "http://localhost:4500/getFollower",
      //     {
      //       method: "GET",
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   const GetFollowerReq = await resAllfollowerReq.json();

      const resAllfollowerReq = await axiosInstance.get("/getFollower");
      const GetFollowerReq = await resAllfollowerReq.data;
      console.log("GetFollowReq=======>", GetFollowerReq);

      const getStatus = GetFollowerReq?.followers.filter(
        (getstatus) => getstatus.status != "accepted"
      );

      console.log("getStatus========>",getStatus);

      if (getStatus.length > 0) {
        setAllFollowerReq(getStatus);
      } 

    } catch (error) {
      console.log("allFollowReq error", error);
    }
  };

  console.log("======sfsfsdf===============>", allFollowerReq);

  const handleAcceptFollowReq = async (acceptId) => {
    console.log("acceptID=========>", acceptId._id);
    const AcceptedID = acceptId._id;
    try {
      console.log("receiverId====>", AcceptedID);
      // const AcceptedID = AcceptReqId._id;
      // const AcceptedName = AcceptReqId.userName;
      // console.log("accepteduserNAme====>",AcceptedName);
      // console.log("acceptedID======>",AcceptReqId._id)
      const resAcceptFollowReq = await fetch(
        `http://localhost:4500/acceptFollow/${AcceptedID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const AcceptedReq = await resAcceptFollowReq.json();
      console.log("acceptedReqName====>", AcceptedReq);

      // alert(` you accept follow req of ${AcceptedName}`);

      // if (AcceptedReq.status === "accepted") {
      //   // Update the component state to indicate acceptance.

      //   // setAccepted(true);
      //   setAccepted((prevFollowerReqs)=>{
      //     prevFollowerReqs?.status?.follower.filter((request)=>request !== AcceptReqId)
      //   })
      // }
      updateFollowRequest(AcceptedID);
      alert(`You accept follow request of ${allFollowerReq?.follower?.name}`);
    } catch (error) {
      console.log("AcceptFollowReq error", error);
    }
  };

  const handleRejectFollowReq = async (rejectId) => {
    const rejectID = rejectId._id;
    console.log("rejectID=======>", rejectID);

    try {

        const resRejectFollowReq = await axiosInstance.post(`/rejectFollow/${rejectID}`);
        const RejectReq = await resRejectFollowReq.data;
        console.log("RejectReq======>",RejectReq);

        updateFollowRequest(rejectID);
        alert(`You Reject follow Request of ${allFollowerReq?.follower?.name}`);

    } catch (error) {
        console.log("Reject Follow request error=========>",error);
        
    }
  };

  const updateFollowRequest = (requestId) => {
    console.log("requestId======>", requestId);
    setAllFollowerReq((previouseRequest) => {
      previouseRequest.filter((request) => request.follower._id !== requestId);
    });  
  };
  return (
    <>
      <MenuBar />
      <div className="text-center mt-4">
        <Button onClick={handleAllFollowerReq} className="">
          Show Follow Req
        </Button>
      </div>

      <ListGroup as="ol" numbered>
        {allFollowerReq?.map((user, id) => (
          <ListGroup.Item
            key={id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sender: {user?.follower?.name}</div>
              {/* =======main======== */}
              {/* <RejectFollowReq rejectFollowId={user.follower} /> */}
              {/* <AcceptFollowButton AcceptReqId={user.follower} /> */}
              <Button
                variant="outline-danger"
                className="me-3"
                onClick={() => handleAcceptFollowReq(user.follower)}
              >
                Accept
              </Button>

              <Button
                variant="outline-danger"
                className="me-3"
                onClick={() => handleRejectFollowReq(user.follower)}
              >
                Reject
              </Button>
              {/* <Button onClick={()=>{handleAcceptFollowReq(user.follower); handleAllFollowerReq();}}>Accept</Button> */}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default UpdatedNotifaction;
