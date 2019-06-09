import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        if(props.app != null) {
            this.state = {app: props.app};
        }
        else {
            this.state = {app: "None. Click one of the sidebar entries!"};
        }
        this.handleChangeApp = this.handleChangeApp.bind(this);
    }
    handleChangeApp(e) {
        if(e.detail.text !== this.state.app) {
            console.log(e.detail.text + " was clicked.");
            this.setState({app: e.detail.text});
        }
    }
    componentDidMount() {
        this.element.addEventListener("changeapp", this.handleChangeApp);
    }
    render() {
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

export default App;
