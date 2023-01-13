import React, { useContext } from "react"
import { TextField, Button, Box, Typography, Link } from '@mui/material'
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { UserContext } from "../context/UserProvider"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AuthForm(props) {
    const { handleSubmit, userNameInputType, reEnterPasswordInputType, displayInput, gridSm } = props
    const { 
        authInputs, 
        authHandleChange, 
        errMsg, 
        isAuthToggled, 
        toggleAuth, 
        handleGoogleSubmit, 
        showPassword,
        showReEnterPassword,
        handleClickShowPassword,
        handleClickShowReEnterPassword
    } = useContext(UserContext)

   
    const mainContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0px 45px",
    }
    
    const mainBox = {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const formButton = {
        fontFamily: "Helvetica",
        marginTop: "5px",
        backgroundColor: "rgb(25 118 210)",
        color: "white",
        textAlign: "center",
        boxShadow: "4px 2px 5px 0px rgba(0,0,0,0.52)",
          transform: "translateY(0px)",
          transitionDuration: ".5s",
          transitionProperty: "box-shadow, transform",
          "&:hover": {
            boxShadow: "4px 5px 5px 0px rgba(0,0,0,0.52)",
            transform: "translateY(-5px)",
            transitionDuration: ".5s",
            transitionProperty: "box-shadow, transform",
            backgroundColor: "rgb(25 118 210)"
        }
    }

    const orText = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        textAlign: "center"
    }

    const errMsgText = {
        color: "red",
    }

    return(
        <div style={mainContainer}>
            <Box sx={mainBox}>
                <Typography component="h1" variant="h5">
                    { isAuthToggled ? 
                        <>
                            <LockOutlinedIcon /> Sign Up 
                        </>
                        : 
                        <>
                            <LockOpenOutlinedIcon /> Login 
                        </>
                    }
                </Typography>
                <Box component="form" noValidate sx={{margin: "20px 20px"}}>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={12} sm={6} sx={{display: displayInput}}>
                            <TextField 
                                type={userNameInputType} 
                                name="username" 
                                label="Username"
                                value={authInputs.username} 
                                onChange={authHandleChange} 
                                fullWidth 
                                required
                                
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={gridSm}>
                            <TextField 
                                type="text" 
                                name="email" 
                                label="Email"
                                value={authInputs.email} 
                                onChange={authHandleChange} 
                                fullWidth 
                                required
                            />
                        </Grid2>
                        <Grid2 item xs={12}>
                            <TextField 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                label="Password" 
                                value={authInputs.password} 
                                onChange={authHandleChange} 
                                fullWidth 
                                required
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            {/* <EmojiEmotionsIcon  onClick={() => setShowPicker(true)}/> */}
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                }}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sx={{display: displayInput}}>
                            <TextField 
                                type={reEnterPasswordInputType && showReEnterPassword ? "text" : "password"} 
                                name="reEnterPassword" 
                                label="Re-Enter Password"
                                value={authInputs.reEnterPassword} 
                                onChange={authHandleChange} 
                                fullWidth 
                                required
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowReEnterPassword}
                                        >
                                            {showReEnterPassword ? <Visibility /> : <VisibilityOff />}
                                            {/* <EmojiEmotionsIcon  onClick={() => setShowPicker(true)}/> */}
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                }}
                            />
                        </Grid2>     
                        <Grid2 item xs={12}>
                            <Typography variant="body2" sx={errMsgText}>{errMsg}</Typography>
                        </Grid2>
                        <Button type="submit" sx={formButton} onClick={handleSubmit} fullWidth variant="contained">
                            { isAuthToggled ? "Sign Up With Email" : "Login In With Email" }
                        </Button>
                        <Grid2 item xs={12}>
                            <Typography sx={orText}>or</Typography>
                        </Grid2>
                        <Button type="submit" sx={formButton} onClick={handleGoogleSubmit} fullWidth variant="contained">
                            { isAuthToggled ? "Sign Up With Google" : "Login In With Google" }
                        </Button>
                        <Grid2 container justifyContent="flex-end">
                            <Grid2 item sx={{marginTop: "10px"}}>
                                <Link href="#" variant="body2" onClick={toggleAuth}>
                                    { isAuthToggled ? "Already have an account? Sign in" : "Don't have an account yet? Sign up"}
                                </Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
        </div>
    )
}