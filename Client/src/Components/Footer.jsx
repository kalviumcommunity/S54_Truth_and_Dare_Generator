import React from 'react'
import logo from "../assets/logo.png"
import { Box, Flex, Stack, Heading, Text, VStack, HStack } from '@chakra-ui/layout'
import { ChevronUpIcon } from '@chakra-ui/icons'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailIcon from '@mui/icons-material/Mail'
import XIcon from '@mui/icons-material/X'

const Footer = () => {

  return (
    <Box width={"100%"} bottom={"0"} bg={"black"} color={"white"} >
      <HStack w={"100%"} borderBottom={"2px solid white"} display={"flex"} justifyContent={"space-around"} >
        <Box padding={"10px"} >
          <img src={logo} alt="" />
        </Box>
        <HStack justifyContent={"Center"} mr={"95px"} cursor={"pointer"} >
          <GitHubIcon />
          <LinkedInIcon />
          <MailIcon />
          <XIcon />
        </HStack>
        <HStack justifyContent={"Center"} cursor={"pointer"} onClick={() => window.scrollTo({top: 0,behavior: 'smooth'})}>
          <ChevronUpIcon w={"3vmax"} h={"3vmax"} />
        </HStack>
      </HStack>

      <Box padding={"15px"} textAlign="center">
        <Text fontSize={"1.2vmax"}>@ 2024 All Rights Reserved . </Text>
      </Box>

    </Box>
  )
}

export default Footer