import React,{Component} from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ethers } from "ethers";
import NavBar from './NavBar'
import Register from './register/Register'
import registeredZones from '../registeredTestZones.json';

// import Approve from './approve/Approve'

class App extends Component {


  state = {
    needToAWeb3Browser: false,
    // registeredZones: registeredZones,
  }

  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }

  async componentDidMount() {
    console.log(registeredZones);
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      // Now MetaMask's provider has been enabled, we can start working with 3Box
    }
  }


  render() {

    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>
    }

    return (
      <Router>
        <div className = "app">
          <NavBar />
          {this.state.needToAWeb3Browser && <h2>Please install metamask🦊</h2>}
          {(!this.state.needToAWeb3Browser && !this.state.accounts) && <h2>Connect MetaMask🤝</h2>}
            {this.state.accounts && (
              <Switch>
                <Route path="/register">
                  <Register addr = {this.state.accounts[0]} />
                </Route>
                <Route path="/admin">

                </Route>
                <Route path="/">

                </Route>
              </Switch>
            )}

        </div>
      </Router>
    );
  }
}

export default App;
