import React from 'react'
import useToken from '../hook/useToken'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Logout = () => {
    const navigate = useNavigate();

    const {token,setToken} = useToken();

   const handleLogOut = () =>{
     if(token){
         sessionStorage.removeItem("login");
         sessionStorage.removeItem("token");
          navigate('/login');
     }
   }
    return (
      <>
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal.Dialog>
        <Modal.Body>
          <p>are you sure for Logout ...!</p>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary">Close</Button> */}
          <Button variant="primary" onClick={handleLogOut}>Logout</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    {/* <button onClick={handleLogOut}>LogOut</button> */}
      </>
  )
}

export default Logout