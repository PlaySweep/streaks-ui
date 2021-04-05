import React, { useState, useEffect, useContext, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  VStack,
  Text,
  Box,
  Image,
  Heading,
  Fade,
  Link,
  Button
} from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react";

import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
  shutdown as shutdownIntercom
} from "./intercom"

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';
import PopupWidget from './PopupWidget';

import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';

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

const store = require('store');

export const DashboardContext = createContext({})

function DashboardContainer() {
  let authToken = store.get('auth_token')
  const [state, setState] = useState({loading: true, changed: 0})
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const [isIpad] = useMediaQuery("(min-width: 835px)")
  const backgroundImage = isDesktop ? "https://streaks-challenge.s3.amazonaws.com/desktop_bg.png" : "https://streaks-challenge.s3.amazonaws.com/mobile_bg_xl.png"
  const gridStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
  }
  const desktopGridStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })

  useEffect(() => {
    apiUrl.get(`v1/users/${jwt_decode(authToken).user_id}`).then((response) => {
      const user = response.data.user
      apiUrl.get(`v1/rounds?active=true`).then((response) => {
        let rounds = response.data.rounds
        let round = rounds[0]
        setState({
          ...state, 
          updatePlayedCards: updatePlayedCards, 
          updatePick: updatePick, 
          user: user, 
          round: round, 
          loading: false
        })
      })
      loadIntercom()
      bootIntercom({
        email: user.email
      })
    })
  }, [state.changed])

  function updatePlayedCards(playedCard) {
    setState(state => ({ 
      ...state, changed: state.changed += 1, 
      user: {
          ...state.user,
          played_cards: state.user.played_cards?.concat(playedCard)
      }
    }))
  }

  function updatePick(matchup_id, selection_id) {
    setState(state => ({ 
      ...state, changed: state.changed += 1,
      round: {
          ...state.round,
          matchup: { 
            ...state.round.matchups.find(m => m.id === matchup_id).selections.filter(sel => sel.id !== selection_id).concat({matchup_id: matchup_id, selection_id: selection_id, selected: true})
          }
      }
    }))
  }

  if (state.loading) {
    return <></>
  }

  if (isDesktop && Object.keys(state.user).length > 0) {
    return (
      <DashboardContext.Provider value={state}>
        <Fade in={true}>
          <MenuDrawer activeTab={`dashboard`}/>
          <Grid
          templateColumns="repeat(2, 1fr)" gap={6}
          bg={`blue.900`}
          style={desktopGridStyle}
        >
          { !isIpad ? <>
            <RoundCard />
            <StatsContainer />
          </> : <Box style={{alignItems: "flex-end", display: "flex"}}>
            <RoundCard />
            <StatsContainer />
          </Box> }
          </Grid>
          <LeaderboardContainer />
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" mt={5} mb={5} style={cardStyle}>
            <Box p="3">
              <Box
                m={2}
                fontWeight="semibold"
                lineHeight="tight"
              >
              <Heading mt={0} style={{textAlign: "center", fontWeight: "800"}} color="white" size="md">Become a Bud Light Legend</Heading>
              <Text color="white" fontSize="xs" mt={3} mb={3} style={{textAlign: "center"}} >Get exclusive access to merch, experiences, and discounts.</Text>
              <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={buttonStyle} isFullWidth >
                <Link color="white" fontSize={`sm`} href="https://budlightlegends.com/joinnow" isExternal>
                  Join Now
                </Link>
              </Button>
              </Box>
            </Box>
          </Box>
      </Fade>
      </DashboardContext.Provider>
    );
  }

  if (Object.keys(state.user).length > 0) {
    return (
      <DashboardContext.Provider value={state}>
        <Fade in={true}>
          <MenuDrawer activeTab={`dashboard`}/>
          <Grid
          minH={`100vh`}
          bg={`blue.900`}
          style={gridStyle}
        >
          <Container>
          <Box style={{margin: "2.5rem auto 0 auto", textAlign: "center"}}>
            <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Legends Logo" height={`150px`}style={{margin: "0 auto"}}/>
            <Text mt={3} mb={3} color="white" style={{width: "100%",fontWeight: "500"}}>Pick 3 out of 5 correct each round to earn a streak. Redeem streaks for legendary prizes like a year’s worth of free beer or a 2022 March Hoops Experience.</Text>
            <SvgWidget roundId={state.round?.id} width={`266`} height={`214`} />
          </Box>
          </Container>
          <Container>
            <RoundCard />
          </Container>
          <StatsContainer />
          <LeaderboardContainer />
          <Container pb={5} style={{background: "rgb(17, 30, 75)"}}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" mt={5} mb={5} style={cardStyle}>
              <Box p="3">
                <Box
                  m={2}
                  fontWeight="semibold"
                  lineHeight="tight"
                >
                <Heading mt={0} style={{textAlign: "center", fontWeight: "800"}} color="white" size="md">Become a Bud Light Legend</Heading>
                <Text color="white" fontSize="xs" mt={3} mb={3} style={{textAlign: "center"}} >Get exclusive access to merch, experiences, and discounts.</Text>
                <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={buttonStyle} isFullWidth >
                  <Link color="white" fontSize={`sm`} href="budlightlegends.com/joinnow" isExternal>
                    Join Now
                  </Link>
                </Button>
                </Box>
              </Box>
            </Box>
            <PopupWidget type={`share`} buttonText={`Share with friends`} textSize={`sm`} />
          </Container>
        </Grid>
      </Fade>
      </DashboardContext.Provider>
    );
  } else {
    <Redirect to={`/`} />
  }
}

export default DashboardContainer;
