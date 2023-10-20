import React, { useEffect, useState } from "react";
import axios from "axios";

// import { useHistory } from "react-router-dom";

// import { generatePath } from "react-router-dom";

import useToken from "../../hook/useToken";
import { Button } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UpdatePost from "../UI Component/UpdatePost";
import DeletePostButton from "../UI Component/DeletePostButton";
import Clientaxios from "../../api/axios";
const AllPost = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState([]);
  const [handle, setHandle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState();

  const axiosInstance = Clientaxios();
useEffect(()=>{
   handleAllPost();
       
},[])
  // const history = useHistory();

  const handleAllPost = async (e) => {
    // e.preventDefault();

    try {
      // const allPostResponce = await fetch(`http://localhost:4500/user/posts`, {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // const usersPosts = await allPostResponce.json();
      const allPostResponce = await axiosInstance.get("/user/posts");
      const usersPosts = await allPostResponce.data;

      setPosts(usersPosts?.allpost);
    } catch (error) {
      console.log("All pOst error=======>", error);
    }
  };
  useEffect(() => {
    handleAllPost();
  }, []);
  const handleTrue = () => {
    setHandle(true);
  };

  const handleConfirmUpdate = (e) => {
    // history.push(generatePath`/updatePost/${id}`));
  };

  // const handleUpdate = async () => {
  //   try {
  //     const UpdatePostRes = await fetch(
  //       `http://localhost:4500/update/post${postId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           title: title,
  //           description: description,
  //         }),
  //       }
  //     );
  //     const updateP = await UpdatePostRes.json();
  //     console.log("updateP=====>", updateP);

  //   } catch (error) {

  //     console.log("update post error======>", error);

  //   }
  // };
  console.log("post====>", posts);
  return (
    <>
      <Button onClick={handleAllPost}>show All post</Button>
      {posts?.map((item, i) => {
        console.log("item?.image===========", item?.image);
        return (        
          <>
            <div className="d-flex justify-content-center mt-4" >
              <Card style={{ width: "18rem" }} >
                <Card.Img
                  variant="top"
                  src={`http://localhost:4500/${item?.image}`}
                >
                  {/* <Card.Img variant="top" src={`http://localhost:4500/posts/images.jpeg`}> */}
                  {/* {item.image} */}
                </Card.Img>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  {/* <p >posted at:{item.createAt}</p> */}
                  {/* <Button variant="primary">Go somewhere</Button> */}

                  <Button variant="info" postId={item.id}>
                    <Link to={`/updatePost/${item._id}`}>Update post</Link>
                  </Button>

                  <Button variant="info">
                    <Link to={`/deletepost/${item._id}`}>Delete Post</Link>
                  </Button>
                  {/* <Button variant="info" postId={item.id}><Link to='/updatePost'>Update post</Link></Button> */}
                  {/* <Button
                    variant="info"
                    key={i}
                    onClick={(e) => {
                      setId(item.id);
                      handleConfirmUpdate();
                    }}
                  >
                    Update Post
                  </Button> */}

                  {/* {handle ? <UpdatePost postId={item.id}></UpdatePost> : null} */}

                  {/* <DeletePostButton deletePostId={item._id} ></DeletePostButton> */}
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
