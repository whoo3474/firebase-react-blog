import React from 'react';
import ContactSummary from './ContactSummary';
import { Link } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';

const styles= theme => ({
    button:{
        margin: `${theme.spacing.unit}px auto`,
        width: '100%',
      display: 'inlineBlock'
    }
})

// contactWrapper에서 보여줌
const ContactList = ({contactList,classes}) => {

    return (
        <>
            { contactList && contactList.map((contact,i) => {
                return (
                    <Button className={classes.button} component={Link} key={i} to={'/contact/'+contact.id }>
                        {console.log('contact,i',contact,i)}
                      <ContactSummary contact={contact} key={contact.id}/>
                    </Button>
                )
            })}
        </>
    );
};

export default withStyles(styles)(ContactList);