import logo from './logo.svg';
import './App.css';

//https://reactjs.org/docs/create-a-new-react-app.html#gatsby-focus-wrapper

//npx create-react-app my-app
//cd my-app
//npm start

/*
// imported component from ES7 React/Redux/GraphQL/React-Native snippets
// under extensions, square icon to the left, components
// type rcc tab

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        This is a coin Name: {this.props.name}
        
      </div>
    )
  }
}
*/

let sum = 0; // let instead of const since it will modify the value
//JavaScript (ES6) code snippets
//fof tab
for(let num of [1,2,3,4,5]) {
  sum += num;
}

//prom tab
return new Promise((resolve, reject) => {
  
})


//thenc tab
.then((result) => {
  
}).catch((err) => {
  
});

// ex. React Web Dev 101 > Bracket Colorizer
[1,2,3,4,5]
  .map( (item, index) => {return item + index; } )
  .reduce( (accumulator, nextValue) => {
    return accumulator + `<li>${nextValue}</li>`;
  }, '' );


// ex. function App(first, second, third)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1>
         Coin Exchange {sum}
       </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
