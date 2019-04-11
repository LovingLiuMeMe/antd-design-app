import React, { PureComponent } from 'react';
import LoginCheck  from './container/LoginCheck';
import { Provider } from 'react-redux';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import store from './store';
import Index from './container/Index';
import Login from './container/Login';
import Register from './container/Register';
import DashBoard from './container/DashBoard';
import PlanCreate from './container/PlanCreate';
import PlanInfo from './container/PlanInfo';
import Chat from './container/Chat';

class App extends PureComponent {
  render() {
    return (
      <Provider  store={store} >
        <div className="App">
            <BrowserRouter>
              <LoginCheck></LoginCheck>
              <Switch>
                <Route path='/index'  component={Index}></Route>
                <Route path='/login'  component={Login}></Route>
                <Route path='/register' exact component={Register}></Route>
                <Route path='/plancreate' component={PlanCreate}></Route>
                <Route path='/planinfo/:planid' component={PlanInfo}></Route>
                <Route path='/chatuser/:userid' component={Chat}></Route>
                <Route component={DashBoard}></Route>
              </Switch>
            </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
