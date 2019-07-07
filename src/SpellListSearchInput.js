import React from 'react';
import './App.css';

class SpellListSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.checkKey = this.checkKey.bind(this);
    }
    render() {
        return(
            <input
                type="search"
                className="SpellList-search-input"
                autoFocus={true}
                onKeyDown={(event) => this.checkKey(event)}
            />
        );
    }
    checkKey(e) {
        if(e.key === "Enter") {
            let button = document.getElementsByClassName("SpellList-search-button")[0];
            button.dispatchEvent(new CustomEvent("searchEnterKeypress", {
                bubbles: false,
                detail:{}
            }));
        }
    }
}
export default SpellListSearchInput;
