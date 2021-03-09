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
  Fade
} from '@chakra-ui/react';

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';

import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/mobile_bg.png")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  backgroundSize: "contain",
  justifyContent: "center"
}
const store = require('store');

export const DashboardContext = createContext({})

function DashboardContainer() {
  let authToken = store.get('auth_token')
  const [state, setState] = useState({loading: true})
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
      apiUrl.get(`v1/rounds?pending=true`).then((response) => {
        let rounds = response.data.rounds
        let round = rounds.filter(round => round.status === "pending")[0]
        setState({...state, updatePlayedCards: updatePlayedCards, user: user, round: round, loading: false})
      })
    })

  }, [])

  function updatePlayedCards(playedCardId) {
    setState({ 
      ...state, 
      user: {
          ...state.user,
          played_card_ids: state.user.played_card_ids?.concat(playedCardId)
      } 
    })
  }

  if (state.loading) {
    return <></>
  }

  if (jwt_decode(authToken).exp < moment().unix()) {
    store.set('auth_token', null)
    return <Redirect to={`/`} />
  }

  if (Object.keys(state.user).length > 0) {
    
    return (
      <DashboardContext.Provider value={state}>
        <Fade in={true}>
          <MenuDrawer />
          <Grid
          minH={`100vh`}
          bg={`blue.900`}
          style={gridStyle}
        >
          <Container>
          <Box style={{margin: "2.5rem auto 0 auto", textAlign: "center"}}>
            <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Legends Logo" height={`150px`}style={{margin: "0 auto"}}/>
            <Text mt={3} mb={3} color="white" style={{width: "100%",fontWeight: "500"}}>Pick 3 out of 5 correct each round to earn a streak. Redeem streaks for legendary rewards like free beer for a year, 2022 tickets & more</Text>
            <SvgWidget userId={state.user.id} round={state.round} width={`266`} height={`214`}/>
          </Box>
          </Container>
          <Container>
            <RoundCard />
          </Container>
          <StatsContainer />
          <LeaderboardContainer />
          <Container style={{background: "rgb(17, 30, 75)"}}>
            <CallToActionWidget type={`partner_link`} buttonText={`Join Now`}/>
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
