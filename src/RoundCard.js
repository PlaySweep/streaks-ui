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
  Badge,
  Text
} from '@chakra-ui/react';

import PicksContainer from './PicksContainer'
import PreviousResultsContainer from './PreviousResultsContainer';

import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
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
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function RoundCard() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSignIn() {
    console.log("Signing in...")
  }
  
  return (
    <>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" style={cardStyle}>
      <Badge borderRadius="full" px="2" bg="#DD6937" color="white" style={{padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "1", "position":"absolute","width":"auto","height":"24px", left: "50%", transform: "translate(-50%, -50%)"}}>
        5th Round
      </Badge>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
        <Heading mt={0} style={{textAlign: "center"}} color="white" size="md">Streak Scenarios</Heading>
        <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaCheckCircle style={{color: "green", display: "inline-flex"}}/> Picks have been selected</Text>
        <PicksContainer />
        <PreviousResultsContainer />
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default RoundCard;