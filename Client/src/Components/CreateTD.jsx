import { useContext, useState } from 'react'
import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useColorModeValue
} from '@chakra-ui/react'
import Forms from './Forms'
import { AppContext } from '../context/ParentContext'


const CreateTD = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { category, setCategory,signin } = useContext(AppContext)

    const handleOpenModal = () => {
        if(signin){
            setIsOpen(true)
        }else{
            window.alert("Please login to add the data")
        }
    }

    const handleCloseModal = () => {
        setIsOpen(false)
        setCategory('')
    }

    const overlayColor = useColorModeValue('rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)')

    return (
        <>
            <Button
                position="fixed"
                bottom="20"
                right="20"
                width="2.5vmax"
                height="2.5vmax"
                borderRadius="20%"
                textAlign={"center"}
                border={"none"}
                bgColor="#F7174E"
                color="white"
                cursor={"pointer"}
                // boxShadow="lg"
                onClick={handleOpenModal}
                fontSize="30px"
            >
                +
            </Button>

            <Modal isOpen={isOpen} onClose={handleCloseModal}  >
                <ModalOverlay bg={overlayColor} />
                <ModalContent
                    bg="#F7174E"
                    w="40vw"
                    h="74vh"
                    position={"fixed"}
                    top={"21%"}
                    left={"29%"}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="20px"
                    p="10"
                >
                    <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", justifyContent: "center", width: "100%", textAlign: "center", color: "white" }}>
                        <ModalCloseButton alignSelf={"flex-end"} width={"2vmax"} height={"2vmax"} borderRadius={"10px"} border={"none"} color={"#F7174E"} cursor={"pointer"}/>
                        <h1>Add a Truth or Dare</h1>
                    </div>

                    <Forms handleCloseModal={handleCloseModal} />

                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateTD
