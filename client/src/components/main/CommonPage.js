import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemText,
  Fab,
  Divider
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { withStyles } from "@material-ui/core/styles";

const drawerWidth = "230px";

const styles = theme => ({
  root: {
    display: "flex",
    position: "relative"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    position: "relative",
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative",
    boxShadow: "2px 2px 3px #888888"
  },
  drawerArrowButton: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`
  },
  fab: {
    position: "absolute",
    //flexGrow: 1,
    margin: "1% 1%",
    top: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2
  }
});

class CommonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      selection: props.selection,
      color: props.color,
      label: props.label
    };
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const { drawerOpen, color, label } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          open={drawerOpen}
          variant="persistent"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          elevation={6}
          anchor="left"
        >
          <div className={classes.drawerArrowButton}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>
            <Divider />
            <ListItem>
              <ListItemText primary="hello" />
            </ListItem>
          </List>
        </Drawer>
        {!drawerOpen && (
          <Fab
            classes={{ root: classes.fab }}
            color="secondary"
            size="small"
            aria-label="Filter Menu"
            onClick={this.handleDrawerOpen}
          >
            <MenuIcon />
          </Fab>
        )}

        <main className={classes.content}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt,
          qui reprehenderit minus velit a culpa aspernatur nesciunt quod et quo
          repellat facere veritatis, eius assumenda quaerat recusandae officiis
          optio similique?
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(CommonPage);
