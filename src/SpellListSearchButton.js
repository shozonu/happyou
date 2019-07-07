import React from 'react';
import './App.css';

class SpellListSearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.spellList = props.spellList;
        this.submit = this.submit.bind(this);
        this.element = React.createRef();
    }
    componentDidMount() {
        this.element.current.addEventListener("click", this.submit);
        this.element.current.addEventListener("searchEnterKeypress", this.submit);
    }
    submit(e = null) {
        console.log("Search submitted.");
        this.spellList.ready = false;
        this.spellList.setState({
            count: 0,
            result: [],
        });
        setTimeout(() => {this.spellList.localSearch()}, 100);
    }
    render() {
        return(
            <div className="SpellList-search-button" ref={this.element}>
                &#x21BB;
            </div>
        );
    }
}
export default SpellListSearchButton;
