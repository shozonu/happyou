import React from 'react';
import './App.css';

class SpellListNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }
    render() {
        return(
            <div className="SpellList-navigation">
                <div>{"<<"}</div>
                <div>{this.state.page}</div>
                <div>{">>"}</div>
            </div>
        );
    }
}
export default SpellListNavigation;
