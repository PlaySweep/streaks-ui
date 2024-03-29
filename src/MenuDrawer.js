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
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
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

function MenuDrawer({history, type, onCloseFunc, activeTab, reload}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")

  function handleLogOut() {
    store.clearAll()
    store.set('eligible', true)
    window.location.href = `/`
  }

  if (isDesktop) {
    return (
    <Box bg={`rgb(18, 29, 78)`} p={2} >
      { type === "onboard" ? <Flex style={{height: "10vh", display: "flex", alignItems: "center", justifyContent: "end", padding: "0 2rem"}}>
      <Box h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`60px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Bud Light" />
      </Box></Flex> : <Flex style={{height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem"}}>
      <Box w="170px" h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`60px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Bud Light" onClick={type === `picks` ? () => window.location.reload() : () => window.location.href = `/dashboard`} />
      </Box>
      <Box style={{display: "inline-flex", position: "absolute", right: "35px"}}>
      <Box  h="10" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 0.75rem"}}>
        <Heading fontSize={`2xl`} style={{textAlign: "center"}} color={activeTab === `dashboard` ? "#DD6937" : "white"} onClick={type === `picks` ? () => window.location.reload() : () => window.location.href = `/dashboard`}>Dashboard</Heading>
      </Box>
      <Box  h="10" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 0.75rem"}}>
        <Heading fontSize={`2xl`} style={{textAlign: "center"}} color={activeTab === `prizes` ? "#DD6937" : "white"} onClick={reload ? () => window.location.reload() : () => window.location.href = `/prizing`}>Prizes</Heading>
      </Box>
      <Box h="10" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 0.75rem"}}>
        <Heading fontSize={`2xl`} style={{textAlign: "center"}} color={activeTab === `rules` ? "#DD6937" : "white"} onClick={reload ? () => window.location.reload() : () => window.location.href = `/rules`}>Rules</Heading>
      </Box>
      <Box h="10" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 0.75rem"}}>
        <Heading fontSize={`2xl`} style={{textAlign: "center"}} color={activeTab === `about` ? "#DD6937" : "white"} onClick={reload ? () => window.location.reload() : () => window.location.href = `/about`}>About</Heading>
      </Box>
      </Box>
      </Flex> }
    </Box>
    );
  }
  
  return (
    <Box bg={`rgb(18, 29, 78)`} p={2}>
    <Flex style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      { type === "onboard" ? <>
      <Box h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`35px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Bud Light" />
      </Box></> : <>
      <Box w="130px" h="10" style={{display: "flex", alignItems: "center"}}>
        <HamburgerIcon color="white" onClick={onOpen} style={{position: "relative", right: "20px", fontSize: "1.25rem"}}/>
      </Box>
      <Box w="170px" h="10" style={{display: "flex", alignItems: "center"}}>
        <Image height={`25px`} width={`auto`} src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Bud Light" onClick={() => window.location.href = `/dashboard`}/>
      </Box></> }
    </Flex>
    <Drawer placement={`left`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody style={{display: "flex"}}>
            <Box mt={10} p={5}>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "left"}} color={activeTab === `dashboard` ? "#DD6937" : "white"} onClick={() => window.location.href = `/dashboard`}>Dashboard</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "left"}} color={activeTab === `prizes` ? "#DD6937" : "white"} onClick={() => window.location.href = `/prizing`}>Prizes</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "left"}} color={activeTab === `rules` ? "#DD6937" : "white"} onClick={() => window.location.href = `/rules`}>Rules</Heading>
              <Heading mt={0} mb={10} fontSize={`2xl`} style={{textAlign: "left"}} color={activeTab === `about` ? "#DD6937" : "white"} onClick={() => window.location.href = `/about`}>About</Heading>
            </Box>
            <Box p={5} style={{position: "absolute", bottom: "25px"}} onClick={handleLogOut}>
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
