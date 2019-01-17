import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AboutPage, SignInPage, SignUpPage, ContactPage, ContactDetailsPage, NotFoundPage, PortfolioPage, TimelinePage } from '../pages'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={AboutPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Route path="/contact/:page" component={ContactDetailsPage} />
                <Route path="/portfolio" component={PortfolioPage} />
                <Route path="/timeline" component={TimelinePage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/signup" component={SignUpPage} />
                {/* <Route path="" component={} /> */}
                <Route component={NotFoundPage} />    
            </Switch>   
        </div>
    );
};

export default App;