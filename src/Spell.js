import React from 'react';
import SpellBackButton from './SpellBackButton';
import './App.css';

class Spell extends React.Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
        this.fetchContent = this.fetchContent.bind(this);
        this.handleLoadSpell = this.handleLoadSpell.bind(this);
        this.app = props.app;
        this.state = {};
        this.url = props.url;
    }
    componentDidMount() {
        this.element.current.addEventListener("loadSpell", this.handleLoadSpell)
    }
    render() {
        let content = [];
        if(this.state.desc != null) {
            content.push(
                <div key={content.length} className="Spell-title">
                    {this.state.name}
                </div>
            );
            if(this.state.level !== 0 ){
                let prefix = "th-level ";
                if(this.state.level === 1) {
                    prefix = "st-level ";
                }
                else if(this.state.level === 2) {
                    prefix = "nd-level ";
                }
                else if(this.state.level === 3) {
                    prefix = "rd-level ";
                }
                content.push(
                    <div key={content.length} className="Spell-subtitle">
                        {this.state.level + prefix} {this.state.school.name}
                    </div>
                );
            }
            else {
                content.push(
                    <div key={content.length} className="Spell-subtitle">
                        {this.state.school.name} cantrip
                    </div>
                );
            }
            content.push(
                <div key={content.length}>
                    <span className="Spell-header">Casting Time: </span>
                    {this.state.casting_time}
                </div>
            );
            content.push(
                <div key={content.length}>
                    <span className="Spell-header">Range: </span>
                    {this.state.range}
                </div>
            );
            {
                let mat = "";
                if(this.state.material != null) {
                    mat = "(" + this.state.material + ")";
                }
                content.push(
                    <div key={content.length}>
                        <span className="Spell-header">Components: </span>
                        {this.state.components} {mat}
                    </div>
                );
            }
            {
                let concen = "";
                if(this.state.concentration === "yes") {
                    concen = " (concentration)";
                }
                content.push(
                    <div key={content.length}>
                        <span className="Spell-header">Duration: </span>
                        {this.state.duration + concen}
                    </div>
                );
            }
            for(let i = 0; i < this.state.desc.length; i++) {
                content.push(
                    <div key={content.length} className="Spell-desc">
                        {this.state.desc[i]}
                    </div>
                );
            }
            if(this.state.higher_level != null) {
                for(let i = 0; i < this.state.higher_level.length; i++) {
                    content.push(
                        <div key={content.length} className="Spell-desc">
                            <span className="Spell-header-bold-italic">
                                {"At Higher Levels. "}
                            </span>
                            {this.state.higher_level[i]}
                        </div>
                    );
                }
            }
            return(
                <div className="Spell-modal">
                    <div className="Spell-modal-content">
                        <div className="Spell">
                            {content}
                        </div>
                        <SpellBackButton/>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="Spell-modal" ref={this.element}>
                    <div className="Spell-modal-content">
                        <div className="Spell">
                            Loading Spell...
                        </div>
                        <SpellBackButton/>
                    </div>
                </div>
            );
        }
    }
    async fetchContent(url) {
        let response = await fetch(url).then(result => {
            return result.json();
        });
        if(response.material != null) {
            let s = stringCorrectify(response.material);
            response.material = s;
        }
        for(let i = 0; i < response.desc.length; i++) {
            let s = stringCorrectify(response.desc[i]);
            response.desc[i] = s;
        }
        if(response.higher_level != null) {
            for(let i = 0; i < response.higher_level.length; i++) {
                let s = stringCorrectify(response.higher_level[i]);
                response.higher_level[i] = s;
            }
        }
        this.setState(response);
    }
    handleLoadSpell(e) {
        console.log("handleLoadSpell called.");
        this.fetchContent(e.detail.url);
    }
}

function stringCorrectify(input) {
    let s = String(input);
    s = s.replace(/(â€œ)|(â€�)/g, "\"");
    s = s.replace(/â€™/g, "'");
    return s;
}

export default Spell;
