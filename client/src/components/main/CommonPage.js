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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
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
        >
          <div className={classes.toolbar} />

          <List>
            <div>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
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
          <div className={classes.toolbar} />
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
