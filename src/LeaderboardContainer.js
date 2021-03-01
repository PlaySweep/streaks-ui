import React from 'react';
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
  Tbody
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
    <Box bg={`rgb(17, 30, 75)`}>
      <Box p={5}>
        <Heading mt={2} color="white" size="md" style={{fontWeight: "800"}}>Leaderboard</Heading>
        <Grid templateColumns="repeat(1, 1fr)" gap={5} mt={5}>
        <Box w="100%" p={2} style={{borderRadius: "12px"}} bg="#102864" pt={5} pb={5}>
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
          <Text color="white" fontSize="xs" mt={3} style={{textDecoration: "underline", textTransform: "uppercase", textAlign: "center"}} onClick={onOpen}>See Full Leaderboard</Text>
          <Drawer placement={`bottom`} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent style={drawerContentStyle}>
                <DrawerCloseButton color={"#fff"}/>
                <DrawerBody>
                  <Box p={5}>
                  <Heading mt={0} mb={10} style={{textAlign: "center"}} color="white">Sign up</Heading>
                  <InputGroup mt={5} mb={5}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="white" />}
                    />
                    <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Email" size="lg" />
                  </InputGroup>
                  <InputGroup mt={5} mb={5}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="white" />}
                    />
                    <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" />
                  </InputGroup>
                  <InputGroup mt={5} mb={5}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="white" />}
                    />
                    <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" />
                  </InputGroup>
                  <InputGroup mt={5} mb={5}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="white" />}
                    />
                    <Input type="tel" variant="filled" style={{color: "white", background: "rgba(16, 40, 100, 0.95)"}} placeholder="Password" size="lg" />
                  </InputGroup>
                  
                  <Button size={`lg`} variant="outline" mb={5} style={buttonStyle} isFullWidth onClick={() => console.log('sign up') }>
                    <Text color="white">Create an account</Text>
                  </Button>
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