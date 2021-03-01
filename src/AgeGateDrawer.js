import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
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

function AgeGateDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
  
  return (
    <Drawer placement={`bottom`} onClose={null} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">ID, please</Heading>
            <Text color="white" fontSize="md" mt={5} mb={10} style={{textAlign: "center"}}>You must be of legal drinking age to enter this site</Text>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Birthday (MM/DD/YYYY)" size="lg" />
            </InputGroup>
            <Button size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={() => onClose() }>
              <Text color="white">Enter</Text>
            </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default AgeGateDrawer;
