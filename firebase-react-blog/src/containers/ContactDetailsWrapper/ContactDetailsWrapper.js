import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactDetails from '../../components/Contact/ContactDetails';
import { getContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
class ContactDetailsWrapper extends Component {
    componentDidMount() {
        const id = this.props.id;
        this.props.getContactTk(id);
    }
    render() {
        const {contact} = this.props;
        if(!!contact){
        return(
            <div>
                <ContactDetails contact={contact}/>
             </div>
           );
        }else {
            return(
                <div>
                  <p>Loading ContactDetails......</p>
                </div>
                // 이거 작동을 안하나?
            )
        }
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