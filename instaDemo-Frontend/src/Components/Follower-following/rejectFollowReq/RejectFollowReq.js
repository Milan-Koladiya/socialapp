import React, { useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../../hook/useToken";

// const RejectFollowReq = () => {
const RejectFollowReq = ({ rejectFollowId }) => {
  const { token } = useToken();
  const [rejectReq, setRejectReq] = useState({});
   
  console.log("rejectFollowId===>",rejectFollowId);

  const handleRejectFollowReq = async () => {
     const RejectFollowID = rejectFollowId._id;
     console.log("RejectFollowID=======>",RejectFollowID);
  const rejectUserName = rejectFollowId.userName;
  console.log("rejectUserName======>",rejectUserName);
    try {
      const rejectFollowReq = await fetch(
        `http://localhost:4500/rejectFollow/${RejectFollowID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const RejectReq = await rejectFollowReq.json();
      console.log("rejectRequestStatus====>", RejectReq);
      alert(`you reject follow request of ${rejectUserName}`);
      // if ({ status: "pending" }) {
      //     setRejectReq(
      //         rejectReq.filter(
      //       (request) => request.rejectFollowId !== rejectFollowId
      //     )
      //   );
      // }
      // setRejectReq((prevRequest)=>{
      //   prevRequest.filter((request)=>request.follower !== RejectFollowID);
      // })
    } catch (error) {
      console.log("reject Follow Req Error:", error);
    }
  };

  
  return (
    <>
      {/* <Button
        onClick={() => {
          handleRejectFollowReq(rejectFollowId);
        }}
      ></Button> */}
      <Button
        variant="outline-danger"
        className="me-3"
        onClick={handleRejectFollowReq}
      >
        Reject
      </Button>
    </>
  );
};

// }

export default RejectFollowReq;
