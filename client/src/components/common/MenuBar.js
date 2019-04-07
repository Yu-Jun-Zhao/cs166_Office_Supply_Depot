import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Searchbar from "../common/Searchbar";
import Divider from "@material-ui/core/Divider";

import "../../style/menuBar.css";

const styles = theme => ({
  root: {
    margin: "5px 1%",
    width: "100%"
  },
  menuLinks: {
    marginRight: "2%",
    justifyContent: "space-evenly",
    flexGrow: "1",
    alignItems: "center"
  },
  searchBarDiv: {
    width: "40%"
  }
});

const MenuBar = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="relative" color="default">
      <Toolbar>
        <div className={`${classes.menuLinks} container`}>
          <Typography variant="subtitle2" color="inherit">
            Office Supplies
          </Typography>
          <Divider />

          <Typography variant="subtitle2" color="inherit">
            Office Furnitures
          </Typography>
          <Divider />
          <Typography variant="subtitle2" color="inherit">
            Computers
          </Typography>
          <Divider />

          <Typography variant="subtitle2" color="inherit">
            Printers
          </Typography>
          <Divider />

          <Typography variant="subtitle2" color="inherit">
            Other Facilities
          </Typography>
        </div>
        <div className={classes.searchBarDiv}>
          <Searchbar />
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(MenuBar);
