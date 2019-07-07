import React from 'react';
import Spell from './Spell';
import SpellList from './SpellList';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.spellList = React.createRef();
        this.element = React.createRef();
        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.fetchContent = this.fetchContent.bind(this);
        this.cache = {
            spellList: {
                retrieved: false,
                entries: null,
                url: "http://www.dnd5eapi.co/api/spells"
            },
            spell: new Map()
        };
        let appName = "None. Click one of the sidebar entries!";
        if(props.app != null) {
            appName = props.app;
        }
        this.state = {
            app: appName,
            data: {}
        };
    }
    componentDidMount() {
        this.setState({
            app: "default"
        });
        this.element.current.addEventListener("changeApp", this.handleChangeApp);
    }
    componentWillDismount() {
        this.element.current.removeEventListener("changeApp");
    }
    render() {
        console.log("(Re)rendering App.");
        let name = this.state.app;
        let content;
        if(name === "appSpell") {
            content = (
                <Spell url={this.state.data.spell.url} app={this}/>
            );
        }
        else if(name === "appSpellList") {
            content = (
                <div className="App-content">
                    <SpellList app={this} ref={this.spellList}/>
                </div>
            );
            this.fetchContent(this.cache.spellList.url);
        }
        else {
            content = (
                <div className="App-content">
                    <p>
                        Currently Displaying:<br/>
                        <code>{this.state.app}</code>
                    </p>
                </div>
            );
        }
        return (
            <div className="App" ref={this.element}>
                {content}
            </div>
        );
    }
    handleChangeApp(e) {
        if(e.detail.changeTo !== this.state.app) {
            this.setState({
                app: e.detail.changeTo,
                data: e.detail.data
            });
        }
    }
    async fetchContent(url) {
        // Called only once on the first time loading SpellList.
        if(!this.cache.spellList.retrieved) {
            console.log("Fetching SpellList content...");
            await fetch(url)
            .then(result => result.json())
            .then(result => {
                let response = result;
                console.log("Response received.");
                this.cache.spellList.entries = new Map();
                for(let obj of response.results) {
                    this.cache.spellList.entries.set(obj.name.toLowerCase(), obj);
                }
                this.cache.spellList.retrieved = true;
                console.log("Saved " + response.count + " to App cache.");
            });
        }
    }
}

export default App;
