import React, { Component } from "react";
import { tokenize } from "./BoolTokenizer";
import { generateArguments } from "./Utility";
import './BoolCheck.css';

export default class BoolCheck extends Component {
    constructor() {
        super();

        this.state = {
            arguments: [],
            expression: "",
            fn: () => { return "?" },
            tokens: [],
            variables: []
        };

        this.onExpressionChange = this.onExpressionChange.bind(this);
    }

    /**
     * Recalculates the result set based on the given expression.
     * @param {string} expression The expression to analyze.
     */
    recalculateResult = (expression) => {
        try {
            const tokens = tokenize(expression);
            const variables = tokens.filter(t => t.type === "var").map(t => t.value);

            this.setState({
                arguments: generateArguments(variables.length),
                expression: expression,
                fn: () => { return "?" },
                variables: variables,
                tokens: tokens
            });
        } catch(e) {
            console.dir(e);
            this.setState({
                expression: expression
            });
        }
    }

    /**
     * Callback when the expression changes.
     */
    onExpressionChange = (e) => {
        this.recalculateResult(e.target.value);
    }

    render() {
        const { state } = this;

        return <section className="BoolCheck">
            <input type="text"
                className="BoolCheck-input"
                value={state.expression}
                onChange={this.onExpressionChange}
                placeholder="Enter your expression... (a && b)" />

            {state.variables.length > 0 ?
                <div>
                    <div className="BoolCheck-expression">
                        {state.tokens.map((t, i) => <span key={t.type + "" + i} className={`BoolCheck-${t.type}`}>{t.value}</span>)}
                    </div>
                    <table className="BoolCheck-result" cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                {state.variables.map((v) => <th key={v}>{v}</th>)}
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.arguments.map((args) => 
                                <tr key={args}>
                                    {args.map((a, i) => <td key={`${i}-${a}`}>{a}</td>)}
                                    <td>{state.fn(...args)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            : <p className="BoolCheck-empty">Enter your boolean expression above and see all possible results in an instant.</p>}
        </section>;
    }
}
