import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AboutPage, SignInPage, ContactPage, NotFoundPage, PortfolioPage, TimelinePage } from '../pages'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={AboutPage} />
                <Route path="/contact/:page" component={ContactPage} />
                <Route path="/portfolio" component={PortfolioPage} />
                <Route path="/timeline" component={TimelinePage} />
                <Route path="/signin" component={SignInPage} />
                {/* <Route path="" component={} /> */}
                <Route component={NotFoundPage} />    
            </Switch>   
        </div>
    );
};

export default App;