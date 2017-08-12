import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
    render() {
        const { props } = this;
        return <header>
            <h1 className="Header">{props.content}</h1>
            <h2 className="Header-sub">{props.subheader}</h2>
        </header>;
    }
}
