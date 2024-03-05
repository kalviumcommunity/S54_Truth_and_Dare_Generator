import React, { useContext, useEffect, useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { AppContext } from '../context/ParentContext';
import { Box, Image, Heading, Flex } from '@chakra-ui/react';
import curve from "../assets/curve.svg";
import arrow from "../assets/arrow-r.svg";
import Classic from "../assets/classic.svg";
import Party from "../assets/party.svg";
import Mixed from "../assets/mixed.svg";
import Teens from "../assets/teens.svg";
import { ThumbUpOutlined as ThumbUpOutlinedIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
    const { category, setCategory, signin } = useContext(AppContext);
    const [truthData, setTruthData] = useState([]);
    const [dareData, setDareData] = useState([]);
    const [selectedTruth, setSelectedTruth] = useState(null);
    const [selectedDare, setSelectedDare] = useState(null);
    const [key, setKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://truth-and-dare-generator.onrender.com/td');
                const data = response.data;
                const filteredTruthData = data.filter(item => item.category === `${category}` && item.type === 'truth');
                const filteredDareData = data.filter(item => item.category === `${category}` && item.type === 'dare');
                setTruthData(filteredTruthData);
                setDareData(filteredDareData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [category]);

    const handleTruthClick = () => {
        setSelectedTruth(truthData[Math.floor(Math.random() * truthData.length)]);
        setSelectedDare(null);
        setKey(prevKey => prevKey + 1);
    };

    const handleDareClick = () => {
        setSelectedDare(dareData[Math.floor(Math.random() * dareData.length)]);
        setSelectedTruth(null);
        setKey(prevKey => prevKey + 1);
    };

    const emptyCategory = () => {
        setCategory('');
    };

    const handleLikeClick = async (type, itemId) => {
        if (signin) {
            try {
                const res = await axios.patch(`https://truth-and-dare-generator.onrender.com/td/${itemId}`, { action: 'like' });
                const updatedLikes = res.data.likes;
                if (type === 'truth') {
                    setSelectedTruth(prevTruth => ({ ...prevTruth, likes: updatedLikes }));
                } else if (type === 'dare') {
                    setSelectedDare(prevDare => ({ ...prevDare, likes: updatedLikes }));
                }
            } catch (error) {
                console.error('Error updating likes:', error);
            }
        } else {
            window.alert("Please Login to use that feature");
        }
    };

    const handleDeleteClick = async (itemId) => {
        if (signin) {
            try {
                const res = await axios.delete(`https://truth-and-dare-generator.onrender.com/td/${itemId}`);
                if (res.status === 200) {
                    toast("Deleted Successfully", { theme: "light" });
                    setTimeout(emptyCategory, 1500);
                } else {
                    alert("Failed to delete the item");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            window.alert("Please Login to use that feature");
        }
    };

    return (
        <Box id="game" minH={"80%"} maxW={"35%"} minW={"35%"} border="1px solid black" borderRadius='25px' textAlign='center' position='relative' display='flex' flexDirection='column' alignItems='center'>
            <ToastContainer />
            <Box className="curve-container" w='100%' h='30%' borderRadius='25px 25px 0 0' overflow='hidden' position='relative' objectFit="cover" textAlign="center" >
                <Image src={curve} w={"100%"} alt="" className="curve-img" />
                <Box className="title" position='absolute' w='100%' textAlign='center' top='25%' fontSize='larger'>
                    <Button className='category' padding="1vmin" minH={"3.3vmax"} borderRadius='50px' cursor='pointer' minWidth="42%" onClick={() => setCategory('')}>
                        <Flex className="category-content" alignItems='center' justifyContent="flex-end" fontSize='1.5vmax' fontWeight='600' >
                            {category === 'Classic' && <Image src={Classic} alt="" />}
                            {category === 'Party' && <Image src={Party} alt="" />}
                            {category === 'Teens' && <Image src={Teens} alt="" />}
                            {category === 'Mixed' && <Image src={Mixed} alt="" />}
                            <Heading as='h3'>{category}</Heading>
                        </Flex>
                        <Image id='arrow-img' src={arrow} alt="" transform="rotate(90deg)" />
                    </Button>
                </Box>
            </Box>
            <Box p="1vmax 2vmax">
                {isLoading && <Box className="loader"></Box>}
                {selectedTruth && (
                    <Box w="100%">
                        <Heading textDecoration="underline">Truth</Heading>
                        <br />
                        <Text fontFamily="Open Sans" fontSize='2xl' as='b'>{selectedTruth.text}</Text>

                        <Flex alignItems="center" justifyContent="flex-end">
                            <Button onClick={() => handleLikeClick('truth', selectedTruth._id)} cursor="pointer" border="none" backgroundColor="white" id='LikeButton'>
                                <ThumbUpOutlinedIcon />
                                <Text as='b'>{selectedTruth.likes}</Text>
                            </Button>
                            <Button w={"1.5vmin"} onClick={() => handleDeleteClick(selectedTruth._id)} cursor="pointer" border="none" backgroundColor="white" id='deleteButton'>
                                <DeleteOutlineIcon />
                            </Button>
                        </Flex>
                    </Box>
                )}
                {selectedDare && (
                    <Box w="100%">
                        <Heading textDecoration="underline">Dare</Heading>
                        <br />
                        <Text fontFamily="Open Sans" fontSize='2xl' as='b'>{selectedDare.text}</Text>

                        <Flex alignItems="center" justifyContent="flex-end">
                            <Button onClick={() => handleLikeClick('dare', selectedDare._id)} cursor="pointer" border="none" backgroundColor="white" id='LikeButton'>
                                <ThumbUpOutlinedIcon />
                                <Text as='b'>{selectedDare.likes}</Text>
                            </Button>
                            <Button w={"1.5vmin"} onClick={() => handleDeleteClick(selectedDare._id)} cursor="pointer" border="none" backgroundColor="white" id='deleteButton'>
                                <DeleteOutlineIcon />
                            </Button>
                        </Flex>
                    </Box>
                )}
            </Box>
            <Flex className='button-container' w="100%" justifyContent="space-around" position="absolute" bottom="2vmin">
                <Button bg="#069DFF" color="white" fontSize="1.7vmax" fontWeight="600" borderRadius="50px" border="none" px="2vw" py="1.6vh" width="11vmax" cursor="pointer" _hover={{ boxShadow: "1px 10px 8px #888888" }} onClick={handleTruthClick} _active={{ transform: "scale(0.96)" }}>
                    Truth
                </Button>
                <Button bg="#FF5B1A" color="white" fontSize="1.7vmax" fontWeight="600" borderRadius="50px" border="none" width="11vmax" px="2vw" py="1.6vh" cursor="pointer" _hover={{ boxShadow: "1px 10px 8px #888888" }} _active={{ transform: "scale(0.96)" }} onClick={handleDareClick}>
                    Dare
                </Button>
            </Flex>
        </Box>
    );
};

export default Game;
