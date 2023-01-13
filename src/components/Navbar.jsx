import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { AppBar, Avatar, Box, Container, IconButton, Typography, Modal, Menu, MenuItem, Tooltip, Toolbar } from "@mui/material"
import ChangeProfilePic from "./ChangeProfilePic"
import chatAwayPic from "../assets/Chat-Away-lg.png"

export default function Navbar() {

  const [anchorElUser, setAnchorElUser] = useState(null)

  const { signOutOfAccount, currentUser, onOpenModal, onCloseModal, open, photoURL } = useContext(UserContext)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "8vw",
    backgroundColor: "#f2f2f2",
    border: "1px solid #000",
    borderRadius: "2px",
    boxShadow: " 4px 2px 5px 0px rgba(0,0,0,0.52)"
  }

  const textStyle = {
    textAlign: "center",
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={chatAwayPic} style={{height: "50px"}} alt="" />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={chatAwayPic} style={{height: "50px"}} alt="" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser.displayName} src={photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={signOutOfAccount}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem onClick={onOpenModal}>
                <Typography textAlign="center">Change Profile Picture</Typography>
              </MenuItem>
              <Modal
                open={open}
                onClose={onCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box style={boxStyle}>
                  <Typography style={textStyle} variant="h6" component="h2">
                    Profile Picture
                  </Typography>
                  <ChangeProfilePic />
                </Box>
              </Modal>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
