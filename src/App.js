import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeApp = this.handleChangeApp.bind(this);
        this.getApp = this.getApp.bind(this);
        if(props.app != null) {
            this.state = {app: props.app};
        }
        else {
            this.state = {app: "None. Click one of the sidebar entries!"};
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
            let content = getAPIResponse("/spells/1/");
            return (
                <div className="App" ref={elem => this.element = elem}>
                    <header className="App-header">
                        <p>
                            {content}
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
}

function getAPIResponse(s) {
    let xhttp = new XMLHttpRequest();
    let url = "http://www.dnd5eapi.co/api" + s;
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            return xhttp.responseText;
        }
    }
    xhttp.open("GET", url, false);
    xhttp.send();
}

export default App;
