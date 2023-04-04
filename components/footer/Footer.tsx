import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import style from "./footer.module.css";

const Footer = () => {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography align='center'>@2023 All rights reserved</Typography>{" "}
      <Typography align='center'>
        <Instagram /> <Twitter /> <LinkedIn />
      </Typography>
    </Paper>
  );
};

export default Footer;
