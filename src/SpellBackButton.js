import React from 'react';
import './App.css';

class SpellBackButton extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.prevSearchInput = props.prevSearchInput;
    }
    render() {
        return(
            <div onClick={this.goBack} className="Spell-back-button">
                Back
            </div>
        );
    }
    goBack() {
        let app = document.getElementsByClassName('App');
        app[0].dispatchEvent(new CustomEvent("changeApp", {
            bubbles: false,
            detail: {
                name: "Spell List",
                changeTo: "appSpellList",
                data: {
                    prevSearchInput: this.prevSearchInput
                }
            }
        }));
    }
}

export default SpellBackButton;
