import React, { useState } from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  Button,
  ChakraProvider,
  Container,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  Link,
  HStack,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import AgeGateDrawer from './AgeGateDrawer'
import SignUpDrawer from './SignUpDrawer';
import SignInDrawer from './SignInDrawer';
import MenuDrawer from './MenuDrawer';

const store = require('store');

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/mobile_bg_xl.png")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover"
}

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

function OnboardContainer({history}) {
  return (
    <ChakraProvider theme={theme}>
      <MenuDrawer type={`onboard`}/>
      <Box
          bg={`blue.900`}
          textAlign="center" 
          fontSize="xl" 
        >
        <Grid p={3} minH={`100vh`} style={gridStyle}>
          <VStack
            spacing={8} 
            justify={`center`} 
          >
            <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Legends Logo" height={`150px`}style={{margin: "0 auto"}}/>
            <Text color="white" >Make your picks, build your streaks, win legendary rewards</Text>
            <Container style={{margin: "1rem auto"}}>
              <SignUpDrawer />
              <SignInDrawer />
            </Container>
            <Box style={{textAlign: "center"}}>
              <Text color="white" fontSize="md">In Partnership With</Text>
              <Image boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
            </Box>
          </VStack>
        </Grid>
      </Box>
      { store.get("eligible") ? null: <AgeGateDrawer /> }
      
    </ChakraProvider>
  );
}

export default withRouter(OnboardContainer);
