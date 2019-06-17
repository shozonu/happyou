import React from 'react';
import './App.css';

class SpellListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            url: props.url
        };
    }
    componentDidMount() {
        //
    }
    render() {
        let e = <div>{this.state.name}</div>;
        return e;
    }
    handleClick() {
        //
    }
}

export default SpellListEntry;
