import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Container,
  GridItem,
  Image,
  Tag,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Grid,
  Wrap,
  WrapItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Input,
  InputGroup,
  InputRighElement,
  Box,
  Badge,
  Text,
  VStack
} from '@chakra-ui/react';

import PopupWidget from './PopupWidget'
import SvgWidget from './SvgWidget'

import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FiShare } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

import { DashboardContext } from './DashboardContainer';

import axios from 'axios';

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
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
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

function PreviousResultsContainer() {
  let authToken = store.get('auth_token')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState({loading: true, selected_index: 0})
  const contextValue = useContext(DashboardContext)
    const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })

  useEffect(() => {
    apiUrl.get(`v1/users/${contextValue.user.id}/cards`).then((response) => {
      const played_cards = response.data.cards
      setState({...state, loading: false, played_cards: played_cards})
    })
  }, [])

  if (state.loading) {
    return <div>Loading</div>
  }
  
  return (
    <DashboardContext.Consumer>
      {({user, round}) => (
        <>  
        <Text color="white" fontSize="xs" mt={3} style={{textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>Review previous rounds</Text>
        <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen} isFullHeight={false} size={`md`}>
          <DrawerOverlay>
            <DrawerContent style={drawerContentStyle} >
              <DrawerCloseButton color={"#fff"}/>
              <DrawerBody>
              <Container mb={5}>
                <Grid h="auto" templateColumns="repeat(6, 1fr)" gap={4}>
                  <GridItem colSpan={6} style={{margin: "0 auto", textAlign: "center"}}>
                    <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Legends Logo" height={`25px`} style={{margin: "0 auto"}}/>
                    <Heading mt={3} color="white" size="lg" style={{textTransform: "uppercase", fontWeight: "800"}}>Previous Rounds</Heading>
                    <Box style={{margin: "1rem auto 0 auto", textAlign: "center"}}>
                      <SvgWidget userId={user.id} round={round} width={`232`} height={`180`}/>
                    </Box>
                  </GridItem>
                </Grid>
                <Tabs isLazy colorScheme={`white`} size={`sm`} onChange={(index) => setState({...state, selected_index: index})}>
                  <TabList style={{border: "none"}}>
                    { state.played_cards?.map((card, index) => <Tab key={index} style={state.selected_index === index ? { color: "rgba(255, 255, 255, 1)", borderColor: "#DD6937", textTransform: "uppercase", fontWeight: "700", fontSize: "0.75rem" } : {color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700", fontSize: "0.75rem"}}>{card.round?.name}</Tab> )}
                  </TabList>
                  
                  <TabPanels>
                    { state.played_cards?.map((card) => {
                      return (
                        <TabPanel key={card.id}>
                            <Box mb={10} style={{display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"}}>
                              <Heading color="#398FD6" size="md" style={{textTransform: "uppercase", fontWeight: "800"}}><FaCheckCircle style={{ borderRadius: "50px", border: "2px solid #90D5FB", boxShadow: "0 0 5px #90d5fb", color: "#398FD6", display: "inline-flex", marginRight: "10px"}}/> {card.score} out of 5 correct</Heading>
                            </Box>
                          { card.round?.matchups?.map((matchup) => {
                            return (
                            <Grid
                              key={matchup.id}
                              h="auto"
                              templateColumns="repeat(6, 1fr)"
                              gap={3}
                            >
                              <GridItem colSpan={0.5} >
                                <Tag size={`sm`} variant="solid" color={`rgb(17, 30, 75)`} bg="#398FD6" style={{borderRadius: "25px", textAlign: "center", top: "3px", fontWeight: "800"}}>
                                  {matchup.order}
                                </Tag>
                              </GridItem>
                              <GridItem colSpan={5} >
                                <Text color={`#fff`} mb={2} fontSize={`sm`}>{matchup.description}</Text>
                                <Wrap>
                                  { matchup.selections.map((selection) => {
                                    return (
                                      <WrapItem key={selection.id} style={{flex: "1"}}>
                                        <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`sm`} variant="outline" mb={5} style={selection.selected ? selectedButtonStyle : secondaryButtonStyle} isFullWidth>
                                          <Text color="white" style={{fontSize: "0.5rem"}}>{selection.description}</Text>
                                        </Button>
                                      </WrapItem>
                                    )
                                  })}
                                </Wrap>
                              </GridItem>
                            </Grid>
                            )
                          })}
                        </TabPanel>
                      )
                    })}
                  </TabPanels>
                </Tabs>
              
                <Box mt={10}>
                  <PopupWidget type={`share`} />
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

export default PreviousResultsContainer;