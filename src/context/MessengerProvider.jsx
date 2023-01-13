import React, { useContext, useState, useEffect, useRef } from "react"
import { UserContext } from "./UserProvider"
import { db } from "../../firebaseConfig"
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  Timestamp,
  deleteDoc,
  doc
} from "firebase/firestore"

export const MessengerContext = React.createContext()

export default function MessengerProvider(props){

    const [messageInput, setMessageInput] = useState("")
    const [chatWithUser, setChatWithUser] = useState([])
    const [msgs, setMsgs] = useState([])
    const [isDeleteMsg, setIsDeleteMsg] = useState(false)

    const { currentUser } = useContext(UserContext)

    const user1 = currentUser?.uid
    const user2 = chatWithUser?.id
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    
    function retrieveMsgs() {
        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgsArr = []
            querySnapshot.forEach((doc) => {
                msgsArr.push({id: doc.id, ...doc.data()})
            })
            console.log(msgsArr, "MA")
            setMsgs(msgsArr)
        })
    }
    
    function handleMessageSubmit(e) {
        e.preventDefault()

        addDoc(collection(db, "messages", id, "chat"), {
            text: messageInput,
            sender: user1,
            recipient: user2,
            createdAt: Timestamp.fromDate(new Date()),
        })

        setMessageInput("")
    }
    
    //delete firebase messages
    function handleDeleteMsg(messageId) {
        deleteDoc(doc(db, "messages", id, "chat", messageId))
    }
    
    function toggleDeleteBtn() {
        setIsDeleteMsg(prev => !prev)
    }

    return (
        <MessengerContext.Provider
            value={{
                chatWithUser,
                setChatWithUser,
                messageInput,
                handleMessageSubmit,
                setMessageInput,
                handleDeleteMsg,
                msgs, 
                setMsgs,
                retrieveMsgs,
                user1,
                user2,
                id,
                toggleDeleteBtn,
                isDeleteMsg,
                setIsDeleteMsg,
            }}
        >
            {props.children}
        </MessengerContext.Provider>
    )
}