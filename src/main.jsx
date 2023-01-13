import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import UserProvider from "./context/UserProvider"
import MessengerProvider from "./context/MessengerProvider"
import {BrowserRouter} from "react-router-dom"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <MessengerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MessengerProvider>
    </UserProvider>
  </React.StrictMode>
)
