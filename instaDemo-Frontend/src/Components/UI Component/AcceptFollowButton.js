// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import useToken from '../../hook/useToken';

// const AcceptFollowButton = async({AcceptReqId}) => {
// const {token} = useToken();
// const [acceptReq , setAcceptReq] = useState([]);

//     try {
//         console.log("receiverId====>", AcceptReqId);
     
//         const resAcceptFollowReq = await fetch(
//           `http://localhost:4500/acceptFollow/${AcceptReqId}`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const AcceptedReq = await resAcceptFollowReq.json();
//         //   -----if below status find then it work-------
//         console.log("acceptedReqStatus====>", AcceptedReq);
//         if ({ status: "accepted" }) {
//             setAcceptReq(
//                 acceptReq.filter((request) => request.AcceptReqId !== AcceptReqId)
//           );
//         }
//       } catch (error) {
//         console.log("AcceptFollowReq error", error);
//       }
//   return (
//   <>
//   <Button onClick={()=>AcceptFollowButton(AcceptReqId)}></Button>
//   </>
//   )
// }

// export default AcceptFollowButton

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useToken from '../../hook/useToken';

const AcceptFollowButton = ({ AcceptReqId }) => {
  const { token } = useToken();
  const [accepted, setAccepted] = useState({});



  const handleAcceptFollowReq = async () => {
    try {
      console.log("receiverId====>", AcceptReqId);
      const AcceptedID = AcceptReqId._id;
      const AcceptedName = AcceptReqId.userName;
      console.log("accepteduserNAme====>",AcceptedName);
      console.log("acceptedID======>",AcceptReqId._id)
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
      
      alert(` you accept follow req of ${AcceptedName}`);
      // if (AcceptedReq.status === "accepted") {
      //   // Update the component state to indicate acceptance.

      //   // setAccepted(true);
      //   setAccepted((prevFollowerReqs)=>{
      //     prevFollowerReqs?.status?.follower.filter((request)=>request !== AcceptReqId)
      //   })
      // }
    } catch (error) {
      console.log("AcceptFollowReq error", error);
    }
  };
  
  return (
    <>
      <Button  variant="outline-success" onClick={handleAcceptFollowReq}>Accept</Button>
      {/* {accepted && <span>Request Accepted!</span> } */}
    </>
  );
};

export default AcceptFollowButton;
