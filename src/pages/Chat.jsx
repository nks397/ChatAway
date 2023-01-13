import React, { useContext } from "react"
import { Grid, Divider, List } from "@mui/material"
import Members from "../components/Members"
import { MessengerContext } from "../context/MessengerProvider"
import Messenger from "../components/Messenger"
import Welcome from "../components/Welcome"
import SearchInput from "../components/SearchInput"
import MessageInput from "../components/MessageInput"

const chatSection = {
    width: "100%",
}

const borderRight500 = {
    borderRight: "1px solid #e0e0e0",
}

const messageArea = {
    height: "70vh",
    overflowY: "auto",
}

export default function Chat(){
    const { chatWithUser } = useContext(MessengerContext)

    return (
      <div>
        <Grid container sx={chatSection}>
            <Grid item xs={12} sx={borderRight500} display={{ sm: "none"}}>
                { chatWithUser?.length === 0 ?
                    <>
                        <SearchInput />
                        <Divider />
                        <Members />
                    </>
                    :
                    <>
                        <List sx={messageArea}>
                            <Messenger />  
                        </List>
                        <Divider />
                        <MessageInput />
                    </>
                }
            </Grid>
            <Grid item sm={3} md={3} sx={borderRight500} display={{ xs: "none", sm: "block"}}>
                <SearchInput />
                <Divider />
                <Members />
            </Grid>
            <Grid item xs={9} display={{ xs: "none", sm: "block"}}>
                <List sx={messageArea}>
                    {chatWithUser?.length === 0 ? <Welcome /> : <Messenger />}
                </List>
                <Divider />
                <MessageInput />
            </Grid>
        </Grid>
      </div>
  )
}