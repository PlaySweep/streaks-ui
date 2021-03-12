import React from 'react';
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

import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

import { DashboardContext } from './DashboardContainer'

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
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function StatsContainer({history}) {
  
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
              <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.streak}</Heading>
              <Text color="#398FD6" fontSize="xs">{user.streak > 1 ? `rounds` : `round`}</Text>
              </VStack>
            </Box>
            <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
              <VStack>
              <Heading color="#DD6937" size="xs" style={{textTransform: "uppercase"}}>Rank</Heading>
              <Heading color="white" size="xl" style={{fontWeight: "900"}}>{user.streak_rank}</Heading>
              <Text color="#398FD6" fontSize="xs">{user.points} {user.points === 1 ? `pt` : `pts`}</Text>
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