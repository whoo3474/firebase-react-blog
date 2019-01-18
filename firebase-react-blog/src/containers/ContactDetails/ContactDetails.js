import React, { Component } from 'react';
import { connect } from 'react-redux';
// 하나만 가져오는 리덕스 만들어라
import { getContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';

class ContactDetails extends Component {
    componentWillMount() {
        const id = this.props.id;
        this.props.getContactTk(id);
    }
    render() {
        const {contact} = this.props;
        const id = this.props.id;
        return (
        <div className="container section contact-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{contact.title} - {id}</span>
                    <p> 
                        {contact.content}
                    </p>
                </div>
                <div className="card-action grey-lighten-4 gery-text">
                    <div>
                        Posted by {contact.authorName}
                    </div>
                    <div>
                        2019년 1월17일 23시
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contact : state.contact.contact
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactTk : bindActionCreators(getContactTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactDetails);