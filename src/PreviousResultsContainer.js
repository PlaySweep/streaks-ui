import React, { useState } from 'react';
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected_index, setSelectedIndex] = useState(0)

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

  const events2 = [
    {
      id: 1, order: 1, description: "Who will lose the game?", options: [{id: 1, order: 1, description: "UNC"}, {id: 2, order: 2, description: "Duke"}]
    },
    { 
      id: 2, order: 2, description: "OSU win vs University of Michigan win", options: [{id: 3, order: 1, description: "OSU win"}, {id: 4, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 3, order: 3, description: "Will Baylor score more than 35 points?", options: [{id: 5, order: 1, description: "OSU win"}, {id: 6, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 4, order: 4, description: "OSU win vs University of Michigan win", options: [{id: 7, order: 1, description: "OSU win"}, {id: 8, order: 2, description: "U. Michigan"}]
    },
    { 
      id: 5, order: 5, description: "OSU win vs University of Michigan win", options: [{id: 9, order: 1, description: "OSU win"}, {id: 10, order: 2, description: "U. Michigan"}]
    },
  ]

  const rounds = [{id: 1, name: "1st", events: events}, {id: 2, name: "2nd", events: events2}]
  
  return (
    <>
    <Text color="white" fontSize="xs" mt={3} style={{textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>Review previous rounds</Text>
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
          <Container mb={5}>
            <Grid h="auto" templateColumns="repeat(6, 1fr)" gap={4}>
              <GridItem colSpan={6} style={{margin: "0 auto", textAlign: "center"}}>
                <Image src="https://streaks-challenge.s3.amazonaws.com/bud_light_logo.png" alt="Legends Logo" height={`25px`} style={{margin: "0 auto"}}/>
                <Heading mt={3} color="white" size="lg" style={{textTransform: "uppercase", fontWeight: "800"}}>Previous Rounds</Heading>
                <Box style={{margin: "1rem auto 0 auto", textAlign: "center"}}>
                  <SvgWidget width={`232`} height={`180`}/>
                </Box>
              </GridItem>
            </Grid>
            <Tabs isLazy colorScheme={`white`} size={`sm`} onChange={(index) => setSelectedIndex(index)}>
              <TabList style={{border: "none"}}>
                { rounds.map((round, index) => <Tab key={index} style={selected_index === index ? { color: "rgba(255, 255, 255, 1)", borderColor: "#DD6937", textTransform: "uppercase", fontWeight: "700", fontSize: "0.75rem" } : {color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700", fontSize: "0.75rem"}}>{round.name}</Tab> )}
              </TabList>
              <Box mt={5} mb={5} style={{display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"}}>
                <Heading color="#398FD6" size="md" style={{textTransform: "uppercase", fontWeight: "800"}}><FaCheckCircle style={{ borderRadius: "50px", border: "2px solid #90D5FB", boxShadow: "0 0 5px #90d5fb", color: "#398FD6", display: "inline-flex", marginRight: "10px"}}/> 5 out of 5 correct</Heading>
              </Box>
              <TabPanels>
                { rounds.map((round) => {
                  return (
                    <TabPanel key={round.id}>
                    { round.events.map((event) => {
                      return (
                          <Grid
                          key={event.id}
                          h="auto"
                          templateColumns="repeat(6, 1fr)"
                          gap={3}
                        >
                          <GridItem colSpan={0.5} >
                            <Tag size={`sm`} variant="solid" color={`rgb(17, 30, 75)`} bg="#398FD6" style={{borderRadius: "25px", textAlign: "center", top: "3px", fontWeight: "800"}}>
                              {event.order}
                            </Tag>
                          </GridItem>
                          <GridItem colSpan={5} >
                            <Text color={`#fff`} mb={2} fontSize={`sm`}>{event.description}</Text>
                            <Wrap>
                              { event.options.map((option) => {
                                return (
                                  <WrapItem key={option.id} style={{flex: "1"}}>
                                    <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`sm`} variant="outline" mb={5} style={secondaryButtonStyle} isFullWidth>
                                      <Text color="white" style={{fontSize: "0.5rem"}}>{option.description}</Text>
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
  );
}

export default PreviousResultsContainer;