import React, { useState, useEffect, createContext } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Grid,
  VStack,
  Text,
  Box,
  Image,
  Heading,
  Fade,
  Spinner,
  Tag,
  Link
} from '@chakra-ui/react';

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';
import Dots from './Dots'
import LoadingWidget from './LoadingWidget'

import { useMediaQuery } from "@chakra-ui/react";

import { FiChevronLeft } from 'react-icons/fi';

import SwipeableViews from 'react-swipeable-views';

import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';

const store = require('store');

export const PrizeContext = createContext({})

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/stars_bg.png")`,
  backgroundPosition: "top center",
  backgroundSize: "contain",
  justifyContent: "center"
}

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
}

const redeemButtonStyle = {
  border: "2px solid #90D5FB",
  textTransform: "uppercase",
  padding: "0.25rem"
}

function AboutContainer({history}) {
  const [isDesktop] = useMediaQuery("(min-width: 775px)")

  if (isDesktop) {
    return (
      <Fade in={true}>
      <MenuDrawer activeTab={`about`} />
        <Grid
        minH={`100vh`}
        bg={`blue.900`}
        style={gridStyle}
      >
        <Box mt={5} ml={5} style={{display: "flex", alignItems: "center"}} onClick={() => history.push(`/dashboard`)}>
          <FiChevronLeft color={`white`} style={{marginRight: "2.5px"}}/>
          <Text color={`white`} fontSize={`sm`} style={{fontWeight: "600", textTransform: "uppercase", textDecoration: "underline"}}>Back</Text>
        </Box>
        <Container>
          <Box style={{width: "75%", margin: "1rem auto 0 auto", textAlign: "center"}}>
            <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>About</Heading>
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Legends are made in March. Play for a change to win epic prizes.</Text>
          </Box>
        </Container>
        
        <Container style={{background: "rgb(17, 30, 75)", textAlign: "center"}}>
        <Box p={5}>
          <Heading mt={2} mb={2} color="white" size="md" style={{fontWeight: "800"}}>How it works</Heading>
          <Text mt={2} color="white" fontSize="md">
            Make your picks before the games begin each round. 
          </Text>
          <Text mt={2} color="white" fontSize="md">
            Earn Points for every correct answer.
          </Text>
          <Text mt={2} color="white" fontSize="md">
            Redeem streaks for prizes.
          </Text>
          <Text mt={2} color="white" fontSize="md">
            Earn up to one bonus point each round by purchasing from the Bud Light family on Drizly.
          </Text>
          <Text mt={2} color="white" fontSize="md">
            There are 6 rounds.
          </Text>
        </Box>
        <Box style={{textAlign: "center"}}>
          <Heading mt={2} mb={2} color="white" size="md" style={{fontWeight: "800"}}>Prizes</Heading>
          <Text mt={2} color="white" fontSize="md">
            You can cash out your streaks for prizes or press your luck for the ultimates prizes.
          </Text>
          <Text mt={2} color="white" fontSize="md">
            Perfect Streaks (6 round streak): A Year’s Worth of Free Beer
          </Text>
          <Text mt={2} color="white" fontSize="md">
            Highest Points: 2022 March Hoops Experience
          </Text>
        </Box>
          <Box mt={10} mb={5} style={{textAlign: "center"}}>
          <Text color="white" fontSize="md">In Partnership With</Text>
          <Image boxSize="50px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
        </Box>
        </Container>
      </Grid>
      </Fade>
    );
  }

  return (
    <Fade in={true}>
    <MenuDrawer activeTab={`about`} />
      <Grid
      minH={`100vh`}
      bg={`blue.900`}
      style={gridStyle}
    >
      <Box mt={5} ml={5} style={{display: "flex", alignItems: "center"}} onClick={() => history.push(`/dashboard`)}>
        <FiChevronLeft color={`white`} style={{marginRight: "2.5px"}}/>
        <Text color={`white`} fontSize={`sm`} style={{fontWeight: "600", textTransform: "uppercase", textDecoration: "underline"}}>Back</Text>
      </Box>
      <Container>
        <Box style={{width: "75%", margin: "1rem auto 0 auto", textAlign: "center"}}>
          <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>About</Heading>
          <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Legends are made in March. Play for a change to win epic prizes.</Text>
        </Box>
      </Container>
      
      <Container style={{background: "rgb(17, 30, 75)", textAlign: "center"}}>
      <Box p={5}>
        <Heading mt={2} mb={2} color="white" size="md" style={{fontWeight: "800"}}>How it works</Heading>
        <Text mt={2} color="white" fontSize="md">
          Make your picks before the games begin each round. 
        </Text>
        <Text mt={2} color="white" fontSize="md">
          Earn Points for every correct answer.
        </Text>
        <Text mt={2} color="white" fontSize="md">
          Redeem streaks for prizes.
        </Text>
        <Text mt={2} color="white" fontSize="md">
          Earn up to one bonus point each round by purchasing from the Bud Light family on Drizly.
        </Text>
        <Text mt={2} color="white" fontSize="md">
          There are 6 rounds.
        </Text>
      </Box>
      <Box style={{textAlign: "center"}}>
        <Heading mt={2} mb={2} color="white" size="md" style={{fontWeight: "800"}}>Prizes</Heading>
        <Text mt={2} color="white" fontSize="md">
          You can cash out your streaks for prizes or press your luck for the ultimates prizes.
        </Text>
        <Text mt={2} color="white" fontSize="md">
          Perfect Streaks (6 round streak): A Year’s Worth of Free Beer
        </Text>
        <Text mt={2} color="white" fontSize="md">
          Highest Points: 2022 March Hoops Experience
        </Text>
      </Box>
        <Box mt={10} mb={5} style={{textAlign: "center"}}>
        <Text color="white" fontSize="md">In Partnership With</Text>
        <Image boxSize="50px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
      </Box>
      </Container>
    </Grid>
    </Fade>
  );
}

export default withRouter(AboutContainer);
