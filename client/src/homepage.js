import React from 'react';
import ReactDOM from 'react-dom';
import './homepage.css';

class Searchbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleSubmit(event){
    // something here
    alert('submitted: '+ this.state.value);
    event.preventDefault();
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="navigation">
          <a className="active">Home</a>
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search..."></input>
            <button id="buttons" type="submit">Submit</button>
          <a className="active">Login/Signup</a>
          <a id="a1" className="active">Shopping Cart</a>
        </div>
      </form>
    );
  }
}

class Homepage extends React.Component {
  render() {
    return (
      <div>
      <span className="homepage"></span>
      <h1> Office Supply Depot (OSD)</h1>
      <div className="searchbar"> <Searchbar />
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Homepage />,
  document.getElementById('root')
);
