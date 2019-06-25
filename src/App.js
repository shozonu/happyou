import React from 'react';
import Spell from './Spell';
import SpellList from './SpellList';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.getApp = this.getApp.bind(this);
        if(props.app != null) {
            this.state = {
                app: props.app,
                data: {}
            };
        }
        else {
            this.state = {
                app: "None. Click one of the sidebar entries!",
                data: {}
            };
        }
    }
    componentDidMount() {
        this.setState({appObj: this.getApp("default")});
        this.element.addEventListener("changeApp", this.handleChangeApp);
    }
    componentWillDismount() {
        this.element.removeEventListener("changeApp");
    }
    render() {
        console.log("(Re)rendering App.");
        return this.getApp();
    }
    handleChangeApp(e) {
        if(e.detail.changeTo !== this.state.app) {
            console.log(e.detail.name + " was clicked. (" + e.detail.changeTo +")");
            this.setState({
                app: e.detail.changeTo,
                data: e.detail.data
            });
        }
    }
    getApp() {
        let name = this.state.app;
        let content;
        if(name === "appSpell") {
            content = (
                <Spell url = {this.state.data.spell.url} />
            );
        }
        else if(name === "appTest") {
            content = (
                <div className="App-content">
                    <Test content="testing content" />
                </div>
            );
        }
        else if(name === "appSpellList") {
            content = (
                <div className="App-content">
                    <SpellList />
                </div>
            );
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
            <div className="App" ref={elem => this.element = elem}>
                {content}
            </div>
        );
    }
}
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        };
    }
    render() {
        return(
            <div className="App-content">
                <div>{this.state.content}</div>
            </div>
        );
    }
}

export default App;
