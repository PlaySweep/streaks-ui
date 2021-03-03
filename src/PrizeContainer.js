import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Container,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Grid,
  VStack,
  Text,
  Box,
  Image,
  Heading,
  Fade,
  Spinner
} from '@chakra-ui/react';

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';

import { useDisclosure } from "@chakra-ui/react";

import { FiChevronLeft } from 'react-icons/fi';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/stars_bg.png")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  backgroundSize: "cover",
  justifyContent: "center"
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

function PrizeContainer({history}) {
  const [loading, setIsLoading] = useState(true)
  const prizes = [{ title: "Highest Streak of All Time", description: "Free Beer For A Year" }, { title: "5 out of 5", description: "Tickets to Final Four" }, { title: "5 out of 5", description: "Tickets to Final Four" }]
 
  function CarouselContainer () {
    return (
      <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5}>
        {prizes.map((d) => {
          return (
            <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
              <VStack>
              <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>{d.title}</Heading>
              <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
              <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>{d.description}</Text>
              </VStack>
            </Box>
          )
        })}
      </Grid>
    )
  }
 
  function renderCard (index, modIndex, cursor) {
    const item = prizes[modIndex]
    return <div>{item.description}</div>
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (loading) {
    return <Spinner color={`blue.900`}/>
  }

  return (
    <>
    <Fade in={true}>
    <MenuDrawer />
      <Grid
      minH={`100vh`}
      bg={`blue.900`}
      style={gridStyle}
    >
      <Box mt={5} ml={5} style={{display: "flex", alignItems: "center"}} onClick={() => history.push(`/dashboard`)}>
        <FiChevronLeft color={`white`} style={{marginRight: "2.5px"}}/>
        <Text color={`white`} fontSize={`sm`} style={{fontWeight: "600", textTransform: "uppercase", textDecoration: "underline"}}>Back</Text>
      </Box>
      <Container>
        <Box style={{width: "75%", margin: "1rem auto 0 auto", textAlign: "center"}}>
          <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>Legendary Rewards</Heading>
          <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Cash out your points and streaks to win awesome Bud Light merch and other prizes</Text>
        </Box>
      </Container>
      <Box p={5} >
        <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Top Prizes</Heading>
        <CarouselProvider
        style={{height: "30vh"}}
          totalSlides={3}
          visibleSlides={1}
          naturalSlideWidth={100}
          naturalSlideHeight={100}
        >
        <Slider>
          <Slide index={0}>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5} mr={3}>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak of All Time</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Free Beer For A Year</Text>
                </VStack>
              </Box>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize1.png" alt="Tickets" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Tickets to Final Four</Text>
                </VStack>
              </Box>
            </Grid>
          </Slide>
          <Slide index={1} >
            <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5}>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak for 1 Round</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize8.png" alt="Tickets" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Bud Light T-Shirt</Text>
                </VStack>
              </Box>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct for 1 Round</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize15.png" alt="Highest Streak" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>$5 Drizly Credit</Text>
                </VStack>
              </Box>
            </Grid>
          </Slide>
          <Slide index={2}>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5} mr={3}>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak of All Time</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Free Beer For A Year</Text>
                </VStack>
              </Box>
              <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                <VStack>
                <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct</Heading>
                <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize1.png" alt="Tickets" />
                <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Tickets to Final Four</Text>
                </VStack>
              </Box>
            </Grid>
          </Slide>
        </Slider>
        <ButtonNext style={{color: "white", fontSize: "100px"}}/>
      </CarouselProvider>
      </Box>
      <Box p={5} >
        <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Redeem Your Streak</Heading>
        <CarouselProvider
        style={{height: "30vh"}}
          totalSlides={3}
          visibleSlides={1}
          naturalSlideWidth={100}
          naturalSlideHeight={100}
        >
          <Slider>
            <Slide index={0}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5} mr={3}>
                <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak of All Time</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Free Beer For A Year</Text>
                  </VStack>
                </Box>
                <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize1.png" alt="Tickets" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Tickets to Final Four</Text>
                  </VStack>
                </Box>
              </Grid>
            </Slide>
            <Slide index={1} >
              <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5}>
                <Box p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak for 1 Round</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize8.png" alt="Tickets" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Bud Light T-Shirt</Text>
                  </VStack>
                </Box>
                <Box p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct for 1 Round</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize15.png" alt="Highest Streak" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>$5 Drizly Credit</Text>
                  </VStack>
                </Box>
              </Grid>
            </Slide>
            <Slide index={2}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={5} mr={3}>
                <Box p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>Highest Streak of All Time</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize6.png" alt="Highest Streak" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Free Beer For A Year</Text>
                  </VStack>
                </Box>
                <Box p={2} style={{borderRadius: "12px"}} bg="#102864" pt={3} pb={3}>
                  <VStack>
                  <Heading color="#fff" size="xs" style={{textAlign: "center", fontWeight: "700"}}>5 out of 5 Correct</Heading>
                  <Image boxSize="85px" src="https://streaks-challenge.s3.amazonaws.com/prizes/prize1.png" alt="Tickets" />
                  <Text color="#398FD6" fontSize="xs" style={{textTransform: "uppercase", fontWeight: "900", textAlign: "center"}}>Tickets to Final Four</Text>
                  </VStack>
                </Box>
              </Grid>
            </Slide>
          </Slider>
          <ButtonNext style={{color: "white", fontSize: "100px"}}/>
        </CarouselProvider>
        <Button mt={5} size={`md`} variant="outline" style={buttonStyle} isFullWidth>
          <Text color="white" fontSize={`xs`} >Cash Out For Prizes</Text>
        </Button>
        <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mt={2.5} style={secondaryButtonStyle} isFullWidth>
          <Text color="white" fontSize={`xs`} >Bonus Drizly Point</Text>
        </Button>
      </Box>
    </Grid>
    </Fade>
    </>
  );
}

export default withRouter(PrizeContainer);
