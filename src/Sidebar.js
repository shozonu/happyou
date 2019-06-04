import React from 'react';
import './App.css';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {entries: []};
        //add a command object or function delegate to each entries?
    }
    componentDidMount() {
        let entries = [];
        for(let i = 0; i < 4; i++) {
            let name = "Sidebar Entry " + i;
            let e = GenerateEntryDiv(name);
            entries.push(e);
        }
        this.setState({entries: entries});
    }
    render() {
        let entries = [];
        entries.push({name: "test name"});
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
    return (
        <div>{title}</div>
    );
}

export default Sidebar;
