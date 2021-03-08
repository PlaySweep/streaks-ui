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
  Text
} from '@chakra-ui/react';

import PicksContainer from './PicksContainer'
import PreviousResultsContainer from './PreviousResultsContainer';

import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

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
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function RoundCard() {
  const [state, setState] = useState({})
  useEffect(() => {
    
  })
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
            { user.played_card_ids.includes(round.id) ? <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaCheckCircle style={{color: "green", display: "inline-flex"}}/> Picks have been selected</Text> : <Text color="white" fontSize="sm" mt={3} mb={3} style={{textAlign: "center"}} ><FaInfoCircle style={{color: "#DD6937", display: "inline-flex"}}/> Select your picks by {moment(round.start_time).tz('America/New_York').format('M/DD h:mm z')}</Text>}
            <PicksContainer />
            { user.played_card_ids.length >= 1 ? <PreviousResultsContainer /> : null }
            </Box>
          </Box>
        </Box>
      )}
    </DashboardContext.Consumer>
  );
}

export default RoundCard;