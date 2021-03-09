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

import { useDisclosure } from "@chakra-ui/react";

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

function PrizeContainer({history}) {
  const [state, setState] = useState({loading: true})
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500
  })

  useEffect(() => {
    let authToken = store.get('auth_token')
    let decoded_user = jwt_decode(authToken)
    // apiUrl.get(`prizes`).then((response) => {
    //   setState({...state, prizes: response.data.prizes})
    // })
    const prizes = [{ title: "Highest Streak", description: "Free Beer For A Year" }, { title: "5 out of 5", description: "Tickets to Final Four" }, { title: "Highest Streak Round 1", description: "Bud Light T-Shirt" }]
    const rewards = [{ title: "Highest Streak", description: "Free Beer For A Year" }, { title: "5 out of 5", description: "Tickets to Final Four" }, { title: "Highest Streak Round 1", description: "Bud Light T-Shirt" }]
    setState({...state, loading: false, apiUrl: apiUrl, user: decoded_user, prizes: prizes, rewards: rewards})
  }, [])

  const styles = {
    root: {
      margin: "0.25rem 0",
      paddingRight: '125px',
    },
    slideContainer: {
      
    },
    slide: {
      paddingRight: "10px",
      width: "85%",
      minHeight: 100,
      color: '#fff',
    }
  };

  if (state.loading) {
    return <Spinner color={`blue.900`}/>
  }

  if (state.user.exp < moment().unix()) {
    return <Redirect to={`/`} />
  }

  if (Object.keys(state.user).length > 0) {
    return (
      <PrizeContext.Provider value={state}>
      <Fade in={true}>
      <MenuDrawer />
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
            <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>Legendary Rewards</Heading>
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Cash out your points and streaks to win awesome Bud Light merch and other prizes</Text>
          </Box>
        </Container>
        <Box p={5} >
          <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Top Prizes</Heading>
          <SwipeableViews enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
            { state?.prizes?.map((prize, index) => {
              return (
                <div key={index} style={Object.assign({}, styles.slide)}>
                  <Box w="100%" style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                    <VStack>
                      <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>{prize.title}</Heading>
                      <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                      <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>{prize.description}</Text>
                    </VStack>
                  </Box>
                </div>
              )
            }) }
          </SwipeableViews>
        </Box>
        <Box p={5} >
          <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Redeem Your Streak</Heading>
            <Box mt={2} mb={5}>
              <Text color="white" fontSize={`xs`} style={{display: "inline-block", marginRight: "10px", fontWeight: "700"}}>Select Streak</Text>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "#0D40A0", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>1</Tag>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>2</Tag>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>3</Tag>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>4</Tag>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>5</Tag>
              <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem"}}>6</Tag>
            </Box>
            
            <SwipeableViews enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
              { state?.rewards?.map((reward, index) => {
                return (
                  <div key={index} style={Object.assign({}, styles.slide)}>
                    <Box w="100%" style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                      <VStack>
                        <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                        <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>{reward.title}</Heading>
                        {/* <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>{reward.description}</Text> */}
                      <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "#0D40A0", fontWeight: "700", fontSize: "0.5rem", textTransform: "uppercase", height: "10px", padding: "0.5rem 0.5rem", margin: "0.75rem 0.25rem 0 0.25rem"}}>Redeem</Tag>
                      </VStack>
                    </Box>
                  </div>
                )
              }) }
            </SwipeableViews>
        </Box>
        <Container style={{background: "rgb(17, 30, 75)"}}>
        <Box p={5}>
          <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Can't wait?</Heading>
          <Button mt={5} size={`lg`} variant="outline" style={buttonStyle} isFullWidth>
            <Link color="white" fontSize={`sm`} href="https://www.budlight.com/en/legends.html" isExternal>
              See more Legendary Rewards
            </Link>
          </Button>
          <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mt={2.5} style={secondaryButtonStyle} isFullWidth>
            <Link color="white" fontSize={`sm`} href="https://www.budlight.com/en/legends.html" isExternal>
              Order on Drizly
            </Link>
          </Button>
          <Text mt={10} mb={5} color="white" fontSize={`md`} style={{textAlign: "center", textDecoration: "underline", textTransform: "uppercase"}} onClick={() => history.push(`/dashboard`)}>Continue Streak</Text>
        </Box>
        <Box style={{textAlign: "center"}}>
          <Text color="white" fontSize="md">In Partnership With</Text>
          <Image boxSize="50px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
        </Box>
        </Container>
      </Grid>
      </Fade>
      </PrizeContext.Provider>
    );
  }
}

export default withRouter(PrizeContainer);
