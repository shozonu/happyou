import React from 'react';
import './App.css';
import SpellListEntry from './SpellListEntry';

class SpellList extends React.Component {
    constructor(props) {
        super(props);
        this.fetchContent = this.fetchContent.bind(this);
        this.state = {
            count: 0,
            results: []
        };
        this.fetchContent("http://www.dnd5eapi.co/api/spells/");
    }
    render() {
        let list = [];
        let max = this.state.count;
        if(max > 5) {
            max = 5;
        }
        for(let i = 0; i < max; i = i + 1) {
            let o = <SpellListEntry
                key={i}
                name={this.state.results[i].name}
                url={this.state.results[i].url}
            />;
            list.push(o);
        }
        console.log("(Re)rendering SpellList.");
        console.log("displaying " + max);
        return(
            <div className="App-content">
                <div>Results: {this.state.results.count}</div>
                {list}
            </div>
        );
    }
    async fetchContent(url) {
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
            results: response.results
        });
    }
}

export default SpellList;
