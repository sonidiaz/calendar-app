import { Store, createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
  reduxThunk,  
];


export const store: Store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));