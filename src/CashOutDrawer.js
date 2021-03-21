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
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { IoMdPerson } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

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
  const contextValue = useContext(PrizeContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const [state, setState] = useState({
    submitting: false, 
    name: `${contextValue.user.first_name} ${contextValue.user.last_name}`,
    email: contextValue.user.email,
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: ""
  })
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json"
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
    setState({...state, submitting: true})
    apiUrl.patch(`v1/users/${contextValue.user.id}`, {
      first_name: state.name.split(' ')[0],
      last_name: state.name.split(' ')[1],
      address: {
        line1: state.line1,
        line2: state.line2,
        city: state.city,
        state: state.state,
        zipcode: state.zipcode
      }
    }).then((response) => {
      store.set('auth_token', response.data.token)
      setState({...state, submitting: false})
      onClose()
    }).catch((error) => {
      alert('error has occurred')
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
              <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "90%", textAlign: "center", margin: "1rem auto", fontWeight: "500"}}>FYI, your streak of {contextValue.user.streak_score} will reset when you cash out for prizes!</Text>
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
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "90%", textAlign: "center", margin: "1rem auto", fontWeight: "500"}}>FYI, your streak of {contextValue.user.streak_score} will reset when you cash out for prizes!</Text> 
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
