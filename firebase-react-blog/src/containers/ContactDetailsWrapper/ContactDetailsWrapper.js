import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactDetails from '../../components/Contact/ContactDetails';
import { getContactTk, deleteContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
class ContactDetailsWrapper extends Component {
    state = {
        open: false,
        redirect:false
      };
    
      handleClickOpen = (id) => {
        this.setState({ open: true });
        this.contactDelete(id);
      };
    
      handleClose = () => {
        this.setState({ open: false, redirect:true });
      };
    
      contactDelete = (id) => {
        this.props.deleteContactTk(id);
      }
    componentDidMount() {
        const id = this.props.id;
        this.props.getContactTk(id);
    }
    render() {
        const {contact, message, id} = this.props;
        const {redirect, open} = this.state;
        if(!!contact){
        return(
            <div>
                <ContactDetails 
                    id={id}
                    message={message}
                    contact={contact} 
                    open={open}
                    redirect={redirect}
                    handleClose={this.handleClose} 
                    handleClickOpen={this.handleClickOpen}
                    handleCloseDelete={this.handleCloseDelete}/>
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
        contact : state.contact.contact,
        message : state.contact.message
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactTk : bindActionCreators(getContactTk,dispatch),
    deleteContactTk : bindActionCreators(deleteContactTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactDetailsWrapper);