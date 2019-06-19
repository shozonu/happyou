import React from 'react';
import './App.css';

class SpellListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            url: props.url
        };
    }
    componentDidMount() {
        //
    }
    render() {
        const context = this;
        let f = function() {
            document.getElementsByClassName("App")[0]
            .dispatchEvent(new CustomEvent("changeApp", {
                bubbles: false,
                detail: {
                    name: context.state.name,
                    changeTo: "appSpellsTest",
                    data: {
                        spell: {
                            url: context.state.url
                        }
                    }
                }
            }));
        };
        let e = <div onClick={f}>{this.state.name}</div>;
        return e;
    }
}

export default SpellListEntry;
