import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Footer = () => (
  <footer
    className="footer"
    style={{
      justifyContent: "center",
      position: "relative",
      marginTop: "0.5rem"
    }}
  >
    <AppBar position="relative" style={{ backgroundColor: "#607d8b" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="subheading" color="inherit">
          Copyright &copy; {new Date().getFullYear()} OSD
        </Typography>
      </Toolbar>
    </AppBar>
  </footer>
);

export default Footer;
