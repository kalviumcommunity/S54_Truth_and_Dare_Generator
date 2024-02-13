import { Button } from '@chakra-ui/button'
import { CloseButton } from '@chakra-ui/close-button'
import { Icon } from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"
import React from 'react'

const Navbar = () => {
  return (
    <Flex margin={"1vmax"}  justify="center" align="center" top={0}>
      <Flex
        bg="white"
        borderRadius="50px"
        py="1%"
        px="3%"
        w="70%"
        height={"4vmax"}
        mr="1vmax"
        justifyContent="space-between"
        alignItems="center"
        border="1px solid black"
      >
        <Flex alignItems="center">
          {/* <Link to={"/"}> */}
          <Image src={logo} h={"5vmax"} w={"9vmax"} />
          {/* </Link> */}
        </Flex>
        <HStack spacing="2vw">
          {/* <Link mr="1.5vw" to={"/about"}> */}
          <Text fontSize="1.5vmax" fontWeight="600">
            About
          </Text>
          {/* </Link> */}
          {/* <Link mr="1.5vw" to={"/contact"}> */}
          <Text fontSize="1.5vmax" fontWeight="600">
            Contact Us
          </Text>
          {/* </Link> */}
        </HStack>
      </Flex>
      <Button
        bg="#F7174E"
        color="white"
        fontSize="1.5vmax"
        // fontWeight="100"
        borderRadius="50px"
        border="none"
        px="2vw"
        py="1vh"
        cursor={"pointer"}
      >
        Sign Up
      </Button>
    </Flex>
  );
};

export default Navbar;