import React from 'react';
import './App.css';

class SpellBackButton extends React.Component {
    constructor(props) {
        super(props);
        this.prevSearchInput = props.prevSearchInput;
    }
    render() {
        return(
            <div className="Spell-back-button">
                Back
            </div>
        );
    }
}

export default SpellBackButton;
