import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

const store = store();
class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    }
}

export default Root;