import { default as contact} from './modules/contact';
import { default as portfolio} from './modules/portfolio';
import { default as timeLine} from './modules/timeLine';
import { default as auth} from './modules/auth';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const reducers = combineReducers({
    contact,
    portfolio,
    timeLine,
    auth
});

const store = createStore(reducers,applyMiddleware(thunk));

export default store;