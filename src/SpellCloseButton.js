import React from 'react';
import './App.css';

class SpellCloseButton extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }
    render() {
        return(
            <div onClick={this.close} className="Spell-close-button">
                Close
            </div>
        );
    }
    close() {
        let modal = document.getElementsByClassName("Spell-modal")[0];
        modal.style.display = "none";
    }
}

export default SpellCloseButton;
