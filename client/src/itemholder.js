import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass';

const Title = props => <div>{props.children}</div>

class Itemholder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value });
  }
  render() {
    //this.setState(())
    const { products } = this.props
    return(
      <div>
      <Box width={200}>
        <Card
          p={1}
          borderRadius={2}
          boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
          <Box px={2}>
            <Heading as='h3'>
              Item
            </Heading>
            <Text fontSize={0}>
              description
            </Text>
            <Text fontSize={0}>
              price
            </Text>
          </Box>
        </Card>
      </Box>
      </div>
    );
  }
}
export default Itemholder;
