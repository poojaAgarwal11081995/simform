import React from 'react';
import { Route, Switch ,Redirect} from 'react-router-dom';
import {useCookies } from 'react-cookie';
import Login from '../localauth/login';
import Profile from '../localauth/Profile';
import {PROFILE_PATH, LOGIN_PATH} from "../../path";
import {USER_DETAILS} from "../../constant";
function routes() {
    return (
        <Switch>
        <Route path={LOGIN_PATH} component={Login} />
        <PrivateRoutes path={PROFILE_PATH} component={Profile} />     
      </Switch>
    )
}
const PrivateRoutes = ({ component:Component, ...rest }) => {
  const [cookies, setCookie] = useCookies([USER_DETAILS]);
 
  return (
    <Route
      {...rest}
      render={(props) =>
        (cookies[USER_DETAILS] ? (<Component {...props} />) : (<Redirect to="/login" />))
      }
    />
  );
};

export default routes
