import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
//import Paper from "@material-ui/core/Paper";

import SwipeableView from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlayView = autoPlay(SwipeableView);

// For testing
// Use images that are 1920 x 468
const path = [
  {
    label: "Item 1",
    imgPath: "https://www.lumenfit.com/image/slide/14/3/1"
  },
  {
    label: "Item 2",
    imgPath: "http://www.ef-plastic.com/upload/2018010915140868.jpg"
  },
  {
    label: "Item 3",
    imgPath: "http://newtechqatar.com/img/switchgear.jpg"
  },
  {
    label: "Item 4",
    imgPath:
      "https://i.pinimg.com/originals/ad/04/c6/ad04c673508523f9cae560aeebb5cc79.jpg"
  }
];

const style = theme => ({
  root: {
    position: "relative",
    width: "100%"
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
          style={{ height: "100%", overflowY: "hidden", margin: "0% 1%" }} //for root
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
