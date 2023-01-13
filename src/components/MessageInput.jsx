import React, {useContext} from "react"
import { Grid, Fab } from "@mui/material"
import { MessengerContext } from "../context/MessengerProvider"
import InputEmoji from "react-input-emoji"
import SendIcon from "@mui/icons-material/Send"

export default function MessageInput() {
    const { messageInput, handleMessageSubmit, chatWithUser, setMessageInput } = useContext(MessengerContext)

    return(
        <Grid container style={{padding: "20px"}}>
            <Grid item xs={11}>
                <InputEmoji 
                    value={messageInput}
                    placeholder={chatWithUser.length === 0 ? "Click on a member to type a message" : `Type a message to ${chatWithUser.displayName} `}
                    onChange={setMessageInput} 
                    fullWidth
                />
            </Grid>
            <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add" disabled={messageInput === "" || chatWithUser.length === 0 ? true : false}>
                    <SendIcon onClick={handleMessageSubmit} />
                </Fab>
            </Grid>
        </Grid>
    )
}