import React from "react"
import { Typography, Box } from "@mui/material"
import paperPlane from "../assets/PaperPlane.png"

export default function Welcome() {

    const boxStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh"
    }

    const welcomeTextStyle = {
        textAlign: "center",
        fontFamily: "Satisfy",
        fontSize: "4vh"
    }

    return(
        <div>
            <Box sx={boxStyles}>
                <img src={paperPlane} alt="" style={{height: "8vh", textAlign: "center"}}/>
                <Typography sx={welcomeTextStyle} className="welcomeText">Welcome to Chat Away! Click on a member to start chatting.</Typography>
            </Box>
        </div>
    )
}