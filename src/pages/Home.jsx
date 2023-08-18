import React from "react"
import { Box } from "@mui/material"
import Welcome from "../components/Welcome"

const Home = () => {
  return (
    <Box flex={4} p={2}>
      <Welcome />
    </Box>
  )
}

export default Home