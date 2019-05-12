import React, { Component } from "react";
import { Grid } from "@material-ui/core/";

import ReactPaginate from "react-paginate";
import "../../index.css";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import {
  changeOffset,
  changePage,
  fetchProductByType
} from "../../actions/productActions";

import ItemCard from "../common/ItemCard";
import SimpleModal from "../common/SimpleModal";

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
  drawerRootSmall: {
    width: "0%" // FOR NOW until drawopen is used again // orginally 8 %
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
      selection: props.selection
    };
  }

  componentDidMount() {
    this.props.fetchProductByType(this.state.selection, 0);
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    this.props.changeOffset(offset);
    this.props.changePage(selected);
    this.props.fetchProductByType(this.state.selection, offset);
  };

  render() {
    const { classes, products, pageCount } = this.props;

    if (!products) return <div> LOADING... </div>;

    return (
      <div className={classes.root}>
        <SimpleModal />

        <main className={classes.content}>
          <Grid container spacing={24}>
            {products &&
              products.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <ItemCard
                    id={item.product_id}
                    title={item.p_name}
                    price={item.price}
                    weight={item.weight}
                    quantity={item.quantity}
                    image={item.imgPath}
                    description={item.description}
                  />
                </Grid>
              ))}
          </Grid>
          <div className="paginator">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              initialPage={0}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </main>
      </div>
    );
  }
}

const CommonPageStyled = withStyles(styles)(CommonPage);

const mapStateToProps = state => ({
  products: state.products.items,
  page: state.products.page,
  pageCount: state.products.pageCount,
  offset: state.products.offset
});

export default connect(
  mapStateToProps,
  { fetchProductByType, changeOffset, changePage }
)(CommonPageStyled);
