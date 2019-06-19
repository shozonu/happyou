import React from 'react';
import './App.css';

class Spell extends React.Component {
    constructor(props) {
        super(props);
        this.fetchContent = this.fetchContent.bind(this);
        this.state = {};
        this.fetchContent(props.url);
    }
    render() {
        console.log("(Re)rendering Spell.");
        return(
            <div className="App-content">
                <div>
                    {this.state.name}<br/>
                    {this.state.desc}
                </div>
            </div>
        );
    }
    async fetchContent(url) {
        let response = await fetch(url).then(result => {
            return result.json();
        });
        let list = response.desc;
        for(let i = 0; i < list.length; i++) {
            list[i] = list[i].replace("â€™", "'");
        }
        this.setState({
            name: response.name,
            desc: list
        });
    }
}

export default Spell;
