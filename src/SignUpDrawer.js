import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { IoMdPerson } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

// Data fetching
import axios from "axios";

const store = require('store');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function SignUpDrawer({history}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState({checked: false})
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json"
    },
  })

  function handleOnChange(e) {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  function handleChecked(e) {
    let checked_state = e.target.checked
    setState({...state, checked: checked_state})
  }

  function handleSignUp() {
    apiUrl.post(`v1/users`, {
      username: state.username,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation,
      account_id: 1
    }).then((response) => {
      store.set('auth_token', response.data.token)
      history.push(`/welcome`)
    }).catch((error) => {
      alert('error has occurred')
    })
  }
  
  return (
    <>
    <Button size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={onOpen}>
      <Text color="white">Sign Up</Text>
    </Button>
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} style={{textAlign: "center"}} color="white">Sign up</Heading>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<IoMdPerson color="white" />}
              />
              <Input type="text" name="username" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Username" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<HiOutlineMail color="white" />}
              />
              <Input type="text" name="email" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="white" />}
              />
              <Input type="password" name="password" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="white" />}
              />
              <Input type="password" name="password_confirmation" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Confirm Password" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <Grid>
              <Text mb={5} fontSize={`xs`} color="white"><Checkbox isChecked={state.checked} onChange={handleChecked} style={{position: "relative", top: "2.5px", paddingRight: "5px"}}/> I consent to Bud Light and its affiliates using my Personal Information to provide me with product and marketing information by email and other electronic means, and I have read and agree to the Bud Light Terms of Use and Privacy Policy, which describe how the information I provide may be used.</Text>
            </Grid>
            
            <Button size={`md`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={handleSignUp}>
              <Text color="white" fontSize={`sm`}>Create an account</Text>
            </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  );
}

export default withRouter(SignUpDrawer);
