import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AboutPage, UserPage, SignInPage,  ContactPage, CreactContactPage, ContactDetailsPage, NotFoundPage, PortfolioPage, TimelinePage } from '../pages'

const App = () => {
    return (
        <div>

            <Switch>
                <Route exact path="/" component={AboutPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Route path="/contact/:id" component={ContactDetailsPage} />
                <Route path="/modify/:id" component={CreactContactPage} />
                <Route path="/create" component={CreactContactPage} />
                <Route path="/portfolio" component={PortfolioPage} />
                <Route path="/timeline" component={TimelinePage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/user" component={UserPage} />
                <Route component={NotFoundPage} />    
            </Switch>   
        </div>
    );
};

export default App;