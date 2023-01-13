import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Grid, Divider, TextField, List, ListItem,  ListItemText } from "@mui/material"

export default function SearchInput() {
    const { authHandleChange, authInputs, currentUser } = useContext(UserContext)

    return(
        <div>
            <List>
                <ListItem>
                    <ListItemText sx={{textAlign: "center"}}>{currentUser.displayName}</ListItemText>
                </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{padding: "10px"}}>
                <TextField 
                    id="outlined-basic-email" 
                    type="search"
                    name="searchUsers"
                    label="Search" 
                    value={authInputs.searchUsers}
                    onChange={authHandleChange}
                    variant="outlined" 
                    fullWidth 
                />
            </Grid>
        </div>
    )
}