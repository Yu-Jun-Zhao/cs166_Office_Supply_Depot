import React from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  changeOffset,
  changePage
} from "../../actions/productActions";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ItemHolder from './Product'

class ProductList extends React.Component {
  componentDidMount() {
    const { offset } = this.props;
    const params = new URLSearchParams(this.props.location.search);
    this.props.dispatch(fetchProducts(params.get("q"), offset));
  }

  handlePageClick = data => {
    const params = new URLSearchParams(this.props.location.search);
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    this.props.dispatch(changeOffset(offset));
    this.props.dispatch(changePage(selected));
    this.props.dispatch(fetchProducts(params.get("q"), offset));
  };

  render() {
    const { error, loading, products, pageCount, offset, page } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <ul>
          {products.map(product => {
            return (
              <div key={product.productID}>
                <ItemHolder product={product}/>
              </div>
            );
          })}
        </ul>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          forcePage={page}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
  page: state.products.page,
  pageCount: state.products.pageCount,
  offset: state.products.offset
});

export default withRouter(connect(mapStateToProps)(ProductList));
