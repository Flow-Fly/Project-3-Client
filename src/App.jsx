import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavMain from './components/NavMain';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import FormEditProfile from './components/FormEditProfile/FormEditProfile';

function App() {
  return (
    <div className="App">
      <NavMain />
      <div className="mainPage">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/job">
                <Route path='/:id'
                  component={(props) => <Home {...props} toJob={true} />}
                />
            </Route>
            <Route exact path="/post">
                <Route path='/:id'
                  component={(props) => <Home {...props} toPost={true} />}
                />
            </Route>
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/edit" component={FormEditProfile} />
        </Switch>
      </div>
  </div>
  );
}

export default App;
