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
            let e = GenerateEntryDiv(name);
            list.push(e);
        }
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

function GenerateEntryDiv(title) {
    let f = function() {
        let app = document.getElementsByClassName('App');
        app[0].dispatchEvent(new CustomEvent("changeapp", {
            bubbles: false,
            detail: {text: title}
        }));
    }
    return (
        <div onClick={f}>{title}</div>
    );
}

export default Sidebar;
