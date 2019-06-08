import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {app: "Default Application"}
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Currently Displaying<br/>
                        <code>{this.state.app}</code>
                    </p>
                </header>
            </div>
        );
    }
}

export default App;
