import React, { useState } from 'react';
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
  Wrap,
  WrapItem,
  Image
} from '@chakra-ui/react';
import { useDisclosure, createStandaloneToast } from "@chakra-ui/react";

import PopupWidget from './PopupWidget'

import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { FiLock, FiUnlock, FiInfo } from "react-icons/fi";

import moment from "moment";
import Countdown from "react-countdown";

import { DashboardContext } from './DashboardContainer';

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
  const [applied, setApplied] = useState(false)
  const [locked, setLocked] = useState(false)

  const events = [
    {
      id: 1, order: 1, description: "Who will win?", options: [{id: 1, order: 1, description: "UNC"}, {id: 2, order: 2, description: "Duke"}]
    },
    { 
      id: 2, order: 2, description: "OSU win vs University of Michigan win", options: [{id: 3, order: 1, description: "OSU win"}, {id: 4, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 3, order: 3, description: "OSU win vs University of Michigan win", options: [{id: 5, order: 1, description: "OSU win"}, {id: 6, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 4, order: 4, description: "OSU win vs University of Michigan win", options: [{id: 7, order: 1, description: "OSU win"}, {id: 8, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 5, order: 5, description: "OSU win vs University of Michigan win", options: [{id: 9, order: 1, description: "OSU win"}, {id: 10, order: 2, description: "U. Michigan"}]
    },
  ]

  function handleOrderConfirmation() {
    const toast = createStandaloneToast()
    toast({
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      render: () => (
        <Box color="white" p={3} bg="rgb(57, 143, 214)" style={{borderRadius: "25px"}}>
          <Text fontSize={`xs`} style={{textAlign: "center"}}><FaCheckCircle style={{color: "white", display: "inline-flex"}}/> Thanks! We're processing your order now.</Text>
        </Box>
      ),
    })
    setApplied(true)
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
          
          { user.played_card_ids.includes(round.id) ? <Text color="white" fontSize={`xs`}>Update my picks</Text> : <Text color="white" fontSize={`xs`}>Select my picks</Text>}
        </Button>
        <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent style={drawerContentStyle}>
              <DrawerCloseButton color={"#fff"}/>
              <DrawerBody>
              <Container mb={5}>
              <Grid h="auto" templateColumns="repeat(6, 1fr)" gap={4}>
                <GridItem colSpan={6} style={{margin: "0 auto"}}>
                  <Image src="https://streaks-challenge.s3.amazonaws.com/legends_logo.png" alt="Legends Logo" height={`175px`} style={{margin: "0 auto"}}/>
                  <Box style={{position: "relative", bottom: "35px"}}>
                  <Button size={`md`} variant="outline" style={{ border: "2.5px solid #90D5FB", boxShadow: "0 0 5px #90d5fb", textTransform: "uppercase", borderRadius: "50px"}} isFullWidth>
                    <Text color="white" fontSize={`sm`}>5th Round</Text>
                  </Button>
                    <Countdown
                      date={moment().add(30, 'minutes').add(5, 'seconds')._d}
                      renderer={renderCountdown}
                    />
            
                  </Box>
                </GridItem>
              </Grid>
              { events.map((round) => {
                return (
                  <Grid
                    key={round.id}
                    h="auto"
                    templateColumns="repeat(6, 1fr)"
                    gap={3}
                  >
                    <GridItem colSpan={0.5} >
                      <Tag size={`sm`} variant="solid" color={`rgb(17, 30, 75)`} bg="#398FD6" style={{borderRadius: "25px", textAlign: "center", top: "3px", fontWeight: "800"}}>
                        {round.order}
                      </Tag>
                    </GridItem>
                    <GridItem colSpan={5} >
                      <Text color={`#fff`} mb={2} fontSize={`sm`}>{round.description}</Text>
                      <Wrap>
                        { round.options.map((option) => {
                          return (
                            <WrapItem key={option.id} style={{flex: "1"}}>
                              <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mb={5} style={secondaryButtonStyle} isFullWidth>
                                <Text color="white" fontSize={`xs`}>{option.description}</Text>
                              </Button>
                            </WrapItem>
                          )
                        })}
                      </Wrap>
                    </GridItem>
                  </Grid>
                )
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
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  variant="filled" 
                  style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}}
                  placeholder="Enter Drizly Order ID"
                />
                <InputRightElement width="4.5rem">
                  <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mr={2} style={primaryButtonStyle} isFullWidth h="1.75rem" size="sm" onClick={handleOrderConfirmation}>
                    <Text color="white" style={{fontSize: "0.5rem"}}>{applied ? "Applied!" : "Apply"}</Text>
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box mt={10}>
                <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" style={primaryButtonStyle} isFullWidth>
                  { locked ? <FiLock color="white" style={{marginRight: "5px"}}/> : <FiUnlock color="white" style={{marginRight: "5px"}}/> }
                  <Text color="white">Lock In My Picks</Text>
                </Button>
              </Box>
              </Container>
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