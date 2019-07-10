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
    render() {
        const context = this;
        let f = function() {
            let prevSearchInput = document
                .getElementsByClassName("SpellList-search-input")[0]
                .value;
            document.getElementsByClassName("App")[0]
            .dispatchEvent(new CustomEvent("changeApp", {
                bubbles: false,
                detail: {
                    name: context.state.name,
                    changeTo: "appSpell",
                    data: {
                        spell: {
                            url: context.state.url,
                            prevSearchInput: prevSearchInput
                        }
                    }
                }
            }));
        };
        let e = <div onClick={f} className="SpellList-entry">{this.state.name}</div>;
        return e;
    }
}

export default SpellListEntry;
