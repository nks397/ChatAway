import { Typography } from "@mui/material"
import React, { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { UserContext } from "../context/UserProvider"

export default function Registration() {
    //sign up and login in form
    const { isAuthToggled, signUpWithEmail, loginWithEmail } = useContext(UserContext)

    const guestCredentials = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "solid 1px",
        borderRadius: "5px",
        margin: "0 50px",
        fontFamily: "Helvetica",
        marginTop: "5px",
        textAlign: "center",
        boxShadow: "4px 2px 5px 0px rgba(0,0,0,0.52)",
    }

    return(
        <div>
            {isAuthToggled?
                <AuthForm 
                    handleSubmit={signUpWithEmail}
                    userNameInputType="text"
                    reEnterPasswordInputType="password"
                    gridSm={6}
                />
               
                :
                <>
                    <AuthForm 
                        handleSubmit={loginWithEmail}
                        displayInput="none"
                        userNameInputType="hidden"
                        reEnterPasswordInputType="hidden"
                        gridSm={12}
                    /> 
                    <div style={guestCredentials}>
                        <Typography>
                            <h4>Credentials for Guest/Guest2</h4>
                            <span><b>email:</b>guest@gmail.com <b> password:</b> guestpassword</span>
                            <br/>
                            <span><b>email:</b> guest2@gmail.com <b>password:</b> guest2password</span>
                        </Typography>
                    </div>
                </>
            }
        </div>
    )
}