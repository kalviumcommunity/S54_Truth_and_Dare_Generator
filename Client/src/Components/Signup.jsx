import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Signup = () => {
    const [show, setShow] = useState(false);
    const [cShow, setCShow] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClick2 = () => setCShow(!cShow);
    const [error, setError] = useState(null)
    const Navigate=useNavigate()
    const { handleSubmit, register, formState: { errors, isSubmitting }, getValues } = useForm()


    const submitHandler = (values) => {
        console.log("values: ", values);
        return new Promise((resolve) => {
            setTimeout(() => {
                axios.post("https://truth-and-dare-generator.onrender.com/td/register", values)
                    .then(response => {
                        if (response.data == "User already exists") {
                            setError("User already exists with this email");
                        }
                        console.log("response: ", response);
                        toast.success("Account created successfully! Please log in.")
                        setTimeout(()=>{
                            Navigate("/login")
                        },2500)
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
            <ToastContainer />
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
                        <img src="arrow" alt="" style={{ transform: "rotate(90deg)" }} />
                        Back
                    </Button>
                </Link>
                <Center>
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="4xl" color="black">Register Your Account</Heading>
                        </Stack>
                        <VStack as="form" boxSize={{ base: 'xs', sm: 'sm', md: 'md' }} h="max-content !important" bg='#F7174E' rounded="lg" boxShadow="lg" p={{ base: 5, sm: 10 }} spacing={8} color="white" onSubmit={handleSubmit(submitHandler)}>
                            <VStack spacing={4} w="100%">
                                {error && error}
                                <FormControl >
                                    <FormLabel htmlFor='name'>Your Full Name</FormLabel>
                                    <Input bg="white" rounded="md" id="name" type="text" color={"black"}{...register("name", { required: 'Enter Your Full Name', minLength: { value: 4, message: 'Enter minimum 4 letters' } })} />
                                    <Text color="white">
                                        {errors.Name && errors.name.message}
                                    </Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='email'>Username / Email</FormLabel>
                                    <Input bg="white" rounded="md" id="email" type="text" color={"black"} {...register("email", { required: 'Enter Your email or username' })} />
                                    <Text color="white">
                                        {errors.email && errors.email.message}
                                        {error && error}
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
                                </FormControl>
                                {/* <FormControl >
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input bg="white" color={"black"} rounded="md" id='confirmPassword' type={cShow ? 'text' : 'password'} {...register("confirmPassword", { required: 'Confirm Your Password', validate: value => value === getValues("password") || "The passwords do not match" })} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" rounded="md" bg='#79b8f3' onClick={handleClick2}>
                                                {cShow ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <Text color="white">
                                        {errors.confirmPassword && errors.confirmPassword.message}
                                    </Text>
                                </FormControl> */}
                            </VStack>
                            <VStack w="100%">
                                <Button color="white" bg={"green"} rounded="md" w="100%" isLoading={isSubmitting} type='submit' _hover={{ bg: "green" }}>
                                    <h1>Sign up</h1>
                                </Button>
                                <Stack direction="row" justifyContent="center" w="100%">
                                    <Link to="/login" fontSize={{ base: 'md', sm: 'md' }} style={{ textDecoration: "underline" }} >Have an account?, Log in </Link>
                                </Stack>
                            </VStack>
                        </VStack>
                    </Stack>
                </Center>
            </Container>
        </ChakraProvider>
    );
};

export default Signup;