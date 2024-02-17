import React, { useContext } from 'react'
import arrow from "../assets/arrow-r.svg"
import classic from "../assets/classic.svg"
import party from "../assets/party.svg"
import mixed from "../assets/mixed.svg"
import teens from "../assets/teens.svg"
import curve from "../assets/curve.svg"
import { Button } from '@chakra-ui/button'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/ParentContext'


const GameStarter = () => {
    const { category, setCategory } = useContext(AppContext)
    return (
        <div className="game-starter" style={{
            height: '78%',
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid',
            borderRadius: '25px',
            textAlign: 'center'
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
                    width: "100%",
                    textAlign: "center",
                    top: '25%',
                    fontSize: 'larger'
                }}>
                    <h1>Truth or Dare</h1>
                </div>
            </div>


            <div className='categories' style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '3vmax'
            }}>
                <Button className='category' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '50px',
                    padding: '1vmin 2vmin',
                    cursor: 'pointer',
                    alignItems: "center"
                    // backgroundColor: '#EAF0FF'
                }} onClick={() => setCategory('Classic')}>
                    <div className="category-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.9vmax',
                        fontWeight: '600'
                    }}>
                        <img src={classic} alt="" />
                        <span>Classic</span>
                    </div>
                    <img src={arrow} alt="" />
                </Button>
                <Button className='category' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '50px',
                    padding: '1vmin 2vmin',
                    cursor: 'pointer'
                }} onClick={() => setCategory('Party')}>
                    <div className="category-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.9vmax',
                        fontWeight: '600'
                    }}>
                        <img src={party} alt="" />
                        <span>Party</span>
                    </div>
                    <img src={arrow} alt="" />
                </Button>
                <Button className='category' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '50px',
                    padding: '1vmin 2vmin',
                    cursor: 'pointer'
                }} onClick={() => setCategory('Teens')}>
                    <div className="category-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.9vmax',
                        fontWeight: '600'
                    }}>
                        <img src={teens} alt="" />
                        <span>Teens</span>
                    </div>
                    <img src={arrow} alt="" />
                </Button>
                <Button className='category' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '50px',
                    padding: '1vmin 2vmin',
                    cursor: 'pointer'
                }} onClick={() => setCategory('Mixed')}>
                    <div className="category-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.9vmax',
                        fontWeight: '600'
                    }}>
                        <img src={mixed} alt="" />
                        <span>Mixed</span>
                    </div>
                    <img src={arrow} alt="" />
                </Button>
            </div>
        </div>
    )
}

export default GameStarter