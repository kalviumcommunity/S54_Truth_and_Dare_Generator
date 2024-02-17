import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button'
import curve from "../assets/curve.svg"
import arrow from "../assets/arrow-r.svg"
import { AppContext } from '../context/ParentContext'
import Classic from "../assets/classic.svg"
import Party from "../assets/party.svg"
import Mixed from "../assets/mixed.svg"
import Teens from "../assets/teens.svg"


const Game = () => {
    const { category, setCategory } = useContext(AppContext)

    return (
        <div className="game" style={{
            height: '78%',
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            border: '1px solid',
            alignItems: "center",
            borderRadius: '25px',
            textAlign: 'center',
            position:"relative"
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
                    zIndex: '999',
                    width:"100%",
                    textAlign:"center",
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
                padding: '1vmin 2vmin',
                cursor: 'pointer',
                width: "45%",
                alignItems: 'center',
                backgroundColor: '#EAF0FF'
            }} onClick={() => setCategory('')}>
                <div className="category-content" style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.9vmax',
                    fontWeight: '600'
                }}>
                    {{
                        Classic: <img src={Classic} alt="" />,
                        Party: <img src={Party} alt="" />,
                        Teens: <img src={Teens} alt="" />,
                        Mixed: <img src={Mixed} alt="" />
                    }[category] || <img src={Classic} alt="" />}
                    <span>{category}</span>
                </div>
                <img src={arrow} alt="" style={{ transform: "rotate(90deg)" }} />
            </button>

            {/* <div>
                <h2>Dare</h2>
                <h3>You have dares left.</h3>
            </div> */}

            <div className='button-container' style={{ width: "100%", display: "flex", justifyContent: "space-around", position:"absolute",bottom:"2vmin"}}>
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
                    boxShadow={"1px 10px 8px #888888"}
                    // _active={transform(scale())}
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
                    boxShadow={"1px 10px 8px #888888"}
                    // _active={transform(scale())}
                >
                    Dare
                </Button>
            </div>

        </div>
    )
}

export default Game