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
        this.spellList.ready = false;
        this.spellList.setState({
            count: 0,
            result: [],
        });
        setTimeout(() => {this.spellList.localSearch()}, 100);
    }
    render() {
        return(
            <div onClick={this.submit} className="SpellList-search-button">
                &#x21BB;
            </div>
        );
    }
}
export default SpellListSearchButton;
