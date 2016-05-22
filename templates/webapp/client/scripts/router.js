import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App.jsx';

export default function router(store) {
  return (
    <Route path="/" component={ App }>
    </Route>
  );
}
