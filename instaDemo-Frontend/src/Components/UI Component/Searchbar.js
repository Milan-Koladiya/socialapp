import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useToken from "../../hook/useToken";
import "./searchbar.css";
import Modal from "react-bootstrap/Modal";
import FollowUserProfile from "../Follower-following/sendFollowReq/FollowUserProfile";

const Searchbar = () => {
  const { token } = useToken();

  const [query, setQuery] = useState();
  const [searchResult, setSearchResult] = useState();
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleSearch = async (e) => {
    const searchResponce = await fetch(
      ` http://localhost:4500/search/users?search=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const { alluser } = await searchResponce.json();
    const searchUser= await searchResponce.json();

     if(searchUser.alluser?.length > 0)
   {

       setSearchResult(searchUser?.alluser);   
    }else{
       alert("user not found");
   }
  };
const show=()=>{
    setSmShow(true);
}
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
        <Button variant="outline-success" onClick={()=>{handleSearch(); show();}}>
          Search
        </Button>
      </Form>

      {/* <div className="searchUserDisplay"> */}
        {/* <ul>
          {searchResult?.map((user) => {
            return (
              <>
                <li className="text-light">{user.name} </li>
                <li>{user.userName} </li>
              </>
            );
          })} */}
          {searchResult ?.map((user) => {
            return (
              <>
                {/* <Button onClick={() => setSmShow(true)} className="me-2">
                  Small modal
                </Button> */}

                <Modal
                  size="sm"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      {user.userName}
                    </Modal.Title>
                    <FollowUserProfile />
                  </Modal.Header>
                  {/* <Modal.Body>...</Modal.Body> */}
                </Modal>
              </>
            );
          })}
     
    </>
  );
};

export default Searchbar;