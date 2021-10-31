import React, { useContext, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Context from '../core/context/Store';
import Dashboard from './dashboard';
import Sidebar from '../components/navigation/Sidebar';
import { routes } from './config';
import Navbar from '../components/navigation/Navbar';
import config from '../assets/utils/config';
import Setting from './settings/Setting';

export const getInitialRoutePage = (user) => {
  return user?.user_type === 'superadmin'
    && user?.privilege === 4
    ? config.pages.dashboard
    : config.pages.support;
}

export const isSuperAdmin = (user) => {
  return user?.user_type === 'superadmin'
    && user?.access_level === 4;
}

const App = (props) => {
  const { msgs, user } = useContext(Context).state;
  const fullAccess = isSuperAdmin(user);

  const renderedRoutes = routes.map(AppRoute => AppRoute.access === 2 || (AppRoute.access === 1 && fullAccess) ? (
    <Route key={AppRoute.link} path={AppRoute.link}>
      <AppRoute.Component user={user} NavigationBar={AppRoute.NavigationBar} />
    </Route>
  ) : null)

  return (
    <Router>
      <Fragment>
        <Sidebar msgs={msgs} user={user} />
        <Switch>
          <Route exact path='/'>
            {fullAccess ? <Dashboard NavigationBar={Navbar} {...props} /> : <Setting NavigationBar={Navbar} {...props} />}
          </Route>
          {renderedRoutes}
          <Route>
            <Redirect exact from='*' path={config.pages.dispatch} />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
