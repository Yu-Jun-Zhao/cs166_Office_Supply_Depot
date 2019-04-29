import React, { Component } from "react";
import { connect } from "react-redux";
import {
    updateProduct
} from "../../actions/productActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';

class ItemUpdater extends Component {

    state = {
        product_id: null,
        p_name: null,
        quantity: null,
        price: null,
        weight: null,
        description: null,
        imgPath: null,
        type: null
    }

    setField = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { product_id, p_name, quantity, price, weight, description, imgPath, type } = this.state
        return (
            <form onChange={this.setField} style={{marginLeft: '2%'}}>
                <Grid container spacing={24}>
                    <Grid item xs={1}>
                        <TextField type="number" label="ID" name="product_id" />
                    </Grid>

                    <Grid item xs={2}>
                        <FormControl>
                            <TextField
                                type="text"
                                label="New Item"
                                name="p_name"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={1}>
                        <TextField type="number" label="quantity" name="quantity" />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField type="number" label="price" name="price" />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField type="number" label="weight" name="weight" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField type="text" label="description" name="description" />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField type="text" label="img " name="imgPath" />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField type="text" label="type" name="type" />
                    </Grid>
                    <Grid item xs={1}>
                        <Button color="primary">
                            <i className="material-icons" onClick={() => this.props.dispatch(updateProduct(product_id, p_name, quantity, price, weight, description, imgPath, type))}>update</i>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default connect()(ItemUpdater);
