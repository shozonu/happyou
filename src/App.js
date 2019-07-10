import React from 'react';
import Spell from './Spell';
import SpellList from './SpellList';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.spellList = React.createRef();
        this.spell = React.createRef();
        this.element = React.createRef();
        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.handleShowSpellModal = this.handleShowSpellModal.bind(this);
        this.fetchContent = this.fetchContent.bind(this);
        this.cache = {
            spellList: {
                retrieved: false,
                entries: null,
                url: "http://www.dnd5eapi.co/api/spells"
            },
            spell: new Map()
        };
        let appName = "None.";
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
        this.element.current.addEventListener("showSpellModal", this.handleShowSpellModal);
    }
    componentWillDismount() {
        this.element.current.removeEventListener("changeApp");
    }
    render() {
        let name = this.state.app;
        let content;
        if(name === "appSpellList") {
            this.fetchContent(this.cache.spellList.url);
            content = (
                <div className="App-content">
                    <SpellList
                        app={this}
                        ref={this.spellList}
                    />
                </div>
            );
        }
        else {
            content = (
                <div className="App-content">
                    <p>
                        <code>Select an App from the sidebar on the left.</code>
                    </p>
                </div>
            );
        }
        return (
            <div className="App" ref={this.element}>
                <Spell app={this} ref={this.spell}/>
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
    handleShowSpellModal(e) {
        let modal = document.getElementsByClassName("Spell-modal")[0];
        modal.style.display = "flex";
        modal.dispatchEvent(new CustomEvent("loadSpell", {
            bubbles: false,
            detail: {
                url: e.detail.data.spell.url
            }
        }))
    }
    async fetchContent(url) {
        // Called only once on the first time loading SpellList.
        if(!this.cache.spellList.retrieved) {
            console.log("Fetching SpellList content...");
            await fetch(url)
            .then(result => result.json())
            .then(result => {
                let response = result;
                this.cache.spellList.entries = new Map();
                for(let obj of response.results) {
                    this.cache.spellList.entries.set(obj.name.toLowerCase(), obj);
                }
                this.cache.spellList.retrieved = true;
                console.log("Response received.\nStored " + response.count + " entries to App cache.");
                this.spellList.current.localSearch(true);
            });
        }
    }
}

export default App;
