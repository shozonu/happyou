import React from 'react';
import './App.css';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {entries: []};
    }
    componentDidMount() {
        let list = [];
        let n = list.length; // Using n as key for React element.
        list.push(GenerateEntryDiv(n++, "Spell List", "appSpellList"));
        this.setState({entries: list});
    }
    render() {
        return (
            <div className="Side">
                <div className ="side-container">
                    <div className="side-tab">&#9776;</div>
                    {this.state.entries}
                </div>
            </div>
        );
    }
}

function GenerateEntryDiv(index, text, changeTo) {
    let f = function() {
        let app = document.getElementsByClassName('App');
        app[0].dispatchEvent(new CustomEvent("changeApp", {
            bubbles: false,
            detail: {name: text, changeTo: changeTo}
        }));
    };
    return (
        <div className="sidebar-entry" onClick={f} key={index}>{text}</div>
    );
}

export default Sidebar;
