import React from 'react';
import './App.css';

class SpellListSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.spellList = props.spellList;
        this.state = {
            input: ""
        }
    }
    render() {
        return(
            <input type="search" className="SpellList-search-input"/>
        );
    }
}
export default SpellListSearchInput;
