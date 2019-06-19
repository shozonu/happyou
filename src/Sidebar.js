import React from 'react';
import './App.css';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {entries: []};
    }
    componentDidMount() {
        let list = [];
        for(let i = 0; i < 4; i++) {
            let name = "Sidebar Entry " + i;
            let e = GenerateEntryDiv(i, name, "appDefault");
            list.push(e);
        }
        let n = list.length;
        list.push(GenerateEntryDiv(n++, "Test", "appTest"));
        list.push(GenerateEntryDiv(n++, "SpellList", "appSpellList"));
        this.setState({entries: list});
    }
    render() {
        return (
            <div className="Side">
                <div className ="side-container">
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
        <div onClick={f} key={index}>{text}</div>
    );
}

export default Sidebar;
