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
import { useMediaQuery } from "@chakra-ui/react";

const store = require('store');

const secondaryButtonStyle = {
  border: "1px solid #90D5FB",
  textTransform: "uppercase",
  background: "rgb(17, 30, 75)"
}

const selectedButtonStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  textTransform: "uppercase",
  backgroundColor: "#0D40A0"
}

const correctButtonStyle = {
  border: "2.5px solid rgb(46, 204, 113)",
  boxShadow: "0 0 5px rgb(46, 204, 113)",
  textTransform: "uppercase",
  backgroundColor: "rgba(46,204,113, 0.9)"
}

const incorrectButtonStyle = {
  border: "2.5px solid rgb(235, 88, 87)",
  boxShadow: "0 0 5px rgb(235, 88, 87)",
  textTransform: "uppercase",
  backgroundColor: "rgba(235, 88, 87, 0.9)"
}

function MatchupShow({id, order, description, selections, addPickFunc, disabled}) {
  const [state, setState] = useState({ matchup_id: id, selected_id: selections.find(selection => selection.selected)?.id })
  const [isDesktop] = useMediaQuery("(min-width: 775px)")

  function handleSelected(selectedId) {
    setState({...state, selected_id: selectedId })
    addPickFunc({...state, selected_id: selectedId})
  }

  return (
    <Grid
      key={id}
      h="auto"
      templateColumns="repeat(6)"
    >
      <GridItem colSpan={6} style={{position: "relative", width: "85%", margin: "0 auto"}}>
        <Tag size={`sm`} variant="solid" color={`rgb(17, 30, 75)`} bg="#398FD6" style={{borderRadius: "25px", textAlign: "center", fontWeight: "800", position: "absolute", left: "-35px"}}>
          {order}
        </Tag>
        <Text color={`#fff`} mb={2} fontSize={isDesktop ? `lg` : `sm`}>
        {description}
        </Text>
        <Wrap>
          { selections.map((selection, index) => {
            return (
              <WrapItem key={selection.id} style={{width: "46%"}}>
                { selection.status === "pending" ? <Button 
                  _active={{bg: "none"}} 
                  _hover={{background: "none"}} 
                  size={`md`} 
                  variant="outline" 
                  mb={5} 
                  style={state.selected_id === selection.id ? selectedButtonStyle : secondaryButtonStyle} 
                  isFullWidth
                  onClick={!disabled ? () => handleSelected(selection.id) : null}
                >
                  <Text color="white" style={{fontSize: "0.75rem"}}>{selection.description}</Text>
                </Button> : selection.status === "winner" ? <Button 
                  _active={{bg: "none"}} 
                  _hover={{background: "none"}} 
                  size={`md`} 
                  variant="outline" 
                  mb={5} 
                  style={state.selected_id === selection.id ? correctButtonStyle : secondaryButtonStyle} 
                  isFullWidth
                  onClick={!disabled ? () => handleSelected(selection.id) : null}
                >
                  <Text color="white" style={{fontSize: "0.75rem"}}>{selection.description}</Text>
                </Button> : <Button 
                  _active={{bg: "none"}} 
                  _hover={{background: "none"}} 
                  size={`md`} 
                  variant="outline" 
                  mb={5} 
                  style={state.selected_id === selection.id ? incorrectButtonStyle : secondaryButtonStyle} 
                  isFullWidth
                  onClick={!disabled ? () => handleSelected(selection.id) : null}
                >
                  <Text color="white" style={{fontSize: "0.75rem"}}>{selection.description}</Text>
                </Button> }
              </WrapItem>
            )
          })}
        </Wrap>
      </GridItem>
    </Grid>
  );
}

export default MatchupShow;