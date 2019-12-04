import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shoppage.component';
import SignInandSignUpPage from './pages/sign-in-page/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';
const HatsPage = () => (
  <div><h1>HatsPage</h1></div>
)

class App extends React.Component {
      constructor() {
        super();

        this.state = {
          currentUser: null
        };
      }
      unsubscribeFromAuth = null;

      componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
          this.setState({
            currentUser: user
          });

          console.log(user);
        });
      }

      componentWillUnmount() {
        this.unsubscribeFromAuth();
      }

  render(){
      return (
    <div>
    <Header currentUser = { this.state.currentUser } />
      <Route exact path = '/' component = { HomePage } />
      <Route exact path = '/hats' component = { HatsPage } />
      <Route exact path = '/shop' component = { ShopPage } />
      <Route exact path = '/signin' component = { SignInandSignUpPage } />
    </div> 
  );
    
  }
}

export default App;
