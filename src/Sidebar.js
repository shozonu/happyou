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
            let e = GenerateEntryDiv(name, i);
            list.push(e);
        }
        let n = list.length;
        list.push(GenerateEntryDiv("Spells", n++));
        list.push(GenerateEntryDiv("Test", n++));
        list.push(GenerateEntryDiv("SpellList", n++));
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

function GenerateEntryDiv(title, index) {
    let f = function() {
        let app = document.getElementsByClassName('App');
        app[0].dispatchEvent(new CustomEvent("changeapp", {
            bubbles: false,
            detail: {name: title}
        }));
    }
    return (
        <div onClick={f} key={index}>{title}</div>
    );
}

export default Sidebar;
