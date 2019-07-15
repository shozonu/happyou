import React from 'react';
import './App.css';

class SpellListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.showSpellModal = this.showSpellModal.bind(this);
        this.state = {
            name: props.name,
            url: props.url
        };
    }
    render() {
        let e = <div onClick={this.showSpellModal} className="SpellList-entry">{this.state.name}</div>;
        return e;
    }
    showSpellModal() {
        document.getElementsByClassName("App")[0]
        .dispatchEvent(new CustomEvent("showSpellModal", {
            bubbles: false,
            detail: {
                name: this.state.name,
                changeTo: "spellModal",
                data: {
                    spell: {
                        url: this.state.url
                    }
                }
            }
        }));
    }
}

export default SpellListEntry;
