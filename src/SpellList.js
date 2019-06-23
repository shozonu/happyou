import React from 'react';
import './App.css';
import SpellListEntry from './SpellListEntry';

class SpellList extends React.Component {
    constructor(props) {
        super(props);
        this.fetchContent = this.fetchContent.bind(this);
        this.state = {
            count: 0,
            results: [],
            pageNumber: 1,
            pageMax: 16,
            retrieved: false
        };
        this.fetchContent("http://www.dnd5eapi.co/api/spells/");
    }
    render() {
        if(this.state.retrieved === true) {
            // Display SpellListEntries from entire list
            // depending on current page and maximum entries per page
            let list = [];
            for(let i = (this.state.pageMax * (this.state.pageNumber - 1));
            i < (this.state.pageNumber * this.state.pageMax) - 1; i++) {
                let o = <SpellListEntry
                    key={i}
                    name={this.state.results[i].name}
                    url={this.state.results[i].url}
                />;
                list.push(o);
            }
            console.log("(Re)rendering SpellList.");
            console.log("displaying " +
                (this.state.pageMax * (this.state.pageNumber - 1)) +
                " - " +
                ((this.state.pageNumber * this.state.pageMax) - 1));
            return(
                <div className="App-content">
                    <div>Results: {this.state.results.count}</div>
                    {list}
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
        if(this.state.retrieved === false) {
            let response = await fetch(url).then(result => {
                return result.json();
            });
            let list = [];
            for(let i = 0; i < response.results.length; i++) {
                let s = String(response.results[i]);
                list.push(s.replace(/â€™/g, "'"));
            }
            this.setState({
                count: response.count,
                results: response.results,
                retrieved: true
            });
        }
    }
}

export default SpellList;
