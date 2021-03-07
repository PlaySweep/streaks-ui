import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
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
import { IoMdPerson } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

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

function SignUpDrawer({history}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checked, setChecked] = useState(false)

  function handleChecked(e) {
    let checked_state = e.target.checked
    setChecked(checked_state)
  }
  
  return (
    <>
    <Button size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={onOpen}>
      <Text color="white">Sign Up</Text>
    </Button>
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Sign up</Heading>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<IoMdPerson color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Username" size="lg" />
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<HiOutlineMail color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="lg" />
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" />
            </InputGroup>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="white" />}
              />
              <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Confirm Password" size="lg" />
            </InputGroup>
            <Grid>
              <Text mt={5} mb={5} color="white"><Checkbox isChecked={checked} onChange={handleChecked} style={{position: "relative", top: "2.5px", paddingRight: "5px"}}/> I consent to Bud Light and its affiliates using my Personal Information to provide me with product and marketing information by email and other electronic means, and I have read and agree to the Bud Light Terms of Use and Privacy Policy, which describe how the information I provide may be used.</Text>
            </Grid>
            
            <Button size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={() => history.push(`/welcome`) }>
              <Text color="white">Create an account</Text>
            </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  );
}

export default withRouter(SignUpDrawer);
