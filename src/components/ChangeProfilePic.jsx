import { Box } from "@mui/material"
import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"

export default function ChangeProfilePic() {
    const { handleImageChange, handleImageSubmit, photoURL } = useContext(UserContext)

    const inputStyle = {
        margin: "0",
        backgroundColor:" rgb(25 118 210)",
        borderRadius: "2px"
    }

    const submitBtnStyle = {
        cursor: "pointer", 
        border: "none",
        borderRadius: "2px",
        padding: "5px",
        boxShadow: "4px 2px 5px 0px rgba(0,0,0,0.52)"
    }

    return(
        <Box sx={{textAlign: "center"}}>
            <img src={photoURL} style={{width: "50%", height: "50%", padding: "15px"}} />
            <input style={inputStyle} type="file" onChange={handleImageChange} />
            <Box sx={{textAlign: "center", paddingTop: "20px"}}>
                <button style={submitBtnStyle} onClick={handleImageSubmit}>Submit</button>
            </Box>
        </Box>
    )
}