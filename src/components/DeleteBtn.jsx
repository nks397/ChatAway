import React, {useContext} from "react"
import { MessengerContext } from "../context/MessengerProvider"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

export default function DeleteBtn(props) {
    const {msgId} = props
    const {handleDeleteMsg} = useContext(MessengerContext)

    const deleteMsgStyle = {
        cursor: "pointer", 
        "&:hover": {
            transition:"0.4s",
            color: "red"
        }
    }

    return(
        <div>
            <DeleteOutlineIcon 
                sx={deleteMsgStyle} 
                onClick={() => handleDeleteMsg(msgId)}
            >
            </DeleteOutlineIcon>
        </div>
    )
}