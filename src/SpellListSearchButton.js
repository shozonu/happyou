import React from 'react';
import './App.css';

class SpellListSearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.spellList = props.spellList;
        this.submit = this.submit.bind(this);
    }
    submit() {
        console.log("Search submitted.");
    }
    render() {
        return(
            <div onClick={this.submit} className="SpellList-search-button">
                🡺
            </div>
        );
    }
}
export default SpellListSearchButton;
