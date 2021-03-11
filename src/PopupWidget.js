import React, { useState } from 'react';
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
  SimpleGrid
} from '@chakra-ui/react';
import { useDisclosure, createStandaloneToast } from "@chakra-ui/react";
import { FiInfo, FiShare, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosText } from "react-icons/io";

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

function PopupWidget({type, buttonText, buttonSize, textSize}) {
  const [state, setState] = useState({applied: false, drizly_order_id: ""})
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  function handleOnChange(e) {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  if (type === "order_info") {
    return (
    <>
      <FiInfo color="white" style={{fontSize: "1rem", marginLeft: "10px"}} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>How does it work?</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                {/* <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly"/> */}
                <Text color="white" size="lg" style={{textAlign: "center"}}>Enter your order ID from your Drizly receipt and we will apply an extra Bonus Point to your Round.</Text>
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
    <>
      <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" style={primaryButtonStyle} isFullWidth onClick={onOpen}>
        <FiShare color="white" style={{marginRight: "5px"}}/>
        <Text fontSize={textSize} color="white">{ buttonText }</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{borderRadius: "25px", border: "1px solid #fff", background: "rgb(57, 143, 214)", margin: "0 1rem"}}>
          <ModalHeader style={{textAlign: "center", color: "#fff"}}>FYI</ModalHeader>
          <ModalCloseButton color={`rgb(17, 30, 75)`} style={{background: "none"}}/>
          <ModalBody >
            <Box pt={3} pb={3}>
              <VStack>
                <Text color="white" size="lg" style={{textAlign: "center"}}>
                Share your results from this round to earn 1 Bonus Point to be applied towards your score in the next round.
                </Text>
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
                <Text color="white" size="lg" style={{textAlign: "center"}}>Enter your order ID from your Drizly receipt to apply an extra point to your round.</Text>
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
                />
              <InputRightElement width="4.5rem">
                <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mr={2} style={primaryButtonStyle} isFullWidth h="1.75rem" size="sm" onClick={handleOrderConfirmation}>
                  <Text color="white" style={{fontSize: "0.5rem"}}>{state.applied ? "Applied!" : "Apply"}</Text>
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
      <FiInfo color="white" style={{fontSize: "1rem", marginLeft: "10px"}} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{margin: "0 1rem"}}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PopupWidget;