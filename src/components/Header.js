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
            <p className="Header-text">If you find any issues or erros, please report them on the <a href="https://github.com/zlypher/bool/issues">issue tracker.</a> This is a small side project by Thomas Prochazka. You can find the complete source code on <a href="https://github.com/zlypher/bool">Github</a>.</p>
        </header>;
    }
}
