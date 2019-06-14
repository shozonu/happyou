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
        this.element.addEventListener("changeapp", this.handleChangeApp);
    }
    componentWillDismount() {
        this.element.removeEventListener("changeapp");
    }
    render() {
        console.log("(Re)rendering App.");
        return this.getApp(this.state.app);
    }
    handleChangeApp(e) {
        if(e.detail.name !== this.state.app) {
            console.log(e.detail.name + " was clicked.");
            this.setState({app: e.detail.name});
        }
    }
    getApp(name) {
        let content;
        if(name === "Spells") {
            content = (
                <Spell url="http://www.dnd5eapi.co/api/spells/119/"/>
            );
        }
        else if(name === "Test") {
            content = (
                <div className="App-content">
                    <Test content="testing content" />
                </div>
            );
        }
        else if(name === "SpellList") {
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
