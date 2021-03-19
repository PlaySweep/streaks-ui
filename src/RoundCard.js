import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
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
  SimpleGrid
} from '@chakra-ui/react';

import PicksContainer from './PicksContainer'
import PreviousResultsContainer from './PreviousResultsContainer';
import SvgWidget from './SvgWidget';

import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";

import moment from 'moment-timezone';

import { DashboardContext } from './DashboardContainer'

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
  margin: "0 auto"
}

const desktopCardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative",
  maxWidth: "550px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "32.5vh",
  padding: "0 3rem"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0",
}

function RoundCard() {
  const [state, setState] = useState({})
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const contextValue = useContext(DashboardContext)

  const current_card_for_round = contextValue.user.played_cards?.find(card => card.round.id === contextValue.round.id)
  const played = current_card_for_round
  const unplayed = !current_card_for_round
  const started = contextValue.round.status === "started"

  if (isDesktop) {
    return (
    <DashboardContext.Consumer>
    
      {({user, round}) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" style={desktopCardStyle}>
          <Box >
          <Badge borderRadius="full" px="2" bg="#DD6937" color="white" style={{padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "1", "position":"absolute","width":"auto","height":"24px", left: "40px", top: "0px", transform: "translate(-50%, -50%)"}}>
            { round.name }
          </Badge>
          <Box p="1">
            <Heading mt={0} style={{textAlign: "center"}} color="white" size="md">Streak Scenarios</Heading>
            { started ? <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaInfoCircle style={{color: "#DD6937", display: "inline-flex"}}/> Next round opens at {moment(round.end_time).tz('America/New_York').format('M/DD h:mma z')}</Text> : played ? <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaCheckCircle style={{color: "green", display: "inline-flex"}}/> Picks have been selected</Text> : <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaInfoCircle style={{color: "#DD6937", display: "inline-flex"}}/> Select your picks by {moment(round.start_time).tz('America/New_York').format('M/DD h:mma z')}</Text>}
            <PicksContainer />
            { user.played_cards?.filter(card => card.round.status === "complete").length > 0 ? <PreviousResultsContainer /> : null }
            
          </Box>
          </Box>
          <Box>
            <SvgWidget roundId={round.id} width={`266`} height={`214`} />
          </Box>
        </Box>
      )}
    </DashboardContext.Consumer>
    );
  }
  
  return (
    <DashboardContext.Consumer>
      {({user, round}) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" style={cardStyle}>
          <Badge borderRadius="full" px="2" bg="#DD6937" color="white" style={{padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: "1", "position":"absolute","width":"auto","height":"24px", left: "50%", transform: "translate(-50%, -50%)"}}>
            { round.name }
          </Badge>
          <Box p="6">
            <Box
              mt="1"
              fontWeight="semibold"
              lineHeight="tight"
              isTruncated
            >
            <Heading mt={0} style={{textAlign: "center"}} color="white" size="md">Streak Scenarios</Heading>
            { started ? <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaInfoCircle style={{color: "#DD6937", display: "inline-flex"}}/> Next round opens at {moment(round.end_time).tz('America/New_York').format('M/DD h:mma z')}</Text> : played ? <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaCheckCircle style={{color: "green", display: "inline-flex"}}/> Picks have been selected</Text> : <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaInfoCircle style={{color: "#DD6937", display: "inline-flex"}}/> Select your picks by {moment(round.start_time).tz('America/New_York').format('M/DD h:mma z')}</Text>}
            <PicksContainer />
            { user.played_cards?.filter(card => card.round.status === "complete").length > 0 ? <PreviousResultsContainer /> : null }
            </Box>
          </Box>
        </Box>
      )}
    </DashboardContext.Consumer>
  );
}

export default RoundCard;