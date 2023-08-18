import React, { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  styled,
  Modal,
} from "@mui/material"
import { SportsHandball, InsertEmoticon, Home, ModeNight, ContactMail } from "@mui/icons-material"
import emailjs from "@emailjs/browser"

const Sidebar = ({ mode, setMode }) => {
  const [open, setOpen] = useState(false)

  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })

  const form = useRef()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [setDone] = useState(false)
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        "service_hahizz8",
        "template_3vswlcg",
        form.current,
        "fw5NLjj46_b-I84Oy"
      )
      .then(
        (result) => {
          console.log(result.text)
          setDone(true)
          setName("")
          setEmail("")
          setMessage("")
          window.location.reload()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem
            disablePadding
            button
            component={NavLink}
            to="/"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            activeclassname="active"
            style={({ isActive }) => ({
              paddingBottom: isActive ? "10px" : "5px",
              borderBottom: isActive ? "2px solid #424242" : "",
            })}
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Početna" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="manual"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              activeclassname="active"
              style={({ isActive }) => ({
                paddingBottom: isActive ? "10px" : "5px",
                borderBottom: isActive ? "2px solid #424242" : "",
              })}
            >
              <ListItemIcon>
                <InsertEmoticon />
              </ListItemIcon>
              <ListItemText primary="Uputstvo" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="handball"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              activeclassname="active"
              style={({ isActive }) => ({
                paddingBottom: isActive ? "10px" : "5px",
                borderBottom: isActive ? "2px solid #424242" : "",
              })}
            >
              <ListItemIcon>
                <SportsHandball />
              </ListItemIcon>
              <ListItemText primary="Vaša Taktika" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={(e) => setOpen(true)}>
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary="Kontakt" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <>
        <StyledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={400}
            height={280}
            borderRadius={5}
            bgcolor="background.default"
            color={"text.primary"}
            padding={2}
          >
            <div className="container  px-6 mx-auto -mt-42">
              <section className="mb-42 text-center text-gray-800">
                <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                  <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group mb-6">
                      <input
                        type="text"
                        name="user_name"
                        value={name}
                        className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInput7"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group mb-6">
                      <input
                        type="email"
                        name="user_email"
                        value={email}
                        className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInput8"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="form-group mb-6">
                      <textarea
                        className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
                        id="exampleFormControlTextarea13"
                        rows="3"
                        placeholder="Message"
                        name="message"
                        value={message}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="
        w-full
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </Box>
        </StyledModal>
      </>
    </Box>
  )
}

export default Sidebar