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

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/bg_legends.png")`,
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
  const [signUp, setSignUp] = useState(false)
  const [signIn, setSignIn] = useState(false)
  
  return (
    <ChakraProvider theme={theme}>
      <MenuDrawer type={`onboard`}/>
      <Box
          bg={`blue.900`}
          textAlign="center" 
          fontSize="xl" 
        >
        <Grid minH="100vh" p={3} style={gridStyle}>
          <VStack
            spacing={8} 
            justify={`center`} 
          >
            
            <Text m={5} color="white">Place your picks for March Madness, earn points, win prizes</Text>
            <Container>
              <SignUpDrawer />
              <SignInDrawer />
            </Container>
            <Box style={{textAlign: "center", position: "absolute", bottom: "2.5%"}}>
              <Text color="white" fontSize="md">In Partnership With</Text>
              <Image boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
            </Box>
          </VStack>
        </Grid>
      </Box>
      <AgeGateDrawer />
      
    </ChakraProvider>
  );
}

export default withRouter(OnboardContainer);
