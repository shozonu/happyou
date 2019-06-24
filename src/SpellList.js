import React from 'react';
import './App.css';
import SpellListEntry from './SpellListEntry';
import SpellListSearchInput from './SpellListSearchInput';
import SpellListSearchButton from './SpellListSearchButton';
import SpellListNavigation from './SpellListNavigation';

class SpellList extends React.Component {
    constructor(props) {
        super(props);
        this.fetchContent = this.fetchContent.bind(this);
        this.state = {
            count: 0,
            results: [],
            pageNumber: 1,
            maxEntriesPerPage: 16,
            retrieved: false
        };
        this.fetchContent("http://www.dnd5eapi.co/api/spells/");
    }
    render() {
        if(this.state.retrieved) {
            // Display SpellListEntries from entire list
            // depending on current page and maximum entries per page
            let entriesList = [];
            let indexStart = this.state.maxEntriesPerPage * (this.state.pageNumber - 1);
            let indexEnd = (this.state.pageNumber * this.state.maxEntriesPerPage) - 1;
            if(indexEnd > this.state.count) {
                indexEnd = this.state.count - 1;
            }
            for(let i = indexStart; i < indexEnd; i++) {
                // Push the relevant entries to be displayed
                let o = <SpellListEntry
                    key={i}
                    name={this.state.results[i].name}
                    url={this.state.results[i].url}
                />;
                entriesList.push(o);
            }
            console.log("(Re)rendering SpellList.\nDisplaying "
                + indexStart + " - " + indexEnd);

            return(
                <div className="App-content">
                    <div className="SpellList-search-container">
                        <SpellListSearchInput/>
                        <SpellListSearchButton/>
                    </div>
                    <div>
                        Displaying {(indexStart + 1) + "-" + (indexEnd + 1)}
                        {" of " + this.state.count}
                    </div>
                    <div className="SpellList">
                        {entriesList}
                    </div>
                    <SpellListNavigation/>
                </div>
            );
        }
        else {
            return(
                <div className="App-content">
                    <div>Loading</div>
                </div>
            );
        }
    }
    async fetchContent(url) {
        if(!this.state.retrieved) {
            let response = await fetch(url).then(result => {
                return result.json();
            });
            this.setState({
                count: response.count,
                results: response.results,
                retrieved: true
            });
        }
    }
}

export default SpellList;
