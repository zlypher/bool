import React, { Component } from "react";
import "./Footer.css";

/**
 * Footer is a simple component to render the footer text with links to the
 * repository.
 */
export default class Footer extends Component {
    render() {
        return <footer className="Footer">
            <p>If you find any issues or erros, please report them on the <a href="https://github.com/zlypher/bool/issues">issue tracker.</a></p>
            <p>This is a small side project by Thomas Prochazka. You can find the complete source code on <a href="https://github.com/zlypher/bool">Github</a>.</p>
        </footer>;
    }
}
