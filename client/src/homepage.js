import React from 'react';
import ReactDOM from 'react-dom';
import './homepage.css';

class Searchbar extends React.Component {
  render(){
    return (
      <center>
        <div class="navigation">
          <a class="active">Home</a>
            <input type="text" placeholder="Search..."></input>
            <button id="buttons" type="submit">Submit</button>
          <a class="active">Login/Signup</a>
          <a id="a1" class="active">Shopping Cart</a>
        </div>
      </center>
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
