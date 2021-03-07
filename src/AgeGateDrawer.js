import React, { useState } from 'react';
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

// Data fetching
import axios from "axios";

// Libraries
import Confetti from "react-confetti";
import NumberFormat from "react-number-format";
import moment from "moment";
import styled from "styled-components";

const store = require('store');

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

const CustomInput = styled(NumberFormat)`
  width: 100%;
  min-width: 0;
  outline: 0;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-size: 1.125rem;
  padding-left: 2.5rem;
  padding-right: 1rem;
  height: 3rem;
  border-radius: 0.375rem;
  border: 2px solid;
  border-color: transparent;
  color: white;
  background: rgba(16, 40, 100, 0.95);
`;

function AgeGateDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
  const [dob, setDob] = useState(null)

  const isEligible = () => {
    let date = moment(dob, "MM/DD/YYYY");
    let years = moment().diff(date, "years", false);
    let valid_dob = moment(date, "MM/DD/YYYY", true).isValid();

    return valid_dob && years >= 21;
  }

  const isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleOnChange = (e) => {
    setDob(e.target.value)
  }

  const handleSubmit = () => {
    if (isEligible()) {
      store.set("eligible", true)
      onClose()
    } else {
      alert('you are not old enough')
    }
  }

  
  return (
    <Drawer placement={`bottom`} onClose={null} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerBody>
            <Box p={5}>
            <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">ID, please</Heading>
            <Text color="white" fontSize="md" mt={5} mb={10} style={{textAlign: "center"}}>You must be of legal drinking age to enter this site.</Text>
            <InputGroup mt={5} mb={5}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="white" />}
              />
              {/* <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Birthday (MM/DD/YYYY)" size="lg" /> */}
                  <CustomInput
                    type="tel"
                    format="## / ## / ####"
                    placeholder="Birthday MM/DD/YYYY"
                    name={"dob"}
                    value={dob}
                    onChange={handleOnChange}
                  />
            </InputGroup>
            <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={handleSubmit}>
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
