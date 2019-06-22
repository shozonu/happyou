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
            content.push(
                <div key={0} className="Spell-title">{this.state.name}</div>
            );
            for(let i = 0; i < this.state.desc.length; i++) {
                content.push(<div key={content.length} className="Spell-desc">
                {this.state.desc[i]}
                </div>);
            }
            if(this.state.higher_level != null) {
                for(let i = 0; i < this.state.higher_level.length; i++) {
                    content.push(<div key={content.length} className="Spell-desc">
                    <span className="Spell-header-italic">At Higher Levels. </span>
                    {this.state.higher_level[i]}
                    </div>);
                }
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
        for(let i = 0; i < response.desc.length; i++) {
            let s = String(response.desc[i]);
            response.desc[i] = s.replace(/â€™/g, "'");
        }
        if(response.higher_level != null) {
            for(let i = 0; i < response.higher_level.length; i++) {
                let s = String(response.higher_level[i]);
                response.higher_level[i] = s.replace(/â€™/g, "'");
            }
        }
        this.setState(response);
    }
}

export default Spell;
