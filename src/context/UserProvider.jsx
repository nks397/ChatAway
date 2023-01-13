import React, { useState, useEffect } from "react"
import { setDoc, doc, query, collection, onSnapshot } from "firebase/firestore"
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../../firebaseConfig.jsx";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const UserContext = React.createContext()

export default function UserProvider(props) {
    
    const provider = new GoogleAuthProvider();
    
    const initInputs = {
        username: "",
        email: "",
        password: "",
        reEnterPassword: "",
        searchUsers: ""
    }
    
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)
    const [authInputs, setAuthInputs] = useState(initInputs)
    const [errMsg, setErrMsg] = useState(null)
    const [allUsers, setAllUsers] = useState([])
    const [isAuthToggled, setIsAuthToggled] = useState(false)
    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false)  
    const [photoURL, setPhotoURL] = useState(null) //use current user state instead
    const [showPassword, setShowPassword] = useState(false)
    const [showReEnterPassword, setShowReEnterPassword] = useState(false)
    const capitalizedUsername = authInputs.username.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setPending(false)
        })
        getUsers()
    },[])
    
    useEffect(() => {
        if(currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    },[currentUser, photoURL])
    
    if(pending) {
        return <>Loading...</>
    }
        
    function authHandleChange(e) {
        const {name, value} = e.target
        console.log("is auth hit?")
        setAuthInputs(prevInput => ({
        ...prevInput,
        [name]:value
        }))
    }

    function toggleAuth() {
        setIsAuthToggled(prevToggle => !prevToggle)
        setAuthInputs(initInputs)
        setErrMsg("")
        setShowPassword(false)
        setShowReEnterPassword(false)
    }  

    function signUpWithEmail(e) {
        e.preventDefault()
      
        const userFound = allUsers.map(users => users.displayName.toLowerCase() === authInputs.username.toLowerCase())
        //if all are equal to false, this will return true
        const noUserFound = allUsers.every(users => users.displayName.toLowerCase().includes(authInputs.username.toLowerCase()) === false)

        if(authInputs.username === "" || authInputs.email === "" || authInputs.password === "" || authInputs.reEnterPassword === ""){
            setErrMsg("all fields are required")
        }
        if(authInputs.password.length < 6){
            setErrMsg("Password does not contain 6 or more characters.")
        }
        if(userFound.includes(true) && authInputs.username !== ""){
            setErrMsg("username already exists")
        }
        if(authInputs.password !== authInputs.reEnterPassword){
            setErrMsg("password and re-entered password does not match")
        }
        if(authInputs.password === authInputs.reEnterPassword && noUserFound) {
            setErrMsg("")
            createUserWithEmailAndPassword(auth, authInputs.email, authInputs.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user

                //add display name value to user object
                updateProfile(auth.currentUser, {
                    displayName: capitalizedUsername,
                    photoURL: user.photoURL
                })
                
                //adds doc to firestore database
                setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    //uppercase first letters of words
                    displayName: capitalizedUsername,
                    photoURL: user.photoURL
                })
                
                setErrMsg("")
                // alert("Successful signUp!")
            })
            .catch((error) => {
                console.log(error, "error")
                const errorCode = error.code;
            
                setErrMsg(errorCode)
              
            })
        }  
    }
    console.log(errMsg, "errMsg test")
    
    function getUsers() {
        onAuthStateChanged(auth, user => {
            const q = query(collection(db, "users"))

            onSnapshot(q, (querySnapshot) => {
              let allUsersArr = []

              querySnapshot.forEach(doc => {
                console.log(doc, "doc test")
                allUsersArr.push({id: doc.id, ...doc.data()})
              })

              setAllUsers(allUsersArr)
              
            })
          })
    }

    function loginWithEmail(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, authInputs.email, authInputs.password)
        .then((userCredential) => {
            // Signed in 
            setErrMsg("")

            const user = userCredential.user

            setCurrentUser(user)

            // alert("Successful login!")
        })
        .catch((error) => {
            console.log(error, "error")
            setErrMsg("username or password is incorrect")
        })
    }
    
    function signInWithGoogle() {
        signInWithPopup(auth, provider)
        .then(res => console.log(res, "res"))
      .catch(err => console.log(err, "err"))
    }
    
    function signOutOfAccount() {
        signOut(auth)
        .then(() => {
            console.log("signOut")
        })
        .catch(err => console.log(err, "signOut error"))
        setCurrentUser(null)
        setPhotoURL(null)
    }
    
    function createUserDocument() {
        //grabbing current user id
        onAuthStateChanged(auth, user => {
            if (user) {
                setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                })
             
                setCurrentUser(user)
              
            } else {
                // User not logged in or has just logged out.
                if(!user) return;
            }
        })
    }

    function handleGoogleSubmit(e) {
        e.preventDefault()
        signInWithGoogle()
        createUserDocument()
    }

    function handleImageChange(e) {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    function handleImageSubmit() {
        const imageRef = ref(storage, currentUser.uid)
        uploadBytes(imageRef, image)
        .then(() => {
            getDownloadURL(imageRef)
            .then(url => {
                setPhotoURL(url)
                updateProfile(currentUser, {photoURL: url})
                
                setDoc(doc(db, "users", currentUser.uid), 
                {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: url
                }
                )
            })
            .catch(error => {
                console.log(error.message, "error getting the image url")
            })
        })
        .catch(error => {
            console.log(error.message, "error uploading image")
        })
    }

    function onOpenModal() {
        setOpen(true)
      }
    
    function onCloseModal() {
        setOpen(false)
    }

    function handleClickShowPassword() {
        setShowPassword(prev => !prev)
    }

    function handleClickShowReEnterPassword() {
        setShowReEnterPassword(prev => !prev)
    }

    return(
        <UserContext.Provider
            value={{
                currentUser,
                signInWithGoogle,
                signOutOfAccount,
                loginWithEmail,
                createUserDocument,
                signUpWithEmail,
                authInputs,
                setAuthInputs,
                initInputs,
                authHandleChange,
                handleGoogleSubmit,
                errMsg,
                setErrMsg,
                getUsers,
                isAuthToggled,
                setIsAuthToggled,
                toggleAuth,
                allUsers,
                handleImageChange,
                handleImageSubmit,
                onOpenModal,
                onCloseModal,
                open,
                photoURL,
                showPassword,
                setShowPassword,
                showReEnterPassword,
                setShowReEnterPassword,
                handleClickShowPassword,
                handleClickShowReEnterPassword
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}