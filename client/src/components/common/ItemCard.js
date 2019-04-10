import React, { Component } from "react";
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

//for testing
const testImage =
  "https://v5resources.britlink.com/customresourcesview/_GreggOfficeMachines/images/office%20supplies.jpg";

class ItemCard extends Component {
  state = {
    title: this.props.title,
    price: this.props.price,
    weight: this.props.weight,
    quantity: this.props.quantity,
    description: "this is an office supply"
  };
  render() {
    const { title, price, weight, quantity, description } = this.state;
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://v5resources.britlink.com/customresourcesview/_GreggOfficeMachines/images/office%20supplies.jpg"
            title="testing image"
          />
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography component="p">price: {price}</Typography>
            <Typography component="p">weight: {weight}</Typography>
            <Typography component="p">remaining: {quantity}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(ItemCard);
