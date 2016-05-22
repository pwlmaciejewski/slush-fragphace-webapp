import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  routing: routerReducer
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(browserHistory)
)(createStore);

let store = createStoreWithMiddleware(reducers);

export default store;
