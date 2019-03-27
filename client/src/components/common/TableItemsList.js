import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProductsByOffset } from "../../actions/productActions";
//import ReactPaginate from "react-paginate";
// Mainly for Admin

class TableItemsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProductsByOffset(100);
  }

  render() {
    const { loading, items } = this.props.products;
    if (loading) {
      return (
        <div>
          <h2>Loading Items</h2>
        </div>
      );
    }
    return (
      <div className="col s12">
        <table className="highlight">
          <thead>
            <tr>
              <th>Item</th>
              <th className="center">Weight</th>
              <th className="center">Price</th>
              <th className="center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.products.map(product => (
              <tr key={product.id}>
                <td>{product.pName}</td>
                <td className="center">{product.weight}</td>
                <td className="center">{product.price}</td>
                <td className="center">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchProductsByOffset }
)(TableItemsList);
