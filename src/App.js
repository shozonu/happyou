import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.getApp = this.getApp.bind(this);
        this.getAPIResponse = this.getAPIResponse.bind(this);
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
        this.getAPIResponse("/spells/1/");
    }
    componentWillDismount() {
        this.element.removeEventListener("changeapp");
    }
    render() {
        let obj = this.getApp(this.state.app);
        return obj;
    }
    handleChangeApp(e) {
        if(e.detail.name !== this.state.app) {
            console.log(e.detail.name + " was clicked.");
            this.setState({app: e.detail.name});
        }
    }
    getApp(name) {
        if(name === "Spells") {
            return (
                <div className="App" ref={elem => this.element = elem}>
                    <header className="App-header">
                        <p>
                            Spell: {this.state.data.name}<br/>
                            <code>
                                Description: {this.state.data.desc[0]}<br/>
                            </code>
                        </p>
                    </header>
                </div>
            );
        }
        else {
            return (
                <div className="App" ref={elem => this.element = elem}>
                    <header className="App-header">
                        <p>
                            Currently Displaying:<br/>
                            <code>{this.state.app}</code>
                        </p>
                    </header>
                </div>
            );
        }
    }
    getAPIResponse(s) {
        let scope = this;
        let xhttp = new XMLHttpRequest();
        let url = "http://www.dnd5eapi.co/api" + s;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let obj = JSON.parse(xhttp.responseText);
                console.log(obj);
                scope.setState({data: obj});
                return obj;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}

export default App;
