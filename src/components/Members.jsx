import React, {useContext, useEffect} from "react"
import { UserContext } from "../context/UserProvider"
import { Grid, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material"
import { MessengerContext } from "../context/MessengerProvider"

export default function Members(){
    const { allUsers, authInputs, currentUser } = useContext(UserContext)
    const { chatWithUser, setChatWithUser, retrieveMsgs, msgs, setMessageInput, initInputs, setIsDeleteMsg } = useContext(MessengerContext)
    
    useEffect(() => {
        retrieveMsgs()
    }, [chatWithUser])

    return(
        <Grid item xs={12}>
            <div style={{height: "65vh", overflowY: "auto"}}>
                {
                    allUsers.filter(users => {
                        if(authInputs.searchUsers === ""){
                            return users.displayName
                        }else if(users.displayName.toLowerCase().includes(authInputs.searchUsers.toLowerCase())){
                            return users.displayName
                        }
                    })
                    .sort((a, b) => a.displayName.localeCompare(b.displayName))
                    .map(users => users.id !== currentUser.uid ?
                        <>
                            <div onClick={() => {
                                if(users.displayName){
                                    setChatWithUser(users)
                                    retrieveMsgs()
                                    console.log(msgs, "check")
                                    console.log(chatWithUser, "chat")
                                    setMessageInput(initInputs)
                                    setIsDeleteMsg(false)
                                } else {
                                    return null
                                }
                            }}>
                                <List>
                                    <ListItem button key={users.displayName}>
                                        {console.log(users.photoURL, "members url", users.displayName)}
                                        <ListItemIcon>
                                            <Avatar alt={users.displayName} src={users.photoURL} />
                                        </ListItemIcon>
                                        <ListItemText primary={users.displayName}>{users.displayName}</ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </>
                        :
                        null
                    )
                }
            </div>
        </Grid>
    )
}