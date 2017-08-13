import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
    render() {
        const { props } = this;
        return <header className="Header">
            <h1 className="Header-main">{props.content}</h1>
            <h2 className="Header-sub">{props.subheader}</h2>
            <p className="Header-note">
                This project is currently under development to create a first stable version. Currently expressions can only be entered with single char variables (a&&b, c||(d&&e)).
            </p>
        </header>;
    }
}
