import React, { Component } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fab,
  Divider,
  ListItemSecondaryAction,
  Switch,
  ListItemIcon,
  Collapse,
  TextField,
  Grid
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";

import ItemCard from "../common/ItemCard";

const drawerWidth = "230px";

// for testing
const arrayLoop = [...new Array(16)];

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
  drawerRootSmall: {
    width: "8%"
  },
  drawerRootBig: {
    width: drawerWidth
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
  },
  textField: {
    width: "35%"
  },
  listRoot: {
    paddingBottom: "0px"
  },
  listItemRoot: {
    paddingTop: "0px"
  },
  listItemTextRoot: {
    padding: "0px 4px",
    flex: "none"
  },
  gridRoot: {
    flexGrow: 1
  }
});

class CommonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      selection: props.selection,
      color: props.color,
      label: props.label,
      filterExpand: ["price"], //expand by default
      filterApply: [],
      priceRange: {
        min: 0,
        max: 99999
      }
    };
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  // A function that takes in an array (filterExpand or filterApply) and a value and returns a function
  // To keep track of what filter is applied
  handleArrayChange = (array, value) => () => {
    const index = array.indexOf(value);

    // Not in array
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    this.setState({
      array
    });
  };

  handlePriceChange = name => event => {
    const value = event.target.value;
    this.setState(prevState => ({
      priceRange: {
        ...prevState.priceRange,
        [name]: value
      }
    }));
  };

  render() {
    const { drawerOpen, color, label, filterExpand, filterApply } = this.state;
    const { classes } = this.props;
    const rootDrawer = drawerOpen
      ? classes.drawerRootBig
      : classes.drawerRootSmall;

    //console.log(this.state.priceRange);
    return (
      <div className={classes.root}>
        <Drawer
          open={drawerOpen}
          variant="persistent"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper, root: rootDrawer }}
          elevation={6}
          anchor="left"
        >
          <div className={classes.drawerArrowButton}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List classes={{ root: classes.listRoot }}>
            <ListItem
              button
              onClick={this.handleArrayChange(filterExpand, "price")}
            >
              <ListItemIcon style={{ marginRight: "0px" }}>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary="Price Range"
                classes={{ root: classes.listItemTextRoot }}
              />
              <ListItemIcon style={{ marginLeft: "15%" }}>
                {filterExpand.indexOf("price") !== -1 ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemIcon>
            </ListItem>
            <Collapse
              in={filterExpand.indexOf("price") !== -1}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                <ListItem className={classes.listItemRoot}>
                  <TextField
                    type="number"
                    margin="normal"
                    className={classes.textField}
                    placeholder="$"
                    disabled={filterApply.indexOf("price") === -1}
                    onChange={this.handlePriceChange("min")}
                  />
                  <ListItemText
                    primary="to"
                    classes={{ root: classes.listItemTextRoot }}
                  />
                  <TextField
                    type="number"
                    margin="normal"
                    className={classes.textField}
                    placeholder="$"
                    disabled={filterApply.indexOf("price") === -1}
                    onChange={this.handlePriceChange("max")}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={this.handleArrayChange(filterApply, "price")}
                      checked={filterApply.indexOf("price") !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Collapse>
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
          <Grid container spacing={24}>
            {arrayLoop.map((item, index) => (
              <Grid item xs={3} key={index}>
                <ItemCard
                  title="Office Supply"
                  price="3.14"
                  weight={1}
                  quantity={12}
                />
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(CommonPage);