import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  Flex,
  Spacer,
  Center
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { IoMdPerson } from "react-icons/io";

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "none",
}

function MenuDrawer({type}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <Box bg={`rgb(18, 29, 78)`} p={2}>
    <Center style={{textAlign: "center"}}>
      { type !== "onboard" ? <Box w="130px" h="10" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <HamburgerIcon color="white" onClick={onOpen}/>
      </Box> : null }
      <Box w="170px" h="10" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Image height={`25px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Bud Light" />
      </Box>
      { type !== "onboard" ? <Box w="130px" h="10" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <IoMdPerson color="white" />
      </Box> : null }
    </Center>
    <Drawer placement={`left`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Home</Heading>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Prizes</Heading>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Rules</Heading>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">About</Heading>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </Box>
  );
}

export default MenuDrawer;
