import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";

class CommonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: props.selection,
      color: props.color
    };
  }

  render() {
    const { color } = this.state;
    return (
      <div>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default CommonPage;
