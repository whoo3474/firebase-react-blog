import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactDetails from '../../components/Contact/ContactDetails';
import { getContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
class ContactDetailsWrapper extends Component {
    componentWillMount() {
        const id = this.props.id;
        this.props.getContactTk(id);
    }
    render() {
        const {contact} = this.props;
        return(
            <div className="container section contact-details">
                <ContactDetails contact={contact}/>
             </div>
           );
    }
}

const mapStateToProps = (state) => {
    return {
        contact : state.contact.contact
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactTk : bindActionCreators(getContactTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactDetailsWrapper);