import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Badge,
  Text,
  Tag,
  VStack,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Wrap,
  WrapItem,
  Spinner,
  Image,
  Link
} from '@chakra-ui/react';
import { useDisclosure, createStandaloneToast } from "@chakra-ui/react";

import PopupWidget from './PopupWidget'

import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { FiLock, FiUnlock, FiInfo, FiCheckCircle } from "react-icons/fi";

import moment from "moment";
import Countdown from "react-countdown";
import axios from 'axios';

import { DashboardContext } from './DashboardContainer';
import MatchupShow from './MatchupShow';
import LoadingWidget from './LoadingWidget';

import Confetti from "react-confetti";

const store = require('store');

const primaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase"
}

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "1px solid #90D5FB",
  textTransform: "uppercase",
  background: "rgb(17, 30, 75)"
}

const selectedButtonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase",
  backgroundColor: "#0D40A0"
}

const cardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/stars_bg.png")`
}

function PicksContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState({
    selections: [], 
    submitting: false, 
    complete: false, 
    finished: false,
    applied: false, 
    locked: false, 
    drizly_order_id: ""
  })
  const contextValue = useContext(DashboardContext)

  let authToken = store.get('auth_token')
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })

  function handleOnChange(e) {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  function handleOrderConfirmation() {
    const toast = createStandaloneToast()
    toast({
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      render: () => (
        <Box color="white" p={3} bg="rgb(57, 143, 214)" style={{borderRadius: "25px"}}>
          <Text fontSize={`xs`} style={{textAlign: "center"}}><FaCheckCircle style={{color: "white", display: "inline-flex"}}/> Thanks! We're confirming your order now.</Text>
        </Box>
      ),
    })
    setState({...state, applied: true, drizly_order_id: ""})
  }

  function handleAddPick(selectionObj) {
    let newSelectionSet = state.selections.filter(s => s.matchup_id !== selectionObj.matchup_id)
      setState({
        ...state,
        selections: [
          ...newSelectionSet, selectionObj
        ]
      })
  }

  function handleSubmitPicks() {
    setState({...state, submitting: true})
    state.selections.forEach((selection, index) => {
      apiUrl.post(`v1/users/${contextValue.user.id}/picks`, {
        user_id: contextValue.user.id,
        matchup_id: selection.matchup_id,
        selection_id: selection.selected_id
      }).then((response) => {
        console.log("✅ Pick Success!")
        if (state.selections.length === index + 1) {
          apiUrl.post(`v1/users/${contextValue.user.id}/cards`, {
            user_id: contextValue.user.id,
            round_id: contextValue.round.id
          }).then((response) => {
            console.log("✅ Round Successfully Played!")
            contextValue.updatePlayedCards(response.data.card)
            setTimeout(() => {
              setState({...state, locked: true, complete: true})
            }, 1500);
            setTimeout(() => {
              setState({...state, submitting: false, complete: false, finished: true})
            }, 1500)
          }).catch((error) => {
            console.log("❌ Something went wrong with your round.")
          })
        }
      }).catch((error) => {
        console.log("❌ Something went wrong with your picks.")
      })
    })
  }

  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    let timesRunningOut = false
  
    if (days === 0 && hours === 0) {
      if (minutes < 30) {
        timesRunningOut = true
      }
    }
    if (completed) {
      return <></>;
    } else {
      return (
        <Box color={timesRunningOut ? `#DD6937` : `#90D5FB`} fontSize="sm" style={{ textTransform: "uppercase", textAlign: "center", fontWeight: "700", margin: "1rem auto 0 auto" }}>
          <p style={{margin: "0 auto", width: "200px"}}>
          <span style={{marginRight: "5px"}}>Time Left</span> 
          {days < 10 ? ` 0${days}` : ` ${days}`} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </Box>
      )
    }
  }
  
  return (
    <DashboardContext.Consumer>
      {({user, round})=> (
        <>
        <Button size={`md`} variant="outline" style={buttonStyle} isFullWidth onClick={onOpen}>
          { user.played_cards?.find(card => card.round.id === round.id) ? <Text color="white" fontSize={`xs`}>Update my picks</Text> : <Text color="white" fontSize={`xs`}>Select my picks</Text>}
        </Button>
        <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen} isFullHeight={false} size={`md`} >
          <DrawerOverlay>
            <DrawerContent style={drawerContentStyle}>
              <DrawerCloseButton color={"#fff"}/>
              <DrawerBody>
              { state.finished ? <Confetti
                height={`800px`}
                recycle={false}
                numberOfPieces={250}
                gravity={0.15}
                colors={[
                  "rgb(6, 17, 72)",
                  "rgb(0, 39, 145)",
                  "rgb(0, 161, 225)",
                  "rgb(255, 255, 255)",
                ]}
              /> : null }
              <Container mb={5}>
              <Grid h="auto" templateColumns="repeat(6, 1fr)" gap={4}>
                <GridItem colSpan={6} style={{margin: "0 auto"}}>
                  <Image src="https://streaks-challenge.s3.amazonaws.com/legends_logo.png" alt="Legends Logo" height={`175px`} style={{margin: "0 auto"}}/>
                  <Box style={{position: "relative", bottom: "35px"}}>
                  <Button size={`md`} variant="outline" style={{ border: "2.5px solid #90D5FB", boxShadow: "0 0 5px #90d5fb", textTransform: "uppercase", borderRadius: "50px"}} isFullWidth>
                    <Text color="white" fontSize={`sm`}>{round.name}</Text>
                  </Button>
                    <Countdown
                      date={moment(round.start_time)._d}
                      renderer={renderCountdown}
                    />
                  </Box>
                </GridItem>
              </Grid>
              { round.matchups.map((matchup) => {
                return <MatchupShow key={matchup.id} {...matchup} addPickFunc={handleAddPick} disabled={state.locked || user.played_cards?.find(card => card.round.id === round.id)}/>
              })}
              <Grid templateColumns="repeat(6, 1fr)" mt={5} style={{display: "flex", alignItems: "center"}}>
                <GridItem colSpan={1} p={2}>
                  <Image src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly Logo" height={`25px`}/>
                </GridItem>
                <GridItem colSpan={4} >
                  <Heading color="white" size="sm" style={{fontWeight: "800"}}>Redeem Drizly Bonus Point</Heading>
                </GridItem>
                <GridItem colSpan={1} >
                  <PopupWidget type={`order_info`}/>
                </GridItem>
              </Grid>
              <InputGroup size="md" style={{zIndex: "0"}}>
                <Input
                  pr="4.5rem"
                  variant="filled"
                  name="drizly_order_id"
                  style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}}
                  placeholder="Enter Drizly Order ID"
                  value={state.drizly_order_id}
                  onChange={handleOnChange}
                />
                <InputRightElement width="4.5rem">
                  <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mr={2} style={primaryButtonStyle} isFullWidth h="1.75rem" size="sm" onClick={handleOrderConfirmation}>
                    <Text color="white" style={{fontSize: "0.5rem"}}>{state.applied ? "Applied!" : "Apply"}</Text>
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box mt={10} >
                <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={state.locked || user.played_cards?.find(card => card.round.id === round.id) ? null : handleSubmitPicks} >
                  { user.played_cards?.find(card => card.round.id === round.id) || state.locked ? <FiLock color="white" style={{marginRight: "5px"}}/> : <FiUnlock color="white" style={{marginRight: "5px"}}/> }
                  { user.played_cards?.find(card => card.round.id === round.id) || state.locked ? <Text color="white">Unlock my picks</Text> : <Text color="white">Lock in my picks</Text> }
                </Button>
              </Box>
              </Container>
              { state.submitting ? 
              <LoadingWidget>
                { state.complete ? <FaCheckCircle color={`rgba(255, 255, 255)`} style={{fontSize: "2rem"}}/> : <Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} /> }
              </LoadingWidget> : null }
              { state.finished ? 
              <Modal isCentered isOpen={state.finished} onClose={() => setState({...state, finished: false})}>
              <ModalOverlay />
                <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
                  <ModalHeader style={{textAlign: "center", color: "#fff"}}>Your picks are in!</ModalHeader>
                  <ModalCloseButton color={`rgb(17, 30, 75)`}/>
                  <ModalBody >
                    <Box pt={3} pb={3}>
                      <VStack>
                        <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/swish.gif" alt="Swish"/>
                        <Text color="white" size="lg" style={{textAlign: "center"}}>You deserve a cold one</Text>
                        <Button size={`md`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={onOpen}>
                          <Link color="white" fontSize={`xs`} href="https://www.drizly.com" isExternal>
                            Order beer on Drizly
                          </Link>
                        </Button>
                      </VStack>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal> : null }
              </DrawerBody>
            </DrawerContent>
          
          </DrawerOverlay>
        </Drawer>
        </>
      )}
    </DashboardContext.Consumer>
  );
}

export default PicksContainer;