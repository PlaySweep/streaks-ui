import React from 'react';
import {
  Container,
  Grid,
  VStack,
  Text,
  Box,
  Image,
  Heading
} from '@chakra-ui/react';

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/mobile_bg.png")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  backgroundSize: "contain",
  justifyContent: "center"
}

function DashboardContainer() {
  
  return (
    <>
      <MenuDrawer />
      <Grid
      minH={`100vh`}
      bg={`blue.900`}
      style={gridStyle}
    >
      
      <Container>
      <Box style={{margin: "2.5rem auto 0 auto", textAlign: "center"}}>
        <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_legends_logo.png" alt="Legends Logo" height={`150px`}style={{margin: "0 auto"}}/>
        <Text mt={3} mb={3} color="white" style={{width: "100%",fontWeight: "500"}}>Pick 3 out of 5 correct each round to earn a streak. Redeem streaks for legendary rewards like free beer for a year, 2022 Final Four tickets & more.</Text>
        <SvgWidget width={`266`} height={`214`}/>
      </Box>
      </Container>
      <Container>
        <RoundCard />
      </Container>
      <StatsContainer />
      <LeaderboardContainer />
      <Container style={{background: "rgb(17, 30, 75)"}}>
        <CallToActionWidget />
      </Container>
    </Grid>
    </>
  );
}

export default DashboardContainer;
