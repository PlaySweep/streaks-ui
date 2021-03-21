import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Grid,
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
  Badge,
  Text,
  VStack
} from '@chakra-ui/react';

import PrizeContainer from './PrizeContainer'
import PopupWidget from './PopupWidget'

import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

import { DashboardContext } from './DashboardContainer';

const ordinal = require('ordinal');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
}

const cardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative",
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function StatsContainer({history}) {
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const context = useContext(DashboardContext)
  
  if (isDesktop) {
    return (
      <DashboardContext.Consumer>
        {({user, round}) => (
          <>
            <Box style={{padding: "0 3rem", width: "700px"}}>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} style={{position: "relative", display: "flex", alignItems: "center"}}>
              <Heading color="white" size="lg" style={{fontWeight: "800"}}>My Stats</Heading>
              <PopupWidget type={`share`} buttonText={`Share with friends`} textSize={`sm`} />
            </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5}>
                <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#DD6937" size="xs" style={{textTransform: "uppercase"}}>Streak</Heading>
                  <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.streak_score}</Heading>
                  <Text color="#398FD6" fontSize="sm">{user.streak_score === 1 ? `round` : `rounds`}</Text>
                  </VStack>
                </Box>
                <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#DD6937" size="xs" style={{textTransform: "uppercase"}}>Points</Heading>
                  <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.points_score}</Heading>
                  <Text color="#398FD6" fontSize="sm">{user.points_rank === 0 ? `unranked` : `${ordinal(user.points_rank)} place`}</Text>
                  </VStack>
                </Box>
              </Grid>
              <Button mt={5} size={`md`} variant="outline" style={buttonStyle} isFullWidth onClick={() => history.push(`/prizing`)}>
                <Text color="white" fontSize={`xs`} >Cash Out For Prizes</Text>
              </Button>
              <PopupWidget type={`order`} buttonText={`Bonus Drizly Point`} buttonSize={`md`} textSize={`xs`} />
            </Box>
          </>
        )}
      </DashboardContext.Consumer>
    )
  }

  return (
    <DashboardContext.Consumer>
      {({user, round}) => (
        <Box mt={7} bg={`rgb(17, 30, 75)`}>
          <Box p={5}>
            <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>My Stats</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5}>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#DD6937" size="xs" style={{textTransform: "uppercase"}}>Streak</Heading>
                <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.streak_score}</Heading>
                <Text color="#398FD6" fontSize="xs">{user.streak_score === 1 ? `round` : `rounds`}</Text>
                </VStack>
              </Box>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#DD6937" size="xs" style={{textTransform: "uppercase"}}>Points</Heading>
                <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.points_score}</Heading>
                <Text color="#398FD6" fontSize="sm">{user.points_rank === 0 ? `unranked` : `${ordinal(user.points_rank)} place`}</Text>
                </VStack>
              </Box>
            </Grid>
            <Button mt={5} size={`md`} variant="outline" style={buttonStyle} isFullWidth onClick={() => history.push(`/prizing`)}>
              <Text color="white" fontSize={`xs`} >Cash Out For Prizes</Text>
            </Button>
            <PopupWidget type={`order`} buttonText={`Bonus Drizly Point`} buttonSize={`md`} textSize={`xs`} />
          </Box>
        </Box>
      )}
    </DashboardContext.Consumer>
  )
}

export default withRouter(StatsContainer);