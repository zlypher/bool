import React, { Component } from "react";
import "./Header.css";

/**
 * Header is a simple component to render the main heading and a sub heading.
 */
export default class Header extends Component {
    render() {
        const { props } = this;
        return <header className="Header">
            <h1 className="Header-main">{props.content}</h1>
            <h2 className="Header-sub">{props.subheader}</h2>
        </header>;
    }
}
