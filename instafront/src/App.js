import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import useToken from "./hook/useToken";
import MainRoute from "./Routes/MainRoute";

function App() {
  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  //  else {
  //   navigate("/login");
  // }

  return (
    <>
      {/* <div>data</div> */}
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
      
      {/* 
       <BrowserRouter>
        <Routes>
         <Route path="/" element={<ProtectedRoute />}> 
           <Route path="/" element={<Login />}></Route>
          </Route>
           <Route path="/about" element={<About />}></Route>
         </Routes>
       </BrowserRouter>  */}
    </>
  );
}

export default App;
