import { default as contact} from './modules/contact';
import { default as portfolio} from './modules/portfolio';
import { default as timeLine} from './modules/timeLine';
import thunk from 'redux-thunk';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const reducers = combineReducers({
    contact,
    portfolio,
    timeLine
});

const store = createStore(reducers,applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})));

export default store;