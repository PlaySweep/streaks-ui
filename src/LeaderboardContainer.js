import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Grid,
  Container,
  Drawer,
  Center,
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
  VStack,
  Table,
  Tr,
  Td,
  Thead,
  Th,
  Tbody,
  Link,
  Image
} from '@chakra-ui/react';

import Pagination from "react-js-pagination";

import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

import { DashboardContext } from './DashboardContainer';

import axios from 'axios';

const store = require('store');

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
}

const cardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

function LeaderboardContainer() {
  let authToken = store.get('auth_token')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 775px)")
  const [state, setState] = useState({leaderboard_users: [], active_page: 1})
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
    apiUrl.get(`v1/leaderboards?type=points&page=1`).then((response) => {
      setState({...state, leaderboard_users: response.data.users})
    })
  }, [])

  function handlePageChange(page_number) {
    setState({...state, active_page: page_number})
  }

  if (isDesktop && state.leaderboard_users.length === 0) {
    return (
      <Box bg={`rgb(17, 30, 75)`}>
      <Box p={5} pb={10} style={{maxWidth: "1350px", margin: "0 auto 2.5rem auto"}}>
        <Grid templateColumns="repeat(1, 1fr)" gap={5} mt={5} style={{maxWidth: "1350px", margin: "2.5rem auto"}}>
          <Heading mt={2} ml={10} color="white" size="lg" style={{fontWeight: "800"}}>Leaderboard</Heading>
          <Box w="100%" p={2} style={{maxWidth: "950px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", borderRadius: "12px"}} bg="#102864" pt={5} pb={5}>
            <VStack>
              <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/swish.gif" alt="Swish"/>
              <Text color="white" size="lg" style={{margin: "0 auto", width: "75%", textAlign: "center"}}>The Streaks Leaderboard will be active once Round 1 is complete.</Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
      </Box>
    )
  }

  if (isDesktop) {
    return (
      <>
      <Box bg={`rgb(17, 30, 75)`}>
        <Box style={{maxWidth: "1275px", margin: "0 auto 2.5rem auto"}}>
          
          <Grid templateColumns="repeat(1, 1fr)" gap={5} mt={5} style={{maxWidth: "1275px", margin: "2.5rem auto"}}>
          
          <Box style={{maxWidth: "950px", display: "contents"}}>
            <Heading mt={5} color="white" size="xl" style={{fontWeight: "800"}}>Leaderboard</Heading>
            <Box w="100%" p={2} style={{margin: "0 auto", borderRadius: "12px"}} bg="#102864" pt={5} pb={5}>
            <Table variant="unstyled" size={`xl`}>
              <Thead>
                <Tr>
                  <Th color="#DD6937" size="lg" style={{textAlign: "center", textTransform: "uppercase"}}>Rank</Th>
                  <Th color="#DD6937" size="lg" style={{textAlign: "center", textTransform: "uppercase"}}>Name</Th>
                  <Th color="#DD6937" size="lg" style={{textAlign: "center", textTransform: "uppercase"}}>Points</Th>
                  {/* <Th color="#DD6937" size="xs" style={{fontSize: "0.75rem", textAlign: "center", textTransform: "uppercase"}}>Points</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                { state.leaderboard_users.map((u) => {
                  return (
                    <Tr key={u.id}>
                      <Td colSpan={1} color="#398FD6" size="xl" style={{ fontWeight: "700", textAlign: "center"}}>{u.rank}</Td>
                      <Td color="#fff" size="xl" style={{ fontWeight: "700", textAlign: "center"}}>{u.username}</Td>
                      <Td color="#398FD6" size="xl" style={{ fontWeight: "700", textAlign: "center"}}>{u.score} {u.score === 1 ? `point` : `points`}</Td>
                      {/* <Td color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.points}</Td> */}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
            <Text color="white" fontSize="sm" mt={10} style={{display: "inline-block", display: "flex", justifyContent: "center", textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>See Full Leaderboard</Text>
            <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent style={drawerContentStyle}>
                  <DrawerCloseButton color={"#fff"}/>
                  <DrawerBody>
                    <Box>
                    <Heading mt={5} mb={5} style={{textAlign: "center"}} color="white">Leaderboard</Heading>
                    <Table variant="unstyled" size={`sm`}>
                      <Thead>
                        <Tr>
                          <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Rank</Th>
                          <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Name</Th>
                          <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Points</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        { [{id: 1, rank: "1", name: "ryan", streak: "4 rounds", points: "21pts"}, {id: 2, rank: "2", name: "katie", streak: "4 rounds", points: "19pts"}, {id: 3, rank: "3", name: "naval", streak: "3 rounds", points: "17pts"}, {id: 4, rank: "4", name: "kitty", streak: "3 rounds", points: "14pts"}, {id: 5, rank: "5", name: "anon", streak: "2 rounds", points: "12pts"}].map((u) => {
                          return (
                            <Tr key={u.id}>
                              <Td colSpan={1} color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.rank}</Td>
                              <Td color="#fff" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.name}</Td>
                              <Td color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.score} {u.score === 1 ? `point` : `points`}</Td>
                            </Tr>
                          )
                        })}
                      </Tbody>
                    </Table>
                    <Pagination
                        activePage={state.active_page}
                        itemsCountPerPage={5}
                        totalItemsCount={100}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                      />
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </Box>
          </Box>
        </Grid>
        </Box>
      </Box>
      </>
    );
  }

  if (state.leaderboard_users.length === 0) {
    return (
      <Box bg={`rgb(17, 30, 75)`}>
      <Box p={5} pb={10}>
        <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Leaderboard</Heading>
        <Grid templateColumns="repeat(1, 1fr)" gap={5} mt={5}>
          <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={5} pb={5}>
            <VStack>
              <Image mb={2} boxSize="75px" src="https://streaks-challenge.s3.amazonaws.com/swish.gif" alt="Swish"/>
              <Text color="white" size="lg" style={{margin: "0 auto", width: "75%", textAlign: "center"}}>The Streaks Leaderboard will be active once Round 1 is complete.</Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
      </Box>
    )
  }
  
  return (
    <>
    <Box bg={`rgb(17, 30, 75)`}>
      <Box p={5} pb={10}>
        <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Leaderboard</Heading>
        <Grid templateColumns="repeat(1, 1fr)" gap={5} mt={5}>
        <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={5} pb={5}>
          <Table variant="unstyled" size={`xs`}>
            <Thead>
              <Tr>
                <Th color="#DD6937" size="xs" style={{fontSize: "0.75rem", textAlign: "center", textTransform: "uppercase"}}>Rank</Th>
                <Th color="#DD6937" size="xs" style={{fontSize: "0.75rem", textAlign: "center", textTransform: "uppercase"}}>Name</Th>
                <Th color="#DD6937" size="xs" style={{fontSize: "0.75rem", textAlign: "center", textTransform: "uppercase"}}>Points</Th>
                {/* <Th color="#DD6937" size="xs" style={{fontSize: "0.75rem", textAlign: "center", textTransform: "uppercase"}}>Points</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              { state.leaderboard_users.map((u) => {
                return (
                  <Tr key={u.id}>
                    <Td colSpan={1} color="#398FD6" size="xs" style={{fontSize: "0.9rem", fontWeight: "700", textAlign: "center"}}>{u.rank}</Td>
                    <Td color="#fff" size="xs" style={{fontSize: "0.9rem", fontWeight: "700", textAlign: "center"}}>{u.username}</Td>
                    <Td color="#398FD6" size="xs" style={{fontSize: "0.9rem", fontWeight: "700", textAlign: "center"}}>{u.score} {u.score === 1 ? `point` : `points`}</Td>
                    {/* <Td color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.points}</Td> */}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
          <Text color="white" fontSize="xs" mt={5} style={{display: "inline-block", display: "flex", justifyContent: "center", textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>See Full Leaderboard</Text>
          <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent style={drawerContentStyle}>
                <DrawerCloseButton color={"#fff"}/>
                <DrawerBody>
                  <Box>
                  <Heading mt={5} mb={5} style={{textAlign: "center"}} color="white">Leaderboard</Heading>
                  <Table variant="unstyled" size={`sm`}>
                    <Thead>
                      <Tr>
                        <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Rank</Th>
                        <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Name</Th>
                        <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Streak</Th>
                        <Th color="#DD6937" size="xs" style={{textAlign: "center", textTransform: "uppercase"}}>Points</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      { [{id: 1, rank: "1", name: "ryan", streak: "4 rounds", points: "21pts"}, {id: 2, rank: "2", name: "katie", streak: "4 rounds", points: "19pts"}, {id: 3, rank: "3", name: "naval", streak: "3 rounds", points: "17pts"}, {id: 4, rank: "4", name: "kitty", streak: "3 rounds", points: "14pts"}, {id: 5, rank: "5", name: "anon", streak: "2 rounds", points: "12pts"}].map((u) => {
                        return (
                          <Tr key={u.id}>
                            <Td colSpan={1} color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.rank}</Td>
                            <Td color="#fff" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.name}</Td>
                            <Td color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.streak}</Td>
                            <Td color="#398FD6" size="sm" style={{fontWeight: "700", textAlign: "center"}}>{u.points}</Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                  <Pagination
                      activePage={state.active_page}
                      itemsCountPerPage={5}
                      totalItemsCount={100}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                    />
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      </Grid>
      </Box>
    </Box>
    </>
  );
}

export default LeaderboardContainer;