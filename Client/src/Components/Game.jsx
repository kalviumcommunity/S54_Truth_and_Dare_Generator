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

const Game = () => {
    const { category, setCategory } = useContext(AppContext)
    const [truthData, setTruthData] = useState([])
    const [dareData, setDareData] = useState([])
    const [selectedTruth, setSelectedTruth] = useState(null)
    const [selectedDare, setSelectedDare] = useState(null)
    const [key, setKey] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
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
        }
        fetchData()
    }, [category, key]) 

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
                    fontSize: 'larger'
                }}>
                    <h1>Spin the wheel</h1>
                </div>
            </div>
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
                    fontWeight: '600'
                }}>
                    {
                        {
                            Classic: <img src={Classic} alt="" />,
                            Party: <img src={Party} alt="" />,
                            Teens: <img src={Teens} alt="" />,
                            Mixed: <img src={Mixed} alt="" />
                        }[category] || <img src={Classic} alt="" />}
                    <span>{category}</span>
                </div>
                <img src={arrow} alt="" style={{ transform: "rotate(90deg)" }} />
            </button>
            <div style={{ padding: "1vmax 3vmax" }}>
                {selectedTruth && (
                    <>
                        <h2 style={{ textDecoration: "underline" }}>Truth</h2>
                        <br />
                        <h3 style={{ fontFamily: "Open Sans" }}>{selectedTruth.text}</h3>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <ThumbUpOutlinedIcon />
                            <h3> {selectedTruth.likes}</h3>
                        </div>
                    </>
                )}
                {selectedDare && (
                    <>
                        <h2 style={{ textDecoration: "underline" }}>Dare</h2>
                        <br />
                        <h3 style={{ fontFamily: "Open Sans" }}>{selectedDare.text}</h3>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <ThumbUpOutlinedIcon />
                            <h3> {selectedDare.likes}</h3>
                        </div>
                    </>
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