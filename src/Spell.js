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
        let content = [];
        if(this.state.desc != null) {
            content.push(<div key={0}>{this.state.name}</div>);
            for(let i = 0; i < this.state.desc.length; i++) {
                content.push(<div key={i+1}>{this.state.desc[i]}</div>);
            }
        }
        return(
            <div className="App-content">
                <div className="Spell">
                    {content}
                </div>
            </div>
        );
    }
    async fetchContent(url) {
        let response = await fetch(url).then(result => {
            return result.json();
        });
        let list = [];
        for(let i = 0; i < response.desc.length; i++) {
            let s = String(response.desc[i]);
            list.push(s.replace(/â€™/g, "'"));
        }
        this.setState({
            name: response.name,
            desc: list
        });
    }
}

export default Spell;
