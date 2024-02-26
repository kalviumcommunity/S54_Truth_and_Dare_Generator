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

const Home = () => {
  const { category, setCategory,setSignin,setUserData } = useContext(AppContext)
  // { console.log(category) }
  useEffect(() => {
    const token = Cookies.get('token')
    axios.post("http://localhost:3000/td/userData", { token })
      .then(response => {
        console.log("userdata ", response.data.data);
        setSignin(true)
        setUserData(response.data.data)
        // document.cookie = `UserName=${response.data.data.name}`;
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
      <Footer />
    </div>
  )
}

export default Home