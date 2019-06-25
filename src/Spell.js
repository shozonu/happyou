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
                <div key={content.length} className="Spell-title">
                    {this.state.name}
                </div>
            );
            content.push(
                <div key={content.length} className="Spell-desc">
                    <span className="Spell-header">Casting Time: </span>
                    {this.state.casting_time}
                </div>
            );
            content.push(
                <div key={content.length} className="Spell-desc">
                    <span className="Spell-header">Range: </span>
                    {this.state.range}
                </div>
            );
            let mat = "";
            if(this.state.material != null) {
                mat = "(" + this.state.material + ")";
            }
            content.push(
                <div key={content.length} className="Spell-desc">
                    <span className="Spell-header">Components: </span>
                    {this.state.components} {mat}
                </div>
            );
            content.push(
                <div key={content.length} className="Spell-desc">
                    <span className="Spell-header">Duration: </span>
                    {this.state.duration}
                </div>
            );
            for(let i = 0; i < this.state.desc.length; i++) {
                content.push(
                    <div key={content.length} className="Spell-desc">
                        {this.state.desc[i]}
                    </div>
                );
            }
            if(this.state.higher_level != null) {
                for(let i = 0; i < this.state.higher_level.length; i++) {
                    content.push(<div key={content.length} className="Spell-desc">
                    <span className="Spell-header-bold-italic">At Higher Levels. </span>
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
            s = s.replace(/(â€œ)|(â€�)/g, "\"");
            s = s.replace(/â€™/g, "'");
            response.desc[i] = s;
        }
        if(response.higher_level != null) {
            for(let i = 0; i < response.higher_level.length; i++) {
                let s = String(response.higher_level[i]);
                s = s.replace(/(â€œ)|(â€�)/g, "\"");
                s = s.replace(/â€™/g, "'");
                response.higher_level[i] = s;
            }
        }
        this.setState(response);
    }
}

export default Spell;
