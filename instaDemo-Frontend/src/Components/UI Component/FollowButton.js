import React from 'react'
import { Button } from 'react-bootstrap';


const FollowButton = ({userId,onFollowClick}) => {
  return (
     <Button variant='primary' onClick={()=>{onFollowClick(userId)}}>Follow</Button>
  )
}

export default FollowButton;