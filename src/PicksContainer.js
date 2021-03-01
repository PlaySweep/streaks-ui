import React from 'react';
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
  InputLeftElement,
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
import { CalendarIcon } from '@chakra-ui/icons';
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
          <Container>
          <Container>
            <Image src="https://streaks-challenge.s3.amazonaws.com/legends_logo.png" alt="Legends Logo" />
            <Box style={{position: "relative", bottom: "65px"}}>
              <Button size={`lg`} variant="outline" style={primaryButtonStyle} isFullWidth>
                <Text color="white">1st Round</Text>
              </Button>
              <Text color="#90D5FB" fontSize="md" mt={3} style={{textTransform: "uppercase", textAlign: "center", fontWeight: "700"}}>Time Left <span style={{marginLeft: "5px"}}>04 : 10 : 33 : 45</span></Text>
            </Box>
          </Container>
          { events.map((round) => {
            return (
              <Grid
                key={round.id}
                h="auto"
                templateColumns="repeat(6, 1fr)"
                gap={4}
              >
                <GridItem colSpan={1} >
                  <Tag size={`sm`} variant="solid" color={`rgb(17, 30, 75)`} bg="#398FD6" style={{borderRadius: "25px", textAlign: "center", top: "3px", fontWeight: "800"}}>
                    {round.order}
                  </Tag>
                </GridItem>
                <GridItem colSpan={5} >
                  <Text color={`#fff`} mb={2} fontSize={`sm`}>{round.description}</Text>
                  <Wrap>
                    { round.options.map((option) => {
                      return (
                        <WrapItem style={{flex: "auto"}}>
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
          </Container>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  );
}

export default PicksContainer;