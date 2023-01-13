import React, { useContext } from "react"
import { Divider, Typography, Grid, ListItem, ListItemText } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MessengerContext } from "../context/MessengerProvider"
import DeleteBtn from "./DeleteBtn"

export default function Messenger(){
    const {msgs, chatWithUser, setChatWithUser, toggleDeleteBtn, isDeleteMsg} = useContext(MessengerContext)

    const containerStyle = {
        textAlign: "center",
        display: "flex",
        justifyContent: "space-evenly",
        paddingBottom: "8px"
    }
    
    const buttonStyle = {
        cursor: "pointer", 
        border: "none",
        borderRadius: "2px"
    }


    function getTime(timeOfMsg) {
        const fireBaseTime = new Date(timeOfMsg.seconds * 1000 + timeOfMsg.nanoseconds / 1000000)
        const date = fireBaseTime.toDateString()
        const atTime = fireBaseTime.toLocaleTimeString()
        return `${date} • ${atTime}`
    }

    return(
        <div>
            <Typography sx={containerStyle}>
                <Grid item display={{ xs: "block", sm: "none"}}>
                    <div style={buttonStyle} onClick={() => setChatWithUser("")}>
                        <FontAwesomeIcon icon={faCircleArrowLeft} style={{color: "#1976d2"}} />
                    </div>
                </Grid>
                {chatWithUser?.displayName}
                <button style={buttonStyle} onClick={toggleDeleteBtn}>{`Delete Messages ${isDeleteMsg ? "On" : "Off"}`}</button>
            </Typography>
            <Divider />
            <ListItem key="1">
                <Grid container>
                    <Grid item xs={12}>
                        {
                            msgs.map(msg => 
                                <>
                                    {isDeleteMsg ? <DeleteBtn msgId={msg.id} /> : null}
                                    <ListItemText align={chatWithUser.id === msg.sender ? "left" : "right"} primary={msg.text}></ListItemText>
                                    <ListItemText align={chatWithUser.id === msg.sender ? "left": "right"} secondary={getTime(msg.createdAt)}></ListItemText>
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </ListItem>
        </div>
    )
}