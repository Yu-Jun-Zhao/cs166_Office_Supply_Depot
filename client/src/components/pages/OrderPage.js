import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth } from "@okta/okta-react";
import {checkAuthentication} from "../../actions/authenticateActions";

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            name: ""
        };
    }

    componentDidMount() {
        this.props.checkAuthentication(
            this.props.auth,
            this.props.authentication.isAuthenticated,
            this.props.authentication.userInfo
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.authentication.isAuthenticated) {
            return {
                isAuthenticated: true,
                name: nextProps.authentication.userInfo.name
            };
        }
        return {
            isAuthenticated: false,
            name: ""
        };
    }

    render() {
        return (
            <React.Fragment>
                <h1> TST </h1>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    authentication: state.authentication
});

export default connect(
    mapStateToProps,
    { checkAuthentication }
)(withAuth(OrderPage));
