import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button'
import curve from "../assets/curve.svg"
import arrow from "../assets/arrow-r.svg"
import { AppContext } from '../context/ParentContext'
import Classic from "../assets/classic.svg"
import Party from "../assets/party.svg"
import Mixed from "../assets/mixed.svg"
import Teens from "../assets/teens.svg"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
    const { category, setCategory, signin } = useContext(AppContext)
    const [truthData, setTruthData] = useState([])
    const [dareData, setDareData] = useState([])
    const [selectedTruth, setSelectedTruth] = useState(null)
    const [selectedDare, setSelectedDare] = useState(null)
    const [key, setKey] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get('https://truth-and-dare-generator.onrender.com/td')
                const data = response.data
                const filteredTruthData = data.filter(item => item.category === `${category}` && item.type === 'truth')
                const filteredDareData = data.filter(item => item.category === `${category}` && item.type === 'dare')
                setTruthData(filteredTruthData)
                console.log("filteredTruthData: ", filteredTruthData)
                setDareData(filteredDareData)
                console.log("filteredDareData: ", filteredDareData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [category])

    const handleTruthClick = () => {
        setSelectedTruth(truthData[Math.floor(Math.random() * truthData.length)])
        setSelectedDare(null)
        setKey(prevKey => prevKey + 1)
    }

    const handleDareClick = () => {
        setSelectedDare(dareData[Math.floor(Math.random() * dareData.length)])
        setSelectedTruth(null)
        setKey(prevKey => prevKey + 1)
    }
    const emptyCategory = () => {
        setCategory('')
    }
    const handleLikeClick = async (type, itemId) => {
        if (signin) {
            try {
                const res = await axios.patch(`https://truth-and-dare-generator.onrender.com/td/${itemId}`, { action: 'like' });
                console.log("response: ", res);
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
            window.alert("Please Login to use that feature")
        }
    };

    const handleDeleteClick = async (itemId) => {
        if (signin) {
            try {
                const res = await axios.delete(`https://truth-and-dare-generator.onrender.com/td/${itemId}`);
                console.log("res: ", res);
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
            window.alert("Please Login to use that feature")
        }
    }
    return (
        <div className="game" style={{
            height: '78%',
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid',
            alignItems: "center",
            borderRadius: '25px',
            textAlign: 'center',
            position: "relative"
        }}>
            <ToastContainer />
            <div className="curve-container" style={{
                width: '100%',
                height: '30%',
                borderRadius: '25px 25px 0 0',
                overflow: 'hidden',
                position: 'relative',
                objectFit: "cover"
            }}>
                <img src={curve} width={"100%"} alt="" className="curve-img" />
                <div className="title" style={{
                    color: 'white',
                    position: 'absolute',
                    width: "100%",
                    textAlign: "center",
                    top: '25%',
                    left:"29%",
                    fontSize: 'larger'
                }}>
                    {/* <h1>Spin the wheel</h1> */}
                    <button className='category' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '50px',
                        paddingRight: '2vmin',
                        cursor: 'pointer',
                        width: "40%",
                        alignItems: 'center',
                        backgroundColor: '#EAF0FF'
                    }} onClick={() => setCategory('')}>
                        <div className="category-content" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            fontSize: '1.5vmax',
                            fontWeight: '600',
                            marginLeft:"1vmax"
                        }}>
                            {
                                {
                                    Classic: <img src={Classic} alt="" />,
                                    Party: <img src={Party} alt="" />,
                                    Teens: <img src={Teens} alt="" />,
                                    Mixed: <img src={Mixed} alt="" />
                                }[category] || <img src={Classic} alt="" />}
                            <h3>{category}</h3>
                        </div>
                        <img src={arrow} alt="" style={{ transform: "rotate(90deg)" }} />
                    </button>
                </div>
            </div>

            <div style={{ padding: "1vmax 2vmax" }}>
                {isLoading && (<>   <div className="loader"></div>  </>)}
                {selectedTruth && (
                    <div style={{ width: "100%" }}>
                        <h1 style={{ textDecoration: "underline" }}>Truth</h1>
                        <br />
                        <h2 style={{ fontFamily: "Open Sans" }}>{selectedTruth.text}</h2>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                {/* <h3>Created by: {selectedTruth.created_by}</h3> */}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <Button onClick={() => handleLikeClick('truth', selectedTruth._id)} style={{ cursor: "pointer", border: "none", backgroundColor: "white" }} id='LikeButton'>
                                    <ThumbUpOutlinedIcon />
                                </Button>
                                <h3>{selectedTruth.likes}</h3>
                                <button onClick={() => handleDeleteClick(selectedTruth._id)} style={{ cursor: "pointer", border: "none", backgroundColor: "white", marginLeft: "7px", marginTop: "3px" }} id='deleteButton'>
                                    <DeleteOutlineIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {selectedDare && (
                    <div style={{ width: "100%" }}>
                        <h1 style={{ textDecoration: "underline" }}>Dare</h1>
                        <br />
                        <h2 style={{ fontFamily: "Open Sans" }}>{selectedDare.text}</h2>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                {/* <h3>Created by: {selectedDare.created_by}</h3> */}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <Button onClick={() => handleLikeClick('dare', selectedDare._id)} style={{ cursor: "pointer", border: "none", backgroundColor: "white" }} id='LikeButton'>
                                    <ThumbUpOutlinedIcon />
                                </Button>
                                <h3 >{selectedDare.likes}</h3>
                                <button onClick={() => handleDeleteClick(selectedDare._id)} style={{ cursor: "pointer", border: "none", backgroundColor: "white", marginLeft: "7px", marginTop: "3px" }} id='deleteButton'>
                                    <DeleteOutlineIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='button-container' style={{ width: "100%", display: "flex", justifyContent: "space-around", position: "absolute", bottom: "2vmin" }}>
                <Button
                    bg="#069DFF"
                    color="white"
                    fontSize="1.7vmax"
                    fontWeight="600"
                    borderRadius="50px"
                    border="none"
                    px="2vw"
                    py="1.6vh"
                    width={"11vmax"}
                    cursor={"pointer"}
                    _hover={{ boxShadow: "1px 10px 8px #888888" }}
                    onClick={handleTruthClick}
                    _active={{ transform: "scale(0.96)" }}
                >
                    Truth
                </Button>
                <Button
                    bg="#FF5B1A"
                    color="white"
                    fontSize="1.7vmax"
                    fontWeight="600"
                    borderRadius="50px"
                    border="none"
                    width={"11vmax"}
                    px="2vw"
                    py="1.6vh"
                    cursor={"pointer"}
                    _hover={{ boxShadow: "1px 10px 8px #888888" }}
                    _active={{ transform: "scale(0.96)" }}
                    onClick={handleDareClick}
                >
                    Dare
                </Button>
            </div>
        </div>
    )
}

export default Game
