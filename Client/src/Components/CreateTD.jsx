import React, { useContext, useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useColorModeValue,
    Heading
} from '@chakra-ui/react';
import { AppContext } from '../context/ParentContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateTD = () => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const { category, setCategory, signin } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate()
    const handleOpenModal = () => {
        if (signin) {
            setIsOpen(true);
        } else {
            navigate("/login")
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setCategory('');
    };

    const overlayColor = useColorModeValue('rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)');

    const close = () => {
        setTimeout(handleCloseModal, 2000);
    };

    const FormSubmitHandler = async (data) => {
        try {
            let res = await axios.post('https://truth-and-dare-generator.onrender.com/td', data);
            if (res.status === 200) {
                toast.success("Submitted Successfully", { theme: "light" });
                close();
            } else {
                toast.error("Failed to Submit");
            }
        } catch (err) {
            console.error('Error posting TD:', err);
        }
    };

    return (
        <>
            <Button
                position="fixed"
                bottom="10"
                right="10"
                borderRadius="20%"
                textAlign="center"
                border="none"
                bgColor="#F7174E"
                color="white"
                cursor="pointer"
                fontSize="30px"
                height={"40px"}
                width={"40px"}
                onClick={handleOpenModal}
                _hover={{ bg: "#F7174E" }}
            >
                +
            </Button>

            <Modal isOpen={isOpen} onClose={handleCloseModal} blockScrollOnMount={false} isCentered>
                <ModalOverlay bg={overlayColor} />
                <ModalContent Center
                    bg="#F7174E"
                    minW="40vw"
                    maxH="80vh"
                    borderRadius="20px"
                    p="10"
                >
                    <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", justifyContent: "center", width: "100%", textAlign: "center", color: "white" }}>
                        <ModalCloseButton alignSelf="flex-end" width="2vmax" height="2vmax" borderRadius="10px" border="none"  cursor="pointer" />
                        <Heading>Add a Truth or Dare</Heading>
                    </div>

                    <form onSubmit={handleSubmit(FormSubmitHandler)} className='form-container'>
                        <ToastContainer />
                        <fieldset style={{ border: "1px white solid", borderRadius: "10px",padding:"2vmax" }}>
                            <h3>Your name : </h3>
                            <input type="text" placeholder='Your username' name='created_by' {...register("created_by", {
                                required: "Enter your name",
                                minLength: { value: 2, message: "Your name is too short" },
                                maxLength: { value: 100, message: "Maximum 100 chars only" }
                            })} />
                            <p className='err'>{errors.created_by?.message} </p>

                            <h3>Type : </h3>
                            <div style={{ padding: "3px", display: "flex", justifyContent: "space-around", color: "white" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" {...register("type", { required: "Select Type" })} value="truth" />
                                    <h4>Truth</h4>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" {...register("type", { required: "Select Type" })} value="dare" />
                                    <h4>Dare</h4>
                                </div>
                            </div>
                            <p className='err'>{errors.type?.message} </p>

                            <h3>Category : </h3>
                            <select {...register("category", { required: "Select a Category" })} style={{ height: '2vmax', fontSize: "1vmax" }} >
                                <option value="">Select Category</option>
                                <option value="Classic">Classic</option>
                                <option value="Teens">Teens</option>
                                <option value="Party">Party</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                            <p className='err'>{errors.category?.message} </p>

                            <h3>Text : </h3>
                            <input type="text" name='Text' placeholder='Truth / Dare' {...register("text", {
                                required: "Fill the Text",
                                minLength: { value: 6, message: "Your text is too short" },
                                maxLength: { value: 150, message: "Maximum 150 chars only" }
                            })} />
                            <p className='err'>{errors.text?.message} </p>

                            <input type="submit" value={"Submit"} />
                        </fieldset>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateTD;
