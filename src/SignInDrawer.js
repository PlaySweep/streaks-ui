import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
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

import auth from './auth'

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

function SignInDrawer({history}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState({email: null, password: null})

  const isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = () => {
    auth.authenticate(state.email, state.password).then(() => {
      history.push(`/dashboard`)
    }).catch((error) => {
      alert('error!')
    })
  }

  const handleOnChange = (e) => {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }
  
  return (
    <>
    <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={onOpen} style={{textTransform: "uppercase"}}>
      <Text color="white" style={{textDecoration: "underline"}}>Sign In</Text>
    </Button>
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Sign in</Heading>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input name="email" type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="lg" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input name="password" type="password" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" onChange={handleOnChange}/>
            </InputGroup>
            <Text color="white" fontSize="xs" mt={5} mb={10} style={{textTransform: "uppercase", textAlign: "center"}}>Forgot password?</Text>
            <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={2} style={buttonStyle} isFullWidth onClick={handleSignIn}>
              <Text color="white">Sign in</Text>
            </Button>
            <Text color="white" fontSize="xs" m={2} style={{textTransform: "uppercase", textAlign: "center"}} onClick={onClose}>New here? Create an account</Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  );
}

export default withRouter(SignInDrawer);
