import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    VStack,
    Center,
    InputGroup,
    InputRightElement,
    Text,
    ChakraProvider,
} from '@chakra-ui/react';
import axios from 'axios';
import { AppContext } from '../context/ParentContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [error, setError] = useState(null);
    const { signin, setSignin } = useContext(AppContext);
    const { handleSubmit, register, formState: { errors, isSubmitting }, getValues } = useForm();
    const Navigate = useNavigate();

    useEffect(() => {
        if (signin) {
            toast.success("Login Successful!", { theme: "light" });
            setTimeout(() => {
                Navigate("/");
            }, 2000);
        }
    }, [signin]);

    const submitHandler = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                axios.post("https://truth-and-dare-generator.onrender.com/td/login", values)
                    .then(response => {
                        if (response.status === 201) {
                            Cookies.set("username", values.email);
                            Cookies.set("token", response.data.token);
                            setSignin(true);
                        } else {
                            setError(response.data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                resolve();
            }, 1000);
        });
    };

    return (
        <ChakraProvider>
            <Container maxW="100%" p={{ base: 5, md: 10 }} h="100vh" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Link to={"/"}>
                    <Button
                        bg="#F7174E"
                        color="white"
                        fontSize="1.5vmax"
                        borderRadius="50px"
                        border="none"
                        margin={"1vw"}
                        cursor={"pointer"}
                        position={"fixed"}
                        top={"0"}
                        left={"0"}
                        width={"50px"}
                        height={"50px"}
                        _hover={{ bg: "#F7174E" }}
                    >
                        <CloseIcon />
                    </Button>
                </Link>
                <Center>
                    <ToastContainer />
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="4xl" color="black">Log In</Heading>
                        </Stack>
                        <VStack as="form" boxSize={{ base: 'xs', sm: 'sm', md: 'md' }} h="max-content !important" bg='#F7174E' rounded="lg" boxShadow="lg" p={{ base: 5, sm: 10 }} spacing={8} color="white" onSubmit={handleSubmit(submitHandler)}>
                            <VStack spacing={4} w="100%">
                                <FormControl>
                                    <FormLabel htmlFor='email'>Username / Email</FormLabel>
                                    <Input placeholder='enter username' bg="white" rounded="md" id="email" type="text" color={"black"} {...register("email", { required: 'Enter Your email' })} />
                                    <Text color="white" className='err'>
                                        {errors.email && errors.email.message}
                                    </Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input placeholder='enter password' bg="white" color={"black"} rounded="md" id="password" type={show ? 'text' : 'password'} {...register("password", { required: 'Enter Password', minLength: { value: 8, message: 'Enter minimum 8 chars' } })} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" rounded="md" bg='#ffffff' onClick={handleClick}>
                                                {show ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <Text color="white" className='err'>
                                        {errors.password && errors.password.message}
                                    </Text>
                                    {error && <Text color="white" className='err'>{error}</Text>}
                                </FormControl>
                            </VStack>
                            <VStack w="100%">
                                <Button color="white" bg={"green"} rounded="md" w="100%" isLoading={isSubmitting} type='submit' _hover={{ bg: "green" }}>
                                    <h1>Log in</h1>
                                </Button>
                                <Stack direction="row" justifyContent="center" w="100%">
                                    <Link to="/signup" fontSize={{ base: 'md', sm: 'md' }} style={{ textDecoration: "underline" }} >Don't Have an account, Signup? </Link>
                                </Stack>
                            </VStack>
                        </VStack>
                    </Stack>
                </Center>
            </Container>
        </ChakraProvider>
    );
};

export default Login;
