import React from 'react';
import { withRouter} from 'react-router';
import { Redirect } from 'react-router-dom';
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
  Center,
  SimpleGrid
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { IoMdPerson } from "react-icons/io";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const store = require('store');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "none",
}

function MenuDrawer({history, type}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleLogOut() {
    store.clearAll()
    store.set('eligible', true)
    history.push(`/`)
  }
  
  return (
    <Box bg={`rgb(18, 29, 78)`} p={2}>
    <Flex style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      { type === "onboard" ? <>
      <Box h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`25px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Bud Light" />
      </Box></> : <>
      <Box w="130px" h="10" style={{display: "flex", alignItems: "center"}}>
        <HamburgerIcon color="white" onClick={onOpen}/>
      </Box>
      <Box w="170px" h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`25px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Bud Light" />
      </Box></> }
    </Flex>
    <Drawer placement={`left`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody style={{display: "flex"}}>
            <Box mt={10} p={5}>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "center"}} color="white" onClick={() => history.push(`/dashboard`)}>Home</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "center"}} color="white" onClick={() => history.push(`/prizing`)}>Prizes</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "center"}} color="white" onClick={() => history.push(`/rules`)}>Rules</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "center"}} color="white" onClick={() => history.push(`/about`)}>About</Heading>
            </Box>
            {/* <Box p={5} style={{position: "absolute", bottom: "50px"}}>
              <Heading mt={5} mb={5} fontSize={`lg`} style={{textAlign: "left"}} color="white">Follow</Heading>
              <SimpleGrid columns={3} spacing={10}>
                <Box >
                  <FiFacebook color={`#fff`}/>
                </Box>
                <Box >
                  <FiTwitter color={`#fff`}/>
                </Box>
                <Box >
                  <FiInstagram color={`#fff`}/>
                </Box>
              </SimpleGrid>
            </Box> */}
            <Box p={5} style={{position: "absolute", bottom: "50px"}} onClick={handleLogOut}>
              <Heading mt={5} mb={5} fontSize={`lg`} style={{textAlign: "left"}} color="white">Log out</Heading>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </Box>
  );
}

export default withRouter(MenuDrawer);
