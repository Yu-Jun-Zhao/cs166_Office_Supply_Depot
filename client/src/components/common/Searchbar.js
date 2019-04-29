import React, { Component } from "react";
import "../../style/homepage.css";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  input: {
    flex: 1,
    marginLeft: 8
  },
  paper: {
    display: "flex",
    alignSelf: "center",
    width: "100%"
  }
};

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(`/result?q=${this.state.searchQuery}`)
  }

  render() {
    const { searchQuery } = this.state;
    const { classes } = this.props;

    return (
      <div className="container">
        <Paper className={classes.paper} elevation={2}>
          <InputBase
            className={classes.input}
            value={searchQuery}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyPress={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                this.handleSubmit(e);
              }
            }}
            placeholder="Search Items"
          />
          <IconButton aria-label="Search" onClick={this.handleSubmit}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    );
  }
}

const SearchbarWithStyle = withStyles(styles)(Searchbar);

export default withRouter(SearchbarWithStyle);