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

import PopupWidget from './PopupWidget';

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
  position: "relative",
  margin: "0 auto 1.5rem auto"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function CallToActionWidget({type, buttonText}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" mt={5} mb={5} style={cardStyle}>
      <Box p="3">
        <Box
          m={2}
          fontWeight="semibold"
          lineHeight="tight"
        >
        <Heading mt={0} style={{textAlign: "center", fontWeight: "800"}} color="white" size="md">Become a Bud Light Legend</Heading>
        <Text color="white" fontSize="xs" mt={3} mb={3} style={{textAlign: "center"}} >Get exclusive access to merch, experiences, and discounts.</Text>
        <PopupWidget type={type} buttonText={buttonText} />
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default CallToActionWidget;