import {isAuthenticated} from "../library/session/authenticate";
import Router from "next/router";
import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!isAuthenticated()) {
            Router.replace("/auth/login");
        }
    }

    render() {
        return (
            <div id={"app"}>
                {this.props.children}
            </div>
        )
    }

}