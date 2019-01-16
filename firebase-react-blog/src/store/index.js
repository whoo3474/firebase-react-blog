import { default as contact} from './modules/contact';
import { default as portfolio} from './modules/portfolio';
import { default as timeLine} from './modules/timeLine';
import thunk from 'redux-thunk';
import { reduxFirestore ,getFirestore } from 'redux-firestore';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const reducers = combineReducers({
    contact,
    portfolio,
    timeLine
});

const store = createStore(reducers,applyMiddleware(thunk));

export default store;