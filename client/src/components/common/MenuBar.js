import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Searchbar from "../common/Searchbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import HomeMain from "../main/HomeMain";
import CommonPage from "../main/CommonPage";

import "../../style/menuBar.css";

const styles = theme => ({
  root: {
    margin: "5px 1%",
    width: "100%"
  },
  menuLinks: {
    alignItems: "center",
    width: "60%"
  },
  searchBarDiv: {
    width: "40%"
  },
  commonPage: {
    minWidth: "20px",
    maxWidth: "180px"
  },
  scrollButtons: {
    width: "20px"
  },
  toobarRoot: {
    padding: "0px 10px"
  }
});

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="relative"
          color="default"
          style={{ backgroundColor: "#fafafa", zIndex: 9999 }}
        >
          <Toolbar className={classes.toobarRoot}>
            <div className={`${classes.menuLinks} container`}>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons="on"
                classes={{
                  scrollButtons: classes.scrollButtons
                }}
              >
                <Tab
                  style={{ minWidth: "30px", maxWidth: "80px" }}
                  icon={<HomeIcon />}
                />
                <Tab
                  className={classes.commonPage}
                  label="Office Supplies"
                  selection="Supply"
                />
                <Tab
                  className={classes.commonPage}
                  label="Office Furnitures"
                  selection="Furniture"
                />
                <Tab
                  className={classes.commonPage}
                  label="Computers"
                  selection="Computer"
                />
                <Tab
                  className={classes.commonPage}
                  label="Printers"
                  selection="Printer"
                />
                <Tab
                  className={classes.commonPage}
                  label="Other Facilities"
                  selection="Other"
                />
              </Tabs>
            </div>
            <div className={classes.searchBarDiv}>
              <Searchbar />
            </div>
          </Toolbar>
        </AppBar>
        {value === 0 && <HomeMain />}
        {value === 1 && (
          <CommonPage label="Office Supplies" selection="Supply" />
        )}
        {value === 2 && <div />}
        {value === 3 && <div />}
        {value === 4 && <div />}
        {value === 5 && <div />}
        {value === 6 && <div />}
      </div>
    );
  }
}

export default withStyles(styles)(MenuBar);
