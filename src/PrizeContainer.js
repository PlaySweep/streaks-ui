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
import CashOutDrawer from './CashOutDrawer'

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
  let authToken = store.get('auth_token')
  const [state, setState] = useState({
    loading: true, 
    filter: 2, 
    selectedRewardIndex: 0,
    selectedPrizeIndex: 0
  })
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })

  useEffect(() => {
    let decoded_user = jwt_decode(authToken)
    apiUrl.get(`v1/prizes`).then((response) => {
      const rewards = [{ title: "Perfect Streaks (6 Streaks)", description: "Year’s Worth of Free Beer", image_url: "https://streaks-challenge.s3.amazonaws.com/prizes/beer_case.png" }, { title: "Highest Points", description: "2022 March Hoops Experience", image_url: "https://streaks-challenge.s3.amazonaws.com/prizes/basketball_logo.png" }]
      setState({...state, loading: false, apiUrl: apiUrl, user: decoded_user, prizes: response.data.prizes, rewards: rewards})
    })
  }, [])

  function handleFilter(e) {
    const selectedFilter = e.target.dataset.tag
    setState({...state, filter: parseInt(selectedFilter), selectedPrizeIndex: 0})
  }

  function handleRewardSwipe(currentIndex) {
    console.log({currentIndex})
    setState({...state, selectedRewardIndex: currentIndex})
  }

  function handlePrizeSwipe(currentIndex) {
    setState({...state, selectedPrizeIndex: currentIndex})
  }

  const styles = {
    slide: {
      width: "98%",
      minHeight: 100,
      color: '#fff',
    }
  };

  const selectedFilterStyles = { color: "#fff", border: "1px solid #398FD6", background: "#0D40A0", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem" }
  const filterStyles = { color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "700", fontSize: "0.5rem", height: "10px", padding: "0.5rem 0.5rem", margin: "0 0.25rem" }
  const filteredPrizes = state.prizes?.filter(prize => prize.level === state.filter)

  if (state.loading) {
    return <LoadingWidget><Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} /></LoadingWidget>
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
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Cash out your streaks to win awesome Bud Light merch and other prizes.</Text>
          </Box>
        </Container>
        
        <Box p={5} >
          <Heading mt={2} mb={2} color="white" size="md" style={{fontWeight: "800"}}>Top Prizes</Heading>
            <SwipeableViews enableMouseEvents style={styles.root} slideStyle={styles.slideContainer} onChangeIndex={handleRewardSwipe}>
              { state?.rewards?.map((reward, index) => {
                return (
                  <div key={index} style={Object.assign({}, styles.slide)}>
                    <Box w="100%" style={{borderRadius: "12px"}} style={{background: "rgba(17, 30, 75, 0.75)"}} pt={3} pb={3}>
                      <VStack>
                        <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>{reward.title}</Heading>
                        <Image height={`75px`} width={`auto`} src={reward.image_url} />
                        
                        <Text color="#fff" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>{reward.description}</Text>
                      </VStack>
                    </Box>
                  </div>
                )
              }) }
            </SwipeableViews>
            <Dots selectedIndex={state.selectedRewardIndex} dotCount={state.rewards?.length} />
        </Box>
        <Box p={5} >
          <Heading color="white" size="md" style={{fontWeight: "800"}}>Redeem Your Streak</Heading>
            <Box mt={2} mb={5} >
              <Text color="white" fontSize={`xs`} style={{display: "inline-block", marginRight: "10px", fontWeight: "700"}}>Select Streak</Text>
              <Tag data-tag={2} style={state.filter === 2 ? selectedFilterStyles : filterStyles} onClick={handleFilter}>2</Tag>
              <Tag data-tag={3} style={state.filter === 3 ? selectedFilterStyles : filterStyles} onClick={handleFilter}>3</Tag>
              <Tag data-tag={4} style={state.filter === 4 ? selectedFilterStyles : filterStyles} onClick={handleFilter}>4</Tag>
              <Tag data-tag={5} style={state.filter === 5 ? selectedFilterStyles : filterStyles} onClick={handleFilter}>5</Tag>
            </Box>
            <SwipeableViews enableMouseEvents style={styles.root} slideStyle={styles.slideContainer} onChangeIndex={handlePrizeSwipe}>
              { filteredPrizes.map((prize, index) => {
                return (
                  <div key={index} style={Object.assign({}, styles.slide)}>
                    <Box w="100%" style={{borderRadius: "12px"}} style={{background: "rgba(17, 30, 75, 0.75)"}} pt={3} pb={3}>
                      <VStack>
                        <Image src={prize.image_url} alt="Highest Streak" height={`75px`} width={`auto`}/>
                        <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>{prize.name}</Heading>
                        {/* <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>{reward.description}</Text> */}
                      <CashOutDrawer />
                      </VStack>
                    </Box>
                  </div>
                )
              }) }
            </SwipeableViews>
            <Dots selectedIndex={state.selectedPrizeIndex} dotCount={filteredPrizes.length} />
        </Box>
        <Container style={{background: "rgb(17, 30, 75)"}}>
        <Box p={5}>
          <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Can't wait?</Heading>
          <Button mt={5} size={`lg`} variant="outline" style={buttonStyle} isFullWidth>
            <Link color="white" fontSize={`sm`} href="https://shopbeergear.com/collections/bud-light" isExternal>
              Shop Merch Now
            </Link>
          </Button>
          <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mt={2.5} style={secondaryButtonStyle} isFullWidth>
            <Link color="white" fontSize={`sm`} href="https://drizly.com/beer-brands/bud-light/b1019 " isExternal>
              Order on Drizly
            </Link>
          </Button>
          <Text mt={10} mb={5} color="white" fontSize={`md`} style={{textAlign: "center", textDecoration: "underline", textTransform: "uppercase"}} onClick={() => history.push(`/dashboard`)}>Return to Dashboard</Text>
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
