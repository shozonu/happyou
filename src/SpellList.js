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
        this.search = this.search.bind(this);
        this.app = props.app;
        let url = "http://www.dnd5eapi.co/api/spells";
        let endpoint = "/";
        if(props.url != null) {
            url = props.url;
        }
        if(props.endpoint != null) {
            endpoint = props.endpoint;
        }
        this.state = {
            count: 0,
            results: [],
            pageNumber: 1,
            maxEntriesPerPage: 16,
            url: url,
            endpoint: endpoint
        };
    }
    componentDidMount() {
        this.fetchContent(this.state.url + this.state.endpoint);
    }
    componentDidUpdate() {
        if(this.state.count === 1) {
            let app = document.getElementsByClassName("App");
            let spell = this.state.results[0];
            app[0].dispatchEvent(new CustomEvent("changeApp", {
                bubbles: false,
                detail: {
                    name: spell.name,
                    changeTo: "appSpell",
                    data: {
                        spell: spell
                    }
                }
            }));
        }
    }
    render() {
        if(this.app.cache.spellList.retrieved) {
            if(this.state.count > 0) {
                // Display SpellListEntries from entire list
                // depending on current page and maximum entries per page
                let entriesList = [];
                let indexStart = this.state.maxEntriesPerPage * (this.state.pageNumber - 1);
                let indexEnd = (this.state.pageNumber * this.state.maxEntriesPerPage) - 1;
                if(indexEnd >= this.state.count - 1) {
                    indexEnd = this.state.count - 1;
                }
                for(let i = indexStart; i <= indexEnd; i++) {
                    // Push the relevant entries to be displayed
                    let o = <SpellListEntry
                        key={i}
                        name={this.state.results[i].name}
                        url={this.state.results[i].url}
                    />;
                    entriesList.push(o);
                }
                console.log("Displaying "
                    + indexStart + " - " + indexEnd + ".");

                return(
                    <div className="App-content">
                        <div className="SpellList-search-container">
                            <SpellListSearchInput spellList={this}/>
                            <SpellListSearchButton spellList={this}/>
                        </div>
                        <div>
                            Displaying {(indexStart + 1) + "-" + (indexEnd + 1)}
                            {" of " + this.state.count}
                        </div>
                        <div className="SpellList">
                            {entriesList}
                        </div>
                        <SpellListNavigation spellList={this}/>
                    </div>
                );
            }
            else {
                return(
                    <div className="App-content">
                        <div className="SpellList-search-container">
                            <SpellListSearchInput spellList={this}/>
                            <SpellListSearchButton spellList={this}/>
                        </div>
                        <div>
                            No Results
                        </div>
                    </div>
                );
            }
        }
        else {
            return(
                <div className="App-content">
                    <div>Loading...</div>
                </div>
            );
        }
    }
    async fetchContent(url) {
        if(!this.app.cache.spellList.retrieved) {
            console.log("Fetching SpellList content...");
            let response = await fetch(url).then(result => {
                return result.json();
            });
            this.app.cache.spellList.retrieved = true;
            this.app.cache.spellList.entries = response.results;
            this.setState({
                count: response.count,
                results: response.results
            });
        }
        else {
            console.log("Using SpellList content from cache...");
            this.app.cache.spellList.retrieved = true;
            this.setState({
                count: this.app.cache.spellList.entries.length,
                results: this.app.cache.spellList.entries
            });
        }
    }
    async search() {
        this.app.cache.spellList.retrieved = false;
        let terms = document
            .getElementsByClassName("SpellList-search-input")[0]
            .value;
        console.log("Seaching terms: " + terms);
        terms = String(terms).replace(/\s+/g, "+");
        let url = this.state.url + "?name=" + terms;
        console.log(url);
        await this.fetchContent(url);
        this.app.cache.spellList.retrieved = false;
    }
}

export default SpellList;
