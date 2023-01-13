import { useState } from "react"
import React, {useContext} from "react"
import { Navigate, Routes, Route } from "react-router-dom"
import { UserContext } from "./context/UserProvider"
import Registration from "./pages/Registration"
import Home from "./pages/Home"

function App() {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      <Routes>
        <Route exact path="/" element={ currentUser ? <Home/> : <Navigate to="/registration" replace />}
        />
        <Route exact path="/registration" element={ currentUser ? <Navigate to="/" replace /> : <Registration/>}
        />
      </Routes>
    </div>
  )
}

export default App
