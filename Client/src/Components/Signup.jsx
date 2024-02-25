import { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"


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

const Signup = () => {
    const [show, setShow] = useState(false);
    const [cShow, setCShow] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClick2 = () => setCShow(!cShow);
    const [error, setError] = useState(null)

    const { handleSubmit, register, formState: { errors, isSubmitting }, getValues } = useForm()


    const submitHandler = (values) => {


        return new Promise((resolve) => {
            setTimeout(() => {
                const { Name, email, password, confirmPassword } = values
                // console.log(Name,email,password, confirmPassword)
                fetch("http://localhost:3000/user", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "content-type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        Name, email, password, confirmPassword
                    })
                }).then((res) => res.json())
                    .then((data) => {
                        if (data.message == "User already exists") {
                            setError("User already exists with this mail")
                        }
                    }).catch((err) => console.log(err))
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
                        // fontWeight="100"
                        borderRadius="50px"
                        border="none"
                        margin={"1vw"}
                        px="2vw"
                        py="1.6vh"
                        cursor={"pointer"}
                        position={"fixed"}
                        top={"0"}
                        left={"0"}
                        _hover={{bg:"#F7174E"}}
                    >
                        <img src="arrow" alt="" style={{ transform: "rotate(90deg)"  }} />
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
                                <FormControl >
                                    <FormLabel htmlFor='Name'>Your Full Name</FormLabel>
                                    <Input bg="white" rounded="md" id="Name" type="text" {...register("Name", { required: 'Enter Your Full Name', minLength: { value: 4, message: 'Enter minimum 4 letters' } })} />
                                    <Text color="white">
                                        {errors.Name && errors.Name.message}
                                    </Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input bg="white" rounded="md" id="email" type="email" {...register("email", { required: 'Enter Your email' })} />
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
                                <FormControl >
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
                                </FormControl>
                            </VStack>
                            <VStack w="100%">
                                <Button color="white" bg={"green"} rounded="md" w="100%" isLoading={isSubmitting} type='submit' _hover={{bg:"green"}}>
                                    <h1>Sign in</h1>
                                </Button>
                                <Stack direction="row" justifyContent="center" w="100%">
                                    <Link to="/login" fontSize={{ base: 'md', sm: 'md' }} _hover={{ textDecoration: "underline" }} >Have an account, Log in </Link>
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