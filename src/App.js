import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import store from './redux/store';
import Login from './views/Login';
import Dashboard from './views/admin/Dashboard';
import AddBus from './views/admin/AddBus';
import ViewBuses from './views/admin/ViewBuses';
import AddTicket from './views/admin/AddTicket';
import ViewTickets from './views/admin/ViewTickets';

import NotFound from './views/NotFound';

library.add(fab, fas);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={Dashboard} />
          <Route exact path="/buses/new" component={AddBus} />
          <Route exact path="/buses/all" component={ViewBuses} />
          <Route exact path="/tickets/new" component={AddTicket} />
          <Route exact path="/tickets/all" component={ViewTickets} />

          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
