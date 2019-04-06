import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
//import Paper from "@material-ui/core/Paper";

import SwipeableView from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlayView = autoPlay(SwipeableView);

// For testing
const path = [
  {
    label: "Item 1",
    imgPath:
      "https://z5wy01yb7154xjch3b138212-wpengine.netdna-ssl.com/wp-content/uploads/Office_Supplies_HEADER.jpg"
  },
  {
    label: "Item 2",
    imgPath:
      "http://ideacenter.iprint.com/wp-content/uploads/2017/01/Promotional-Products-for-2017-Desk.png"
  },
  {
    label: "Item 3",
    imgPath: "https://momentumsol.co.uk/images/2017/06/printer-inks-681577.jpg"
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
