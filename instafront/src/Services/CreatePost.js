import React, { useRef, useState } from "react";
import useToken from "../hook/useToken";
import Button from "react-bootstrap/Button";
import { MenuBar } from "../Components/Navbar";

const CreatePost = (e) => {
  const { token, setToken } = useToken();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
//  const ImgInputRef = useRef(null);

  const handleImage = () => {
    const file = e.target.file[0];
    setImage(file);
  };

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const newPostResponce = await fetch("http://localhost:4500//user/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const Post = await newPostResponce.json();
      console.log("Post", Post);
    } catch (error) {
      console.log("createPost Error", error);
    }
  };
  return (
    <>
      <div className="container">
        <MenuBar></MenuBar>
        <div className="text-center mt-5">
          <h2>Create new post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <br />

          <input
            className="ms-5"
            type="file"
            placeholder="Enter image"
            // value={image}
            // ref={ImgInputRef}
            onChange={handleImage}
          />
          <br />
          <Button
            variant="outline-danger"
            className="text-center mt-4"
            onClick={handleCreatePost}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
