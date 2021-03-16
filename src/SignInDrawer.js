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
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';

import LoadingWidget from './LoadingWidget';

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

const modalContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px"
}

function SignInDrawer({history}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const [state, setState] = useState({submitting: false, email: null, password: null})

  const isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = () => {
    setState({...state, submitting: true})
    auth.authenticate(state.email, state.password).then(() => {
      setState({...state, submitting: false})
      history.push(`/dashboard`)
    }).catch((error) => {
      setState({...state, submitting: false})
      alert('error!')
    })
  }

  const handleOnChange = (e) => {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  let form_completed = state.email && state.password

  if (isDesktop) {
    return (
    <>
    <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={onOpen} style={{textTransform: "uppercase"}}>
      <Text color="white" style={{textDecoration: "underline"}}>Sign In</Text>
    </Button>
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay>
        <ModalContent style={modalContentStyle}>
          <ModalCloseButton color={"#fff"}/>
          <ModalBody>
            { state.submitting ? <LoadingWidget>
              <Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} />
            </LoadingWidget> : null }
            <Box p={5}>
            <Heading style={{textAlign: "center"}} color="white">Sign in</Heading>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input disabled={state.submitting} name="email" type="email" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input disabled={state.submitting} name="password" type="password" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="md" onChange={handleOnChange}/>
            </InputGroup>
            {/* <Text color="white" fontSize="xs" mb={7} style={{textTransform: "uppercase", textAlign: "center"}}>Forgot password?</Text> */}
            <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mb={2} style={buttonStyle} isFullWidth disabled={state.submitting || !form_completed} onClick={handleSignIn}>
              <Text color="white" fontSize={`sm`}>Sign in</Text>
            </Button>
            <Text color="white" fontSize="xs" m={2} style={{textTransform: "uppercase", textAlign: "center"}} onClick={onClose}>New here? Create an account</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
    </>
    );
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
            { state.submitting ? <LoadingWidget>
              <Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} />
            </LoadingWidget> : null }
            <Box p={5}>
            <Heading style={{textAlign: "center"}} color="white">Sign in</Heading>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input disabled={state.submitting} name="email" type="email" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="md" onChange={handleOnChange}/>
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input disabled={state.submitting} name="password" type="password" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="md" onChange={handleOnChange}/>
            </InputGroup>
            {/* <Text color="white" fontSize="xs" mb={7} style={{textTransform: "uppercase", textAlign: "center"}}>Forgot password?</Text> */}
            <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mb={2} style={buttonStyle} isFullWidth disabled={state.submitting || !form_completed} onClick={handleSignIn}>
              <Text color="white" fontSize={`sm`}>Sign in</Text>
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
