import React, { Component } from "react";
import tt from "./BoolTokenTypes";
import BoolInterpreter from "./BoolInterpreter";
import BoolTokenizer from "./BoolTokenizer";
import BoolParser from "./BoolParser";
import { generateArguments, setupEnvironment } from "./Utility";
import './BoolCheck.css';

const Tick = ({ flag }) => {
    let className = `Tick ${flag ? "Tick-active" : "x"}`;
    return <div className={className}>
    </div>
}

export default class BoolCheck extends Component {
    constructor() {
        super();

        this.tokenizer = new BoolTokenizer();
        this.parser = new BoolParser();
        this.interpreter = new BoolInterpreter();

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
            const tokens = this.tokenizer.tokenize(expression);
            const expr = this.parser.parse(tokens);

            const args = tokens.filter(t => t.type === tt.IDENTIFIER).map(t => t.value);
            const interpretFunc = (expr) => (env) => this.interpreter.interpret(expr, env);

            this.setState({
                arguments: generateArguments(args.length),
                expression: expression,
                fn: interpretFunc(expr),
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


    renderArg(flag, index) {
        return <td key={`${index}-${flag}`}>
            <Tick flag={flag} />
        </td>
    }

    renderResult({ fn, variables }, args) {
        const flag = fn(setupEnvironment(variables, args));

        return <td>
            <Tick flag={flag} />
        </td>
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
                                    {args.map(this.renderArg)}
                                    {this.renderResult(state, args)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            : <p className="BoolCheck-empty">No expression detected</p>}
        </section>;
    }
}
