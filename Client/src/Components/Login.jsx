import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    VStack,
    Center,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    Text,
    ChakraProvider,
} from '@chakra-ui/react';
import axios from 'axios';
import { AppContext } from '../context/ParentContext';

const Login = () => {

    const [show, setShow] = useState(false);
    const [cShow, setCShow] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClick2 = () => setCShow(!cShow);
    const [error, setError] = useState(null)
    const {signin,setSignin}=useContext(AppContext)
    const { handleSubmit, register, formState: { errors, isSubmitting }, getValues } = useForm()
    const Navigate=useNavigate();
    useEffect(()=>{
        if(signin){
            Navigate("/")
        }
    },[signin])

    const submitHandler = (values) => {
        console.log("values: ", values);

        return new Promise((resolve) => {
            setTimeout(() => {
                axios.post("http://localhost:3000/td/login", values)
                    .then(response => {
                        console.log("response: ", response);
                        if (response.status == "201") {
                            Cookies.set("username",`${values.email}`)
                            // Cookies.set("token",`${response.data.token}`)
                            setSignin(true)
                        } else {
                            console.log(response.data.message)
                            setError(response.data.message)
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                resolve()
            }, 1000)
        })
    }


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
                        px="2vw"
                        py="1.6vh"
                        cursor={"pointer"}
                        position={"fixed"}
                        top={"0"}
                        left={"0"}
                        _hover={{ bg: "#F7174E" }}
                    >
                        Back
                    </Button>
                </Link>
                <Center>
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="4xl" color="black">Log In to your Account</Heading>
                        </Stack>
                        <VStack as="form" boxSize={{ base: 'xs', sm: 'sm', md: 'md' }} h="max-content !important" bg='#F7174E' rounded="lg" boxShadow="lg" p={{ base: 5, sm: 10 }} spacing={8} color="white" onSubmit={handleSubmit(submitHandler)}>
                            <VStack spacing={4} w="100%">
                                {error && error}
                                <FormControl>
                                    <FormLabel htmlFor='email'>Username / Email</FormLabel>
                                    <Input bg="white" rounded="md" id="email" type="text" color={"black"} {...register("email", { required: 'Enter Your email' })} />
                                    <Text color="white">
                                        {errors.email && errors.email.message}
                                    </Text>
                                </FormControl>
                                <FormControl >
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input bg="white" color={"black"} rounded="md" id="password" type={show ? 'text' : 'password'} {...register("password", { required: 'Enter Password', minLength: { value: 8, message: 'Enter minimum 8 chars' }, pattern: { value: '/^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])/', message: "Password Not Valid" } })} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" rounded="md" bg='#79b8f3' _hover={{ bg: useColorModeValue('gray.400', 'gray.800') }} onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <Text color="white">
                                        {errors.password && errors.password.message}
                                    </Text>
                                        {error && error}
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
    )
}

export default Login