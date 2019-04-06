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
    imgPath: "https://m.media-amazon.com/images/I/81NsL82d5vL._SR500,500_.jpg"
  },
  {
    label: "Item 2",
    imgPath:
      "https://i.pinimg.com/originals/fe/6a/00/fe6a00f7e8d8f50bae8d33f3dd7c1937.jpg"
  },
  {
    label: "Item 3",
    imgPath:
      "https://sep.yimg.com/ay/yhst-45286795969290/1990s-anime-stationery-lot-used-condition-3.gif"
  }
];

const style = theme => ({
  root: {
    minWidth: "100%",
    maxHeight: "50vh",
    flexGrow: 1
  },
  imageBox: {
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: "100%"
  },

  view: {
    width: "100%",
    height: "100%"
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
          style={{ height: "50vh", overflowY: "hidden" }} //for root
          containerStyle={{
            // for the container
            width: "100%",
            height: "100%"
          }}
          animateHeight
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
        />
      </div>
    );
  }
}

export default withStyles(style)(StepperPanel);
