import React, { useState } from "react";
import useToken from "../../hook/useToken";
import { Button } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UpdatePost from "../UI Component/UpdatePost";
import DeletePostButton from "../UI Component/DeletePostButton";
const AllPost = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState([]);
const [handle, setHandle] = useState(false);

  const handleAllPost = async (e) => {
    e.preventDefault();
    try {
      const allPostResponce = await fetch(`http://localhost:4500/user/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usersPosts = await allPostResponce.json();
      setPosts(usersPosts?.allpost);
    } catch (error) {
      console.log("All pOst error=======>", error);
    }
  };
  const handleTrue = ()=>{
  setHandle(true);
  }
console.log("post====>",posts)
  return (
    <>
      <Button onClick={handleAllPost}>show All post</Button>
      {posts?.map((item) => {
        return (
          <>
            <div className="text-center">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={`public/posts/${item.image}`}>
                  {/* {item.image} */}
                </Card.Img>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  {/* <p >posted at:{item.createAt}</p> */}
                  {/* <Button variant="primary">Go somewhere</Button> */}

                  <Button variant="info" postId={item.id} onClick={handleTrue}><Link to='/updatePost'>Update post</Link></Button>
                
                {/* {

                    handle ?<UpdatePost postId={item.id}></UpdatePost> : null 
                } */}
                <DeletePostButton deletePostId = {item._id}></DeletePostButton>
                </Card.Body>
              </Card>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AllPost;
