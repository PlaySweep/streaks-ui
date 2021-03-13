import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Container,
  Grid,
  Center,
  Text,
  Box,
  Button,
  Image,
  Heading,
  Fade,
  SimpleGrid
} from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react";

import MenuDrawer from './MenuDrawer'

import ReactPixel from 'react-snapchat-pixel';

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase"
}

function WelomeContainer({history}) {
  const [loading, setLoading] = useState(true)
  const [current_index, setCurrentIndex] = useState(0)
  const [isDesktop] = useMediaQuery("(min-width: 775px)")

  useEffect(() => {
    setTimeout(() => {
      ReactPixel.track(`SIGN_UP`)
      setLoading(false)
    }, 250)
  })

  const handleNext = () => {
    setLoading(true)
    setTimeout(() => {
      setCurrentIndex(current_index + 1)
      setLoading(false)
    }, 150)
  }

  function renderStep(current_index) {
    switch (current_index) {
      case 0:
        return stepOne
        break;
      case 1:
        return stepTwo
        break;
      case 2:
        return stepThree
        break;
      case 3:
        return stepFour
        break; 
      default:
        return stepOne
        break;
    }
  }

  function renderDesktopStep(current_index) {
    switch (current_index) {
      case 0:
        return stepOne
        break;
      case 1:
        return fullSteps
        break;
      default:
        return stepOne
        break;
    }
  }

  const stepOne = (
    <Fade in={true}>
      <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">Legendary</Heading>
      <Box style={{textAlign: "center"}}>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/checkmark_image.png" alt="Drizly" style={{margin: "1rem auto"}}/>
        <Text m={5} color="white">Your account has been created! Tap below to get started.</Text>
        { isDesktop ? <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} onClick={handleNext}>
          <Text color="white">Next</Text>
        </Button> : <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={handleNext}>
          <Text color="white">Next</Text>
        </Button> }
      </Box> 
    </Fade>
  )
  
  const stepTwo = (
    <Fade in={true}>
      <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">How to Play</Heading>
      <Box style={{textAlign: "center"}}>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/lock_pick_image.png" alt="Lock Picks" style={{margin: "1rem auto"}}/>
        <Text m={5} color="white">The day before games, choose the outcomes for your 5 Streak Scenarios.</Text>
        <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={handleNext}>
          <Text color="white">Next</Text>
        </Button>
        <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={() => setCurrentIndex(current_index - 1)}>
          <Text color="white">Back</Text>
        </Button>
      </Box> 
    </Fade>
  )
  
  const stepThree = (
    <Fade in={true}>
      <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">How to Play</Heading>
      <Box style={{textAlign: "center"}}>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/moving_basketball_image.png" alt="Basketball" style={{margin: "1rem auto"}}/>
        <Text m={5} color="white">Pick 3 out of 5 scenarios correctly to start a streak and earn points.</Text>
        <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={handleNext}>
          <Text color="white">Next</Text>
        </Button>
        <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={() => setCurrentIndex(current_index - 1)}>
          <Text color="white">Back</Text>
        </Button>
      </Box> 
    </Fade>
  )
  
  const stepFour = (
    <Fade in={true}>
      <Heading mt={0} mb={5} style={{textAlign: "center"}} color="white">How to Play</Heading>
      <Box style={{textAlign: "center"}}>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/clinking_beer_image.png" alt="Beer" style={{margin: "1rem auto"}}/>
        <Text m={5} color="white">Redeem streaks for prizes including Drizly promos and Bud Light merch.</Text>
        <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={() => history.push(`/dashboard`)}>
          <Text color="white">Let's go</Text>
        </Button>
        <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={() => setCurrentIndex(current_index - 1)}>
          <Text color="white">Back</Text>
        </Button>
      </Box> 
    </Fade>
  )

  const fullSteps = (
    <Fade in={true}>
      <SimpleGrid columns={3} spacing={12}>
      <Box style={{textAlign: "center"}}>
        <Heading color="white" style={{textAlign: "center"}}>Step: 01</Heading>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/lock_pick_image.png" alt="Lock Picks" style={{margin: "1rem auto"}}/>
        <Text m={5} style={{width: "75%", margin: "1rem auto"}} color="white">The day before games, choose the outcomes for your 5 Streak Scenarios.</Text>
      </Box> 
      <Box style={{textAlign: "center"}}>
        <Heading color="white" style={{textAlign: "center"}}>Step: 02</Heading>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/moving_basketball_image.png" alt="Basketball" style={{margin: "1rem auto"}}/>
        <Text m={5} style={{width: "75%", margin: "1rem auto"}} color="white">Pick 3 out of 5 scenarios correctly to start a streak and earn points.</Text>
      </Box> 
      <Box style={{textAlign: "center"}}>
        <Heading color="white" style={{textAlign: "center"}}>Step: 03</Heading>
        <Image boxSize="210px" src="https://streaks-challenge.s3.amazonaws.com/clinking_beer_image.png" alt="Beer" style={{margin: "1rem auto"}}/>
        <Text m={5} style={{width: "75%", margin: "1rem auto"}} color="white">Redeem streaks for prizes including Drizly promos and merch.</Text>
      </Box> 
      </SimpleGrid>
      <Box mt={10} mb={5} style={{textAlign: "center"}}>
      <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`lg`} variant="outline" mb={5} style={buttonStyle} onClick={() => history.push(`/dashboard`)}>
        <Text color="white">I'm ready to play</Text>
      </Button>
      <Button size={`lg`} variant="link" mb={5} isFullWidth onClick={() => setCurrentIndex(current_index - 1)}>
        <Text color="white">Back</Text>
      </Button>
      </Box>
    </Fade>
  )

  if (loading) {
    return <></>
  }

  if (isDesktop) {
      return (
        <Fade in={true}>
          <MenuDrawer type={`onboard`}/>
          <Grid
            bg={`rgb(17, 29, 75)`}
            style={{minHeight: "100vh"}}
            justify={`center`} 
            alignItems={`center`}
            p={5}
          >
            { renderDesktopStep(current_index) }
          </Grid>
        </Fade>
      );
  }

  return (
    <Fade in={true}>
      <Grid
        bg={`rgb(17, 29, 75)`}
        style={{minHeight: "100vh"}}
        justify={`center`} 
        alignItems={`center`}
        p={5}
      >
        <Container>
          { renderStep(current_index) }
        </Container>
      </Grid>
    </Fade>
  );
}

export default withRouter(WelomeContainer);
