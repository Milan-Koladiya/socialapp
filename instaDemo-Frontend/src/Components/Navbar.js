import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Searchbar from "./UI Component/Searchbar";
export const MenuBar = () => {
  return (
    <>
     
     
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Social Media</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link ><Link to='/'>Home</Link></Nav.Link>
            <Nav.Link ><Link to='/follower'>Follower</Link></Nav.Link>
            <Nav.Link ><Link to='/following'>Following</Link></Nav.Link>
            <Nav.Link ><Link to='/newPost'>Post</Link></Nav.Link>
            <Nav.Link ><Link to='/notifaction'>Notifaction</Link></Nav.Link>
          </Nav>
          <Searchbar />
          <Button variant="outline-danger"><Link to="/logout">Logout</Link></Button>
        </Container>
      </Navbar>

     
    </>
  );
};
