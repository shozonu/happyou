import React from 'react';
import './App.css';
import SpellListEntry from './SpellListEntry';
import SpellListSearchInput from './SpellListSearchInput';
import SpellListSearchButton from './SpellListSearchButton';
import SpellListNavigation from './SpellListNavigation';

class SpellList extends React.Component {
    constructor(props) {
        super(props);
        this.nav = React.createRef();
        this.search = this.search.bind(this);
        this.localSearch = this.localSearch.bind(this);
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
            endpoint: endpoint,
        };
        this.ready = false;
    }
    componentDidMount() {
        if(this.app.cache.spellList.retrieved) {
            this.localSearch(true);
        }
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
        // Entries do not properly re-render when doing search.
        // Search results seem to be appended to current results list.
        // Asynchronous nature of setState may be related?
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
                        <SpellListNavigation ref={this.nav} spellList={this}/>
                    </div>
                );
            }
            else {
                let msg = "No Results";
                if(!this.ready) {
                    msg = "Loading ..."
                }
                return(
                    <div className="App-content">
                        <div className="SpellList-search-container">
                            <SpellListSearchInput spellList={this}/>
                            <SpellListSearchButton spellList={this}/>
                        </div>
                        <div style={{paddingBottom: 33}}>
                            {msg}
                        </div>
                        <SpellListNavigation ref={this.nav} spellList={this}/>
                    </div>
                );
            }
        }
        else {
            return(
                <div className="App-content">
                    <div className="SpellList-search-container">
                        <SpellListSearchInput spellList={this}/>
                        <SpellListSearchButton spellList={this}/>
                    </div>
                    <div style={{paddingBottom: 33}}>
                        Loading...
                    </div>
                    <SpellListNavigation ref={this.nav} spellList={this}/>
                </div>
            );
        }
    }
    async search() {
        this.app.cache.spellList.retrieved = false;
        let terms = document
            .getElementsByClassName("SpellList-search-input")[0]
            .value;
        console.log("Searching terms: " + terms);
        terms = String(terms).replace(/\s+/g, "+");
        let url = this.state.url + "?name=" + terms;
        console.log(url);
        await this.fetchContent(url);
        this.app.cache.spellList.retrieved = false;
    }
    async localSearch(getAll = false) {
        if(getAll) {
            console.log("Retrieving entries from cache.");
            let array = [];
            this.app.cache.spellList.entries.forEach((value, key) => {
                array.push(value);
            });
            this.ready = true;
            this.setState({
                count: array.length,
                results: array,
            });
        }
        else {
            // This section should only execute by a term search.
            let input = document
                .getElementsByClassName("SpellList-search-input")[0]
                .value;
            console.log("Searching terms from cache: '" + input + "'");
            let inputNormalized = String(input)
                .trim()
                .replace(/\s+/g, " ")
                .toLowerCase();
            let results = [];
            if(this.app.cache.spellList.entries.has(inputNormalized)) {
                // If there is an exact match, return the match.
                let obj = this.app.cache.spellList.entries.get(inputNormalized);
                results.push(obj);
            }
            else {
                // If there is no exact match, return individual term matches.
                if(inputNormalized.match(/\w+/g) != null) {
                    // If search input is not only white space.
                    let terms = inputNormalized.split(" ");
                    let str = "";
                    for(let i = 0; i < terms.length; i++) {
                        let word = "(" + terms[i] + ")";
                        if(i < terms.length - 1) {
                            word = word.concat("|");
                        }
                        str = str.concat(word);
                    }
                    let regex = new RegExp(str,"g");
                    this.app.cache.spellList.entries.forEach((value, key) => {
                        // Add spell name to array if there is a match.
                        let m = key.match(regex);
                        if(m != null) {
                            results.push(value);
                        }
                    });
                }
                else {
                    this.app.cache.spellList.entries.forEach((value, key) => {
                        results.push(value);
                    });
                }
            }
            this.nav.current.setState({
                page: 1
            });
            this.ready = true;
            this.setState({
                count: results.length,
                results: results,
                pageNumber: 1,
            });
        }
    }
}

export default SpellList;
