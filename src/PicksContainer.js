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
import { useDisclosure } from "@chakra-ui/react";

import PopupWidget from './PopupWidget'

import { CalendarIcon } from '@chakra-ui/icons';
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { FiLock, FiUnlock, FiInfo } from "react-icons/fi";

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
  
  return (
    <>
    <Button size={`md`} variant="outline" style={buttonStyle} isFullWidth onClick={onOpen}>
      <Text color="white" fontSize={`xs`}>Update my picks</Text>
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
                <Text color="white" fontSize={`sm`}>1st Round</Text>
              </Button>
              <Text color="#90D5FB" fontSize="sm" mt={3} style={{textTransform: "uppercase", textAlign: "center", fontWeight: "700"}}>Time Left <span style={{marginLeft: "5px"}}>04 : 10 : 33 : 45</span></Text>
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
                        <WrapItem key={option.id} style={{flex: "auto"}}>
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
              <PopupWidget />
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
              <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mr={2} style={primaryButtonStyle} isFullWidth h="1.75rem" size="sm" onClick={() => setApplied(true)}>
                <Text color="white" style={{fontSize: "0.5rem"}}>{applied ? "Applied!" : "Apply"}</Text>
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box mt={10}>
            <Button size={`lg`} variant="outline" style={primaryButtonStyle} isFullWidth>
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
  );
}

export default PicksContainer;