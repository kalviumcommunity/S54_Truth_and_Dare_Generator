import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/ParentContext';
import { Box, Flex, Image, Heading } from '@chakra-ui/react';
import arrow from "../assets/arrow-r.svg";
import classic from "../assets/classic.svg";
import party from "../assets/party.svg";
import mixed from "../assets/mixed.svg";
import teens from "../assets/teens.svg";
import curve from "../assets/curve.svg";

const GameStart = () => {
    const { setCategory } = useContext(AppContext);

    return (
        <Box className="game-starter" minH={"80%"} minW={"35%"} border="1px solid black" borderRadius='25px' textAlign='center' display='flex' flexDirection='column' justifyContent='space-between'>
            <Box className="curve-container" w='100%' h='30%' borderRadius='25px 25px 0 0' overflow='hidden' position='relative' objectFit="cover">
                <Image src={curve} w='100%' alt="" className="curve-img" />
                <Box className="title" color='white' position='absolute' w='100%' textAlign='center' top='25%' fontSize='larger'>
                    <Heading as='h1'>Truth or Dare</Heading>
                </Box>
            </Box>
            <Flex className='categories' flexDirection='column' padding='2vmax' minH={"60%"} justifyContent={"space-between"} >
                {['Classic', 'Party', 'Teens', 'Mixed'].map((cat, index) => (
                    <Button key={index} className='category' bg={"white"} marginBottom={"1vmin"} justifyContent='space-between' borderRadius='50px' padding='2vmax' cursor='pointer' onClick={() => setCategory(cat)}>
                        <Flex className="category-content" alignItems='center' fontSize='1.9vmax' fontWeight='600'>
                            <Image src={cat === 'Classic' ? classic : cat === 'Party' ? party : cat === 'Teens' ? teens : mixed} alt="" />
                            <span>{cat}</span>
                        </Flex>
                        <Image src={arrow} alt="" />
                    </Button>
                ))}
            </Flex>
        </Box>
    );
};

export default GameStart;
