import React from 'react';
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

function SignInDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSignIn() {
    console.log("Signing in...")
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
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="lg" />
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" />
            </InputGroup>
            <Text color="white" fontSize="xs" mt={5} mb={10} style={{textTransform: "uppercase", textAlign: "center"}}>Forgot password?</Text>
            <Button size={`lg`} variant="outline" mb={2} style={buttonStyle} isFullWidth onClick={handleSignIn}>
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

export default SignInDrawer;
