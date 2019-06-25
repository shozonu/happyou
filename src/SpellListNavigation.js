import React from 'react';
import './App.css';

class SpellListNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.pagePrev = this.pagePrev.bind(this);
        this.pageNext = this.pageNext.bind(this);
        this.spellList = props.spellList;
        this.maxPages = Math.ceil(
            this.spellList.state.count
            / this.spellList.state.maxEntriesPerPage
        );
        this.state = {
            page: 1
        }
    }
    pagePrev() {
        if(this.state.page > 1) {
            let newPage = this.state.page - 1;
            this.setState({
                page: newPage
            });
            this.spellList.setState({
                pageNumber: newPage
            });
        }
    }
    pageNext() {
        if(this.state.page < this.maxPages) {
            let newPage = this.state.page + 1;
            this.setState({
                page: newPage
            });
            this.spellList.setState({
                pageNumber: newPage
            });
        }
    }
    render() {
        return(
            <div className="SpellList-navigation">
                <div onClick={this.pagePrev} className="SpellList-navigation-button">
                    {"<<"}
                </div>
                <div>{this.state.page}</div>
                <div onClick={this.pageNext} className="SpellList-navigation-button">
                    {">>"}
                </div>
            </div>
        );
    }
}
export default SpellListNavigation;
