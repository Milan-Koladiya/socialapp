import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useToken from "../../../hook/useToken";
import ListGroup from "react-bootstrap/ListGroup";
import { MenuBar } from "../../Navbar";
import RejectFollowReq from "../rejectFollowReq/RejectFollowReq";
import AcceptFollowButton from "../../UI Component/AcceptFollowButton";
import Clientaxios from "../../../api/axios";

// const Notifaction = () => {
//   const { token } = useToken();

//   //   =======display all Follower Request=======
//   const [allFollowerReq, setAllFollowerReq] = useState([]);

//   const handleAllFollowerReq = async (e) => {
//     e.preventDefault();

//     try {
//       const resAllfollowerReq = await fetch(
//         "http://localhost:4500/getFollower",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const GetFollowerReq = await resAllfollowerReq.json();
//       console.log("GetFollowerRew====>", GetFollowerReq.followers);
//       let prevFollowerReqs = GetFollowerReq?.followers?.map((followStatus)=>followStatus)
//       // console.log("GetFollowerRew====>", GetFollowerReq?.followers);
//       // let prevFollowerReqs = GetFollowerReq?.followers.filter((followStatus)=>followStatus.status == "pending")
//       console.log("prevFollow req-===========>",prevFollowerReqs);
//       setAllFollowerReq(GetFollowerReq?.followers);
//       // setAllFollowerReq(prevFollowerReqs);
//     } catch (error) {
//       console.log("allFollowReq error", error);
//     }
//   };

//   //   =========accept follow req=====================
// //   const handleAcceptFollowReq = async (followerId) => {
// //     //   e.preventDefault();
// //     try {
// //       console.log("receiverId====>", followerId);
// //       const resAcceptFollowReq = await fetch(
// //         `http://localhost:4500/acceptFollow/${followerId}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       const AcceptedReq = await resAcceptFollowReq.json();
// //       //   -----if below status find then it work-------
// //       console.log("acceptedReqStatus====>", AcceptedReq);
// // // setAllFollowerReq(AcceptedReq)
// //       // if ({ status: "accepted" }) {
// //       //   setAllFollowerReq(
// //       //     allFollowerReq.filter((request) => request.followerId !== followerId)
// //       //   );
// //       // }
// //     } catch (error) {
// //       console.log("AcceptFollowReq error", error);
// //     }
// //   };

//   // =========reject follow request=============
//   // const handleRejectFollowReq = async (followerId) => {
//   //   try {
//   //     const rejectFollowReq = await fetch(
//   //       `http://localhost:4500/rejectFollow/${followerId}`,
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     const RejectReq = await rejectFollowReq.json();
//   //     console.log("rejectRequestStatus====>",RejectReq);
//   //     if({status:"pending"}){
//   //       setAllFollowerReq(
//   //           allFollowerReq.filter((request)=>request.followerId !== followerId)
//   //       )
//   //     }
//   //   } catch (error) {
//   //     console.log("reject Follow Req Error:", error);
//   //   }
//   // };
//   return (
//     <>
//       <MenuBar></MenuBar>
//       <div className="text-center mt-4">
//         <Button onClick={handleAllFollowerReq} className="">
//           Show Follow Req
//         </Button>

//       </div>
//       {/* {allFollowerReq?.map((followerReq,id) => {
//         return <li key={id}>{followerReq.followers}</li>;
//       })} */}

//       <ListGroup as="ol" numbered>
//         {(allFollowerReq || [])?.map((user, id) => {
//         //   console.log("follower====>", user.follower);
//           return (
//             <>
//               <h3> Want to Follow you</h3>
//               <ListGroup.Item
//                 as="li"
//                 className="d-flex justify-content-between align-items-start"
//               >
//                 <div className="ms-2 me-auto">
//                   <div className="fw-bold">{user._id}</div>
//                   {/* <Button
//                     variant="outline-danger"
//                     className="me-3"
//                     onClick={() => handleRejectFollowReq(user.follower)}
//                   >
//                     Reject
//                   </Button> */}
//                   <RejectFollowReq rejectFollowId={user.follower}></RejectFollowReq>
//                   <AcceptFollowButton AcceptReqId={user.follower}></AcceptFollowButton>

//                   {/* <Button
//                     variant="outline-success"
//                     onClick={() => handleAcceptFollowReq(user.follower)}
//                   >
//                     Accept
//                   </Button> */}

//                 </div>
//               </ListGroup.Item>
//             </>
//           );
//         })}
//       </ListGroup>
//     </>
//   );
// };

// export default Notifaction;


const Notifaction = () => {
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

    const resAllfollowerReq = await axiosInstance.get('/getFollower');
    const GetFollowerReq = await resAllfollowerReq.data;
      console.log("GetFollowReq=======>", GetFollowerReq);

      //   const prevFollowerReqs = GetFollowerReq?.followers || [];
      //  const getdata =  prevFollowerReqs.map((sender)=>sender.follower)
      //   console.log("preveFolloweReq=====>",getdata);

      setAllFollowerReq(GetFollowerReq?.followers);
    } catch (error) {
      console.log("allFollowReq error", error);
    }
  };

  console.log("======sfsfsdf===============>", allFollowerReq);

  
  // const handleAcceptFollowReq = async (acceptId) => {
  //   console.log("acceptID=========>",acceptId._id);
  //   const AcceptedID = acceptId._id
  //   try {
  //     console.log("receiverId====>", AcceptedID);
  //     // const AcceptedID = AcceptReqId._id;
  //     // const AcceptedName = AcceptReqId.userName;
  //     // console.log("accepteduserNAme====>",AcceptedName);
  //     // console.log("acceptedID======>",AcceptReqId._id)
  //     const resAcceptFollowReq = await fetch(
  //       `http://localhost:4500/acceptFollow/${AcceptedID}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
      
  //     const AcceptedReq = await resAcceptFollowReq.json();
  //     console.log("acceptedReqName====>", AcceptedReq);
      
  //     // alert(` you accept follow req of ${AcceptedName}`);


  //     // if (AcceptedReq.status === "accepted") {
  //     //   // Update the component state to indicate acceptance.

  //     //   // setAccepted(true);
  //     //   setAccepted((prevFollowerReqs)=>{
  //     //     prevFollowerReqs?.status?.follower.filter((request)=>request !== AcceptReqId)
  //     //   })
  //     // }
  //   } catch (error) {
  //     console.log("AcceptFollowReq error", error);
  //   }
  // };
  return (
    <>
      <MenuBar />
      <div className="text-center mt-4">
        <Button onClick={handleAllFollowerReq} className="">
          Show Follow Req
        </Button>
      </div>

      <ListGroup as="ol" numbered>
        {allFollowerReq.map((user, id) => (
          <ListGroup.Item
            key={id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sender: {user?.follower?.name}</div>
              {/* =======main======== */}
              <RejectFollowReq rejectFollowId={user.follower} />
              <AcceptFollowButton AcceptReqId={user.follower} />
                  {/* <Button
//                     variant="outline-danger"
//                     className="me-3"
//                     onClick={() => handleRejectFollowReq(user.follower)}
//                   >
//                     Reject
//                   </Button> */}
              {/* <Button onClick={()=>{handleAcceptFollowReq(user.follower); handleAllFollowerReq();}}>Accept</Button> */}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};


export default Notifaction;
