import React from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import './App.css';

const blankSmurf = {
  name: '',
  age: '',
  height: ''
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: blankSmurf
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({
          smurfs: response.data

        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1>Smurfs!</h1>
          <div className='navLinks'>
            <NavLink exact to='/'>
              The Village
            </NavLink>
            <NavLink to='/smurf-form'>
              Add Smurf
            </NavLink>
          </div>
        </nav>
        <Route
          path='/smurf-form'
          render={props => (
            <SmurfForm 
              {...props}
            />
          )}
        />
        <Route
          exact path='/'
          render={props => (
            <Smurfs
            {...props}
            smurfs={this.state.smurfs} 
            />
          )}
        />
      </div>
    );
  }
}

export default App;