import React from 'react'
import GameStart from './GameStart'
import Game from './Game'
import { AppContext } from '../context/ParentContext';
import { useContext } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import CreateTD from './CreateTD';

const Home = () => {
  const { category,setCategory} = useContext(AppContext)
  {console.log(category)}
  return (
    <div>
      <Navbar/>
      <div style={{ height: "88vh",width:"100%", textAlign: "center",display:"flex",justifyContent:"center",alignItems:"center" }}>
        {category ? <Game  /> : <GameStart />}
      </div>
      <CreateTD/>
      <Footer/>
    </div>
  )
}

export default Home