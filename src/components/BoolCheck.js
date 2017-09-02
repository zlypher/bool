import React, { Component } from "react";
import tt from "./BoolTokenTypes";
import BoolInterpreter from "./BoolInterpreter";
import BoolTokenizer from "./BoolTokenizer";
import BoolParser from "./BoolParser";
import { generateArguments, setupEnvironment } from "./Utility";
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
            const tokenizer = new BoolTokenizer();
            const parser = new BoolParser();
            const interpreter = new BoolInterpreter();

            const tokens = tokenizer.tokenize(expression);
            const expr = parser.parse(tokens);

            const args = tokens.filter(t => t.type === tt.IDENTIFIER).map(t => t.value);
            const func = (expr) => (env) => {
                return interpreter.interpret(expr, env);
            }

            this.setState({
                arguments: generateArguments(args.length),
                expression: expression,
                fn: func(expr),
                variables: args,
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
                                    <td>{state.fn(setupEnvironment(state.variables, args)) ? "TRUE" : "FALSE"}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            : <p className="BoolCheck-empty">Enter your boolean expression above and see all possible results in an instant.</p>}
        </section>;
    }
}
