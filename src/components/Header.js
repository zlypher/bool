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
            <p className="Header-text"><a target="_blank" rel="noopener noreferrer" href="https://zlypher.github.io/">Author</a> &#8226; <a target="_blank" rel="noopener noreferrer" href="https://github.com/zlypher/bool">Github Project</a> &#8226; <a target="_blank" rel="noopener noreferrer" href="https://github.com/zlypher/bool/issues">Issues</a></p>
        </header>;
    }
}
