import React from 'react';
import './App.css';
import SpellListEntry from './SpellListEntry';

class SpellListSearchInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <input type="search" className="SpellList-search-input"/>
        );
    }
}
export default SpellListSearchInput;
