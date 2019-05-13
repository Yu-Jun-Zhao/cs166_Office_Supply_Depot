import React, { Component } from "react";
import { connect } from "react-redux";
import { addCartItem } from "../../actions/cartActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: "100%"
  },
  media: {
    height: "150px"
  }
});

class ItemCard extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    price: this.props.price,
    weight: this.props.weight,
    quantity: this.props.quantity,
    image: this.props.image,
    description: this.props.description
  };

  handleCardClick = () => {
    const { cartId } = this.props.authentication;
    this.props.addCartItem(cartId, this.state.id, 1);
  };

  render() {
    const {
      id,
      title,
      price,
      weight,
      quantity,
      image,
      description
    } = this.state;
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleCardClick}>
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography component="p">{id}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography component="p">Price: {price}</Typography>
            <Typography component="p">Weight: {weight}</Typography>
            <Typography component="p">Remaining: {quantity}</Typography>
            <Typography component="p">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

const ItemCardStyled = withStyles(styles)(ItemCard);

export default connect(
  mapStateToProps,
  { addCartItem }
)(ItemCardStyled);
