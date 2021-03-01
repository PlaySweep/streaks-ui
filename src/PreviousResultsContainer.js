import React from 'react';
import {
  Button,
  Grid,
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
  Badge,
  Text,
  VStack
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
}

const cardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/stars_bg.png")`
}

function PreviousResultsContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
    <Text color="white" fontSize="xs" mt={3} style={{textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>Review previous rounds</Text>
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
            <Button size={`lg`} variant="outline" mb={2} style={buttonStyle} isFullWidth >
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

export default PreviousResultsContainer;