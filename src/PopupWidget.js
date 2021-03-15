import React, { useState, useContext } from 'react';
import {
  Button,
  Container,
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
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Image,
  Link,
  SimpleGrid,
  Flex,
  Tag
} from '@chakra-ui/react';
import { useDisclosure, createStandaloneToast, useClipboard, useMediaQuery } from "@chakra-ui/react";
import { FiInfo, FiShare, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosText } from "react-icons/io";

import axios from "axios";

import { DashboardContext } from './DashboardContainer';

const store = require('store');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
}

const primaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase"
}

const shareButtonStyle = {
  border: "none",
  textTransform: "uppercase",
  width: "100px",
  position: "absolute",
  right: "0",
  top: "2.5px"
}

function PopupWidget({type, buttonText, buttonSize, textSize}) {
  const [state, setState] = useState({applied: false, drizly_order_id: ""})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  let authToken = store.get('auth_token')
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })

  const contextValue = useContext(DashboardContext)
  const referralUrl = `${process.env.REACT_APP_WEB_URL}/ref_${contextValue.user?.referral_code}`
  const { hasCopied, onCopy } = useClipboard(referralUrl)

  const current_card_for_round = contextValue.user.played_cards?.find(card => card.round.id === contextValue.round.id)

  function handleOrderConfirmation() {
    apiUrl.patch(`v1/users/${contextValue.user.id}/cards/${current_card_for_round.id}`, { bonus: true }).then((response) => {
      axios.post(`https://sheet2api.com/v1/gnOukYlLQX6x/drizly-streaks-order-ids`, { 
        user_id: contextValue.user.id, 
        round_id: current_card_for_round.round.id, 
        order_id: state.drizly_order_id
      }).then((response) => {
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
      })
      setState({...state, applied: true, drizly_order_id: ""})
    }).catch((error) => {
      console.log(error)
    })
  }

  function handleOnChange(e) {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  function handleResultsClose() {
    localStorage.setItem("results", null)
    onClose()
  }

  if (type === "results") {
    return (
      <Modal isCentered isOpen={isOpen} onClose={handleResultsClose}>
      <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>Congratulations!</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                <Text mt={2} mb={5} color="white" size="lg" style={{width: "75%", textAlign: "center"}}>You selected 5/5 picks correctly in the 1st Round!</Text>
                <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/swish.gif" alt="Swish"/>
                <Button size={`md`} variant="outline" style={secondaryButtonStyle} isFullWidth onClick={onClose}>
                  <Text color="white">See my results</Text>
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  if (type === "order_info") {
    return (
    <>
      <FiInfo color="white" style={{fontSize: "1rem", marginLeft: "5px"}} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>Want a boost?</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                {/* <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly"/> */}
                <Text color="white" size="lg" style={{textAlign: "center"}}>Enter the 8 digit order ID from your Drizly receipt and we will apply a bonus point to your round.</Text>
                <Text color="white" size="lg" style={{textAlign: "center"}}>Receipts valid on any Bud Light products purchased between 3/14 and when picks are due for the current round.</Text>
                <Text color="white" size="lg" style={{textAlign: "center"}}>Expect your order to be confirmed in the next 24 hours.</Text>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    )
  }

  if (type === "share") {
    return (
    <DashboardContext.Consumer>
    {({user, round})=> (
      <>
      { isDesktop ? <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={shareButtonStyle} isFullWidth onClick={onOpen}>
        <FiShare color="white" style={{marginRight: "5px"}} onClick={onOpen}/>
        <Text fontSize={textSize} color="white">Share</Text>
      </Button> : <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={onOpen}>
        <FiShare color="white" style={{marginRight: "5px"}}/>
        <Text fontSize={textSize} color="white">{ buttonText }</Text>
      </Button> }
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>Share with Friends</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`} style={{background: "none"}}/>
          <ModalBody >
            <Box pt={3} pb={3} >
              <VStack>
                {/* <Text mb={2} color="white" size="lg" style={{textAlign: "center"}}>
                  Check out this awesome game I’m playing. You should join.
                </Text> */}
                <Button onClick={onCopy} >
                    {hasCopied ? "Copied!" : "Copy your referral code"}
                  </Button>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter mt={2} mb={5} style={{justifyContent: "center"}}>
            <SimpleGrid columns={4} spacing={10} >
              <Box >
                <IoIosText color={`#fff`}/>
              </Box>
              <Box >
                <FiFacebook color={`#fff`}/>
              </Box>
              <Box >
                <FiTwitter color={`#fff`}/>
              </Box>
              <Box >
                <FiInstagram color={`#fff`}/>
              </Box>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )}
    </DashboardContext.Consumer>
    )
  }

  if (type === "results_share") {
    return (
    <DashboardContext.Consumer>
    {({user, round})=> (
      <>
      <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={onOpen}>
        <FiShare color="white" style={{marginRight: "5px"}}/>
        <Text fontSize={textSize} color="white">{ buttonText }</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>Share with Friends</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`} style={{background: "none"}}/>
          <ModalBody >
            <Box pt={3} pb={3} >
              <VStack>
                {/* <Text mb={2} color="white" size="lg" style={{textAlign: "center"}}>
                  Check out this awesome game I’m playing. You should join.
                </Text> */}
                <Button onClick={onCopy} >
                    {hasCopied ? "Copied!" : "Copy your referral code"}
                  </Button>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter mt={2} mb={5} style={{justifyContent: "center"}}>
            <SimpleGrid columns={4} spacing={10} >
              <Box >
                <IoIosText color={`#fff`}/>
              </Box>
              <Box >
                <FiFacebook color={`#fff`}/>
              </Box>
              <Box >
                <FiTwitter color={`#fff`}/>
              </Box>
              <Box >
                <FiInstagram color={`#fff`}/>
              </Box>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )}
    </DashboardContext.Consumer>
    )
  }
  
  if (type === "partner_link") {
    return (
    <>
      <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={buttonStyle} isFullWidth onClick={onOpen}>
        <Text color="white" fontSize={`xs`}>Join now</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>More Rewards</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                {/* <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly"/> */}
                <Text color="white" size="lg" style={{textAlign: "center"}}>Visit Bud Light Legends to unlock epic rewards!</Text>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter mt={2} mb={5}>
            <Button size={`md`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={onOpen}>
              <Link color="white" fontSize={`xs`} href="https://www.budlight.com/en/legends.html" isExternal>
                Take me to the site
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
  }
  if (type === "order") {
    return (
    <>
      <Button _active={{bg: "none"}} _hover={{background: "none"}} size={buttonSize} variant="outline" mt={2.5} style={secondaryButtonStyle} isFullWidth onClick={onOpen}>
        <Text color="white" fontSize={textSize} >{buttonText}</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>Earn +1 Point</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly"/>
                <Text color="white" size="lg" style={{textAlign: "center"}}>Enter the 8 digit order ID from your Drizly receipt and we will apply a bonus point to your round.</Text>
                <Text color="white" size="lg" style={{textAlign: "center"}}>Receipts valid on any Bud Light products purchased between 3/14 and when picks are due for the current round.</Text>
                <Text color="white" size="lg" style={{textAlign: "center"}}>Expect your order to be confirmed in the next 24 hours.</Text>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter mt={2} mb={5}>
            <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  variant="filled"
                  name="drizly_order_id"
                  style={{color: "white", background: "rgba(16, 40, 100, 0.25)"}}
                  placeholder="Enter Drizly Order ID"
                  value={state.drizly_order_id}
                  onChange={handleOnChange}
                  maxLength={`8`}
                  disabled={!contextValue.user.played || current_card_for_round?.bonus || state.applied}
                />
              <InputRightElement width="4.5rem">
                <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mr={2} style={primaryButtonStyle} isFullWidth h="1.75rem" size="sm" disabled={!contextValue.user.played || state.drizly_order_id.length < 8} onClick={handleOrderConfirmation}>
                  <Text color="white" style={{fontSize: "0.5rem"}}>{current_card_for_round?.bonus || state.applied ? "Applied!" : "Apply"}</Text>
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
  }

  return (
    <>
      
    </>
  )
}

export default PopupWidget;