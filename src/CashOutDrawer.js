import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Checkbox,
  Container,
  Grid,
  GridItem,
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
  Text,
  Spinner,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure, createStandaloneToast, useMediaQuery } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { IoMdPerson } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock, FaCheckCircle } from "react-icons/fa";

import LoadingWidget from './LoadingWidget';

import { PrizeContext } from './PrizeContainer';

// Data fetching
import axios from "axios";

const store = require('store');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

const modalContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px",
  maxWidth: "700px",
}

function CashOutDrawer({history, selectedPrize}) {
  let authToken = store.get('auth_token')
  const contextValue = useContext(PrizeContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const [state, setState] = useState({
    submitting: false, 
    name: `${contextValue.user.first_name} ${contextValue.user.last_name}`,
    email: contextValue.user.email,
    line1: contextValue.user.address?.line1 || "",
    line2: contextValue.user.address?.line2 || "",
    city: contextValue.user.address?.city || "",
    state: contextValue.user.address?.state || "",
    zipcode: contextValue.user.address?.zipcode || ""
  })

  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken
    },
  })

  function handleOnChange(e) {
    const value = e.target.value
    setState({...state, [e.target.name]: value})
  }

  function handleChecked(e) {
    let checked_state = e.target.checked
    setState({...state, checked: checked_state})
  }

  function handleCashOut() {
    if (selectedPrize.is_type === "physical") {
      updateAddress()
      createOrder()
    } else {
      createOrder()
    }
  }

  function createOrder() {
    setState({...state, submitting: true})
    apiUrl.post(`v1/users/${contextValue.user.id}/orders`, { 
      user_id: contextValue.user.id, 
      prize_id: selectedPrize.id,
      email: state.email
    }).then((response) => {
      const order = response.data.order
      contextValue.updateUser(order.user)
      if (selectedPrize.is_type === "physical") { 
        addToSheet(order) 
      } else {
        setTimeout(() => {
          setState({...state, submitting: false})
          const toast = createStandaloneToast()
          toast({
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            render: () => (
              <Box color="white" p={3} bg="rgb(57, 143, 214)" style={{borderRadius: "25px"}}>
                <Text fontSize={`xs`} style={{textAlign: "center"}}>🎉🏀 Success! Check your email for your code.</Text>
              </Box>
            ),
          })
          onClose()
        }, 1000)
      }
    }).catch((error) => {
      console.log("You do not have enough streaks to cash out")
    })
  }

  function updateAddress() {
    const address_data = {
      user_id: contextValue.user.id,
      name: state.name,
      line1: state.line1,
      line2: state.line2,
      city: state.city,
      state: state.state,
      zipcode: state.zipcode
    } 
    const request = contextValue.user.address?.id ? apiUrl.patch(`v1/users/${contextValue.user.id}/addresses/${contextValue.user.address?.id}`, address_data) : apiUrl.post(`v1/users/${contextValue.user.id}/addresses`, address_data)
    request.then((response) => {
      console.log("address updated!")
    }).catch((error) => {
      alert('error has occurred')
    })
  }

  function addToSheet(order) {
    axios.post(`https://sheet2api.com/v1/gnOukYlLQX6x/drizly-streaks-order-ids/Purchases`, { 
      "Order Number": order.id, 
      "Recipient Name": state.name,
      "Email": state.email,
      "Street Line 1": order.user.address.line1,
      "Street Line 2": order.user.address.line2,
      "City": order.user.address.city,
      "State/Province": order.user.address.state,
      "Zip/Postal Code": order.user.address.zipcode,
      "Country": "United States",
      "Item Title": order.prize.name,
      "SKU": `AB${order.size ? `${order.size}` : `NA`}${order.prize.id}00`,
      "Item Quantity": "1",
      "Shipping Service": "IDK"
    }).then(() => {
      setState({...state, submitting: false})
      const toast = createStandaloneToast()
      toast({
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        render: () => (
          <Box color="white" p={3} bg="rgb(57, 143, 214)" style={{borderRadius: "25px"}}>
            <Text fontSize={`xs`} style={{textAlign: "center"}}>🎉🏀 You successfully cashed out!</Text>
          </Box>
        ),
      })
      onClose()
    })
  }

  let physicalFormValidation = state.name && state.line1 && state.line2 && state.city && state.state && state.zipcode
  let digitalFormValidation = state.email
  let form_completed = selectedPrize.is_type === "physical" ? physicalFormValidation : digitalFormValidation
  
  const physicalForm = (
    <>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<IoMdPerson color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.name} name="name" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Name" size="md" onChange={handleOnChange}/>
      </InputGroup>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.line1} name="line1" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Street Address" size="md" onChange={handleOnChange}/>
      </InputGroup>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.line2} name="line2" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Apt/Unit" size="md" onChange={handleOnChange}/>
      </InputGroup>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.city} name="city" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="City" size="md" onChange={handleOnChange}/>
      </InputGroup>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.state} name="state" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="State" size="md" onChange={handleOnChange}/>
      </InputGroup>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.zipcode} name="zipcode" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Zipcode" size="md" onChange={handleOnChange}/>
      </InputGroup>
    </>
  )

  const digitalForm = (
    <>
      <InputGroup mt={5} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<HiOutlineMail color="white" />}
        />
        <Input disabled={state.submitting} type="text" value={state.email} name="email" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="md" onChange={handleOnChange}/>
      </InputGroup>
    </>
  )
  
  if (isDesktop) {
    return (
      <>
      <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "800", fontSize: "0.55rem", textTransform: "uppercase", height: "10px", padding: "1rem", margin: "0.75rem 0.25rem 0 0.25rem"}} onClick={onOpen}>Redeem</Tag>
      <Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent style={modalContentStyle}>
            <ModalCloseButton color={"#fff"}/>
            <ModalBody>
              { state.submitting ? <LoadingWidget>
                <Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} />
              </LoadingWidget> : null }
              <Box p={5} style={{width: "75%", margin: "0 auto"}}>
              <Heading mt={0} style={{textAlign: "center"}} color="white">Confirm Address</Heading>
              <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "90%", textAlign: "center", margin: "1rem auto", fontWeight: "500"}}>Your streak will reset to {contextValue.user.streak_score - selectedPrize.level} when you cash out for the {selectedPrize.name}.</Text>
              { selectedPrize.is_type === "physical" ? physicalForm : digitalForm }
              <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mb={5} style={buttonStyle} isFullWidth disabled={state.submitting || !form_completed} onClick={handleCashOut}>
                <Text color="white" fontSize={`sm`}>Cash out</Text>
              </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      </>
    )
  }

  return (
    <>
    <Tag style={{color: "#fff", border: "1px solid #398FD6", background: "rgb(17, 30, 75)", fontWeight: "800", fontSize: "0.55rem", textTransform: "uppercase", height: "10px", padding: "1rem", margin: "0.75rem 0.25rem 0 0.25rem"}} onClick={onOpen}>Redeem</Tag>
    <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent style={drawerContentStyle}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerBody>
            { state.submitting ? <LoadingWidget>
              <Spinner size={`lg`} color={`rgba(255, 255, 255, 0.25)`} />
            </LoadingWidget> : null }
            <Box p={5}>
            <Heading mt={0} style={{textAlign: "center"}} color="white">Confirm Address</Heading>
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "90%", textAlign: "center", margin: "1rem auto", fontWeight: "500"}}>Your streak will reset to {contextValue.user.streak_score - selectedPrize.level} when you cash out for the {selectedPrize.name}.</Text> 
            { selectedPrize.is_type === "physical" ? physicalForm : digitalForm }
            <Button _active={{bg: "none"}} _hover={{background: "none"}} size={`md`} variant="outline" mb={5} style={buttonStyle} isFullWidth disabled={state.submitting || !form_completed} onClick={handleCashOut}>
              <Text color="white" fontSize={`sm`}>Cash out</Text>
            </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  )
}

export default withRouter(CashOutDrawer);
