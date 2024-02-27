import React, { useEffect } from 'react'
import GameStart from './GameStart'
import Game from './Game'
import { AppContext } from '../context/ParentContext';
import { useContext } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import CreateTD from './CreateTD';
import Cookies from 'js-cookie';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';

const Home = () => {
  const { category, setCategory,signin,setSignin,setUserData } = useContext(AppContext)
  // { console.log(category) }
  useEffect(() => {
    const token = Cookies.get('token')
    axios.post("https://truth-and-dare-generator.onrender.com/td/userData", { token })
      .then(response => {
        console.log("userdata ", response.data.data);
        setSignin(true)
        setUserData(response.data.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  return (
    <div>
      <Navbar />
      <div style={{ height: "88vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {category ? <Game /> : <GameStart />}
      </div>
      <CreateTD />
      {signin && <DropdownMenu/>}
      <Footer />
    </div>
  )
}

export default Home