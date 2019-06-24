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
                {"< " + this.state.page + " >"}
            </div>
        );
    }
}
export default SpellListNavigation;
