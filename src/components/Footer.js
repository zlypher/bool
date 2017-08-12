import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return <footer className="Footer">
            <p>If you find any issues or erros, please report them on the <a href="#">issue tracker.</a></p>
            <p>This is a small side project by Thomas Prochazka. You can find the complete source code on <a href="#">Github</a>.</p>
        </footer>;
    }
}