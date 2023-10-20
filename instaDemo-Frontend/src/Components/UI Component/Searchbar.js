// import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import useToken from "../../hook/useToken";
// import "./searchbar.css";
// import Modal from "react-bootstrap/Modal";
// import FollowUserProfile from "../Follower-following/sendFollowReq/FollowUserProfile";

// const Searchbar = () => {
//   const { token } = useToken();

//   const [query, setQuery] = useState();
//   const [searchResult, setSearchResult] = useState([]);
//   const [smShow, setSmShow] = useState(false);
//   const [lgShow, setLgShow] = useState(false);
//    console.log("search state======>",searchResult);
//   const handleSearch = async (e) => {
//     const searchResponce = await fetch(
//       ` http://localhost:4500/search/users?search=${query}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     // const { alluser } = await searchResponce.json();
//     const searchUser = await searchResponce.json();
//     console.log("searchUser====================>", searchUser.alluser);
//     const searchUserName = searchUser?.alluser?.map((name)=>name.name);
//     console.log("searchusername======>",searchUserName);
//     if (searchUser.alluser?.length > 0) {
//       // setSearchResult(searchUser?.alluser?.map((searchname)=>searchname.name));
//       setSearchResult(searchUser?.alluser);
//     } else {
//       setSearchResult([]);
//       alert("user not found");
//     }
//     // console.log("serach user=======>", searchResult);
//   };
//   // setSearchResult();
//   const show = () => {
//     setSmShow(true);
//   };

//   return (
//     <>
//       <Form className="d-flex">
//         <Form.Control
//           type="search"
//           placeholder="Search user..."
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//           }}
//           className="me-2"
//           aria-label="Search"
//         />
//         <Button
//           variant="outline-success"
//           onClick={() => {
//             handleSearch();
//             show();
//           }}
//         >
//           Search
//         </Button>
//       </Form>

     

//       {/* <div className="searchUserDisplay"> */}
//       {/* <ul>
//           {searchResult?.map((user) => {
//             return (
//               <>
//                 <li className="text-light">{user.name} </li>
//                 <li>{user.userName} </li>
//               </>
//             );
//           })} */}
//       {searchResult?.map((user) => {
//         return (
//           <>
//             {/* <Button onClick={() => setSmShow(true)} className="me-2">
//                  Small modal
//                 </Button>  */}
 
//            <Modal
//               size="sm"
//               show={smShow}
//               onHide={() => setSmShow(false)}
//               aria-labelledby="example-modal-sizes-title-sm"
//             > 
//               <Modal.Header closeButton>
//                 <Modal.Title id="example-modal-sizes-title-sm">
//                   {user.name}
//                 </Modal.Title>
//                 <FollowUserProfile followID={user._id} />
//               </Modal.Header>
//              {/* <Modal.Body>...</Modal.Body>  */}
//             </Modal>
//           </>
//         );
//       })} 
//     </>
//   );
// };

// export default Searchbar;



import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useToken from "../../hook/useToken";
import "./searchbar.css";
import Modal from "react-bootstrap/Modal";
import FollowUserProfile from "../Follower-following/sendFollowReq/FollowUserProfile";
import Clientaxios from "../../api/axios";

const Searchbar = () => {
  const { token } = useToken();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);  
  const [showModal, setShowModal] = useState(false);  
  const [userNotFound, setUserNotFound] = useState(false); 

  const axiosInstance = Clientaxios();

  const handleSearch = async () => {
    
    try {

    

      // const searchResponse = await fetch(
      //   `http://localhost:4500/search/users?search=${query}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const searchUser = await searchResponse.json();

       const searchResponce = await axiosInstance.get(`search/users?search=${query}`);
       const searchUser = await searchResponce.data;


      console.log("searchUser==========>",searchUser);

      if (searchUser.alluser.length > 0) {
        setSearchResult(searchUser.alluser);
        setShowModal(true); 
        setUserNotFound(false);
      } else {

        setUserNotFound(true);
        alert("User Not Found");
        
        // setShowModal(true); // Open the modal
        

      }
      console.log("state update=======>",searchResult)

    } catch (error) {
      console.error("Error searching for users:", error);
      alert("An error occurred while searching for users.");
    }
  };

  const closeUserModal = () => {
    setShowModal(false);
    setUserNotFound(false); // Reset userNotFound when closing the modal
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search user..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="me-2"
          aria-label="Search"
        />
        <Button
          variant="outline-success"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </Form>

      <Modal show={showModal} onHide={closeUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {userNotFound ? "User not found" : "Search Results"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
          // userNotFound ? (
          //   <p>No users were found.</p>
          // ) : (
            searchResult.map((user) => (
              <div key={user._id}>
                <Modal.Title>{user.userName}</Modal.Title>
                <Modal.Body>
                  <FollowUserProfile followID={user._id} />
                </Modal.Body>
              </div>
            ))
          // )
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Searchbar;
