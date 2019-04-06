import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
//import Paper from "@material-ui/core/Paper";

import SwipeableView from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlayView = autoPlay(SwipeableView);

// For testing
// Use images that are 900x300
const path = [
  {
    label: "Item 1",
    imgPath:
      "https://cdn10.bigcommerce.com/s-mwv5u7d/product_images/uploaded_images/apartment-dorm.jpg"
  },
  {
    label: "Item 2",
    imgPath:
      "http://ideacenter.iprint.com/wp-content/uploads/2017/01/Promotional-Products-for-2017-Desk.png"
  },
  {
    label: "Item 3",
    imgPath: "https://momentumsol.co.uk/images/2017/06/printer-inks-681577.jpg"
  },
  {
    label: "Item 4",
    imgPath:
      "https://i0.wp.com/otakulane.com/wp-content/uploads/2016/11/23971.jpg?resize=900%2C300"
  }
];

const style = theme => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  imageBox: {
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: "auto"
  },
  view: {
    width: "100%",
    height: "100%"
  },
  mobileStepper: {
    display: "flex",
    justifyContent: "center"
  },
  dotActive: {
    backgroundColor: "#26a69a"
  }
});

class StepperPanel extends Component {
  state = {
    stepIndex: 0
  };

  handleStepChange = stepIndex => {
    this.setState({ stepIndex });
  };

  render() {
    const maxSteps = path.length;
    const { stepIndex } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AutoPlayView
          index={stepIndex}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          style={{ height: "100%", overflowY: "hidden" }} //for root
          containerStyle={{
            // for the container
            width: "100%",
            height: "100%"
          }}
        >
          {path.map((step, index) => (
            <div key={index} className={classes.imageBox}>
              <img
                src={step.imgPath}
                alt={step.label}
                className={classes.image}
              />
            </div>
          ))}
        </AutoPlayView>
        <MobileStepper
          steps={maxSteps}
          activeStep={stepIndex}
          position="static"
          variant="dots"
          className={classes.mobileStepper}
          classes={{ dotActive: classes.dotActive }}
        />
      </div>
    );
  }
}

export default withStyles(style)(StepperPanel);
