import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./productActions";
import { withRouter } from "react-router-dom"

class ProductList extends React.Component {
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        this.props.dispatch(fetchProducts(params.get('q')));
    }

    render() {
        const { error, loading, products } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
                <ul>
                    {products.map(product =>
                        <li key={product.productID}>{product.pName}</li>
                    )}
                </ul>
            );
        }
}

const mapStateToProps = state => ({
    products: state.products.items,
    loading: state.products.loading,
    error: state.products.error
});

export default withRouter(connect(mapStateToProps)(ProductList));