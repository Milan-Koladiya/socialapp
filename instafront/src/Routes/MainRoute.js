import React from "react";
import { Home } from "../Pages/Home";
import { About } from "../Pages/About";
import Login from "../Pages/Login";
import SigIn from "../Pages/sigIn";
import Follower from "../Components/Follower-following/getAllFollower/getAllFollower";
import { Route, Routes } from "react-router-dom";
import useToken from "../hook/useToken";
import Following from "../Components/Follower-following/getAllFollowing/getAllFollowing";
import Logout from "../Components/Logout";
import CreatePost from "../Services/CreatePost";
import FollowUserProfile from "../Components/Follower-following/sendFollowReq/FollowUserProfile";
import AcceptFollowReq from "../Components/Follower-following/acceptFollowReq/acceptFollowReq";

const MainRoute = () => {
  const { token } = useToken();

  return (
    <>
      <Routes>
        <Route path="/sigIn" element={token ? <Home /> : <SigIn />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/" element={token ? <Home /> : <Login />}></Route>
        <Route path="/about" element={token ? <About /> : <Login />}></Route>
        <Route
          path="/follower"
          element={token ? <Follower /> : <Login />}
        ></Route>
        <Route
          path="/following"
          element={token ? <Following /> : <Login />}
        ></Route>

        <Route
          path="/notifaction"
          element={token ? <AcceptFollowReq /> : <Login />}
        ></Route>
        <Route
          path="/newPost"
          element={token ? <CreatePost /> : <Login />}
        ></Route>

        <Route
          path="/sendFollowReq"
          element={token ? <FollowUserProfile /> : <Login />}
        ></Route>
      </Routes>
    </>
  );
};

export default MainRoute;
