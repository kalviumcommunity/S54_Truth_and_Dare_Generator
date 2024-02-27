import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DropdownMenu = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [tds,setTDS]=useState([])
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('https://truth-and-dare-generator.onrender.com/td/users')
                const userdata = response.data
                console.log("userdata: ", userdata);
                setUsers(userdata)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchUserData()
        const fetchTDdata=async()=>{
            try{
                const res=await axios.get("https://truth-and-dare-generator.onrender.com/td")
                const TDdata=res.data
                console.log("TDdata: ", TDdata);
                setTDS(TDdata)
            }catch(err){
                console.log(err)
            }
        }
        fetchTDdata()
    }, [])
    return (
        <div style={{ width: "100%",minHeight:"10vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <select style={{ height: '2vmax', fontSize: "1vmax" }} onChange={(e) => setSelectedUser(e.target.value)} >
                <option value="">Select Users</option>
                {users.map((user, id) => {
                    return <option key={id} value={`${user.name}`}>{user.name}</option>
                })}
            </select>
            {selectedUser &&
                <div style={{border:"1px solid black",padding:"1vmax",borderRadius:"15px",margin:"2vh"}}>
                    {
                        tds.filter((td)=>{
                            return td.created_by === selectedUser
                        }).map((td,id)=>{
                            return (<h4 id='userText'>{td.text}</h4>)
                        })
                    }
                </div>
            }
        </div>
    )
}

export default DropdownMenu