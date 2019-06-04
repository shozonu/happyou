import React from 'react';
import './App.css';

function Sidebar() {
    let title = [];
    for(let i = 0; i < 4; i++) {
        let e = GenerateEntryDiv("Sidebar Entry " + i);
        title.push(e);
    }

    return (
        <div className="Side">
            <div className ="side-container">
                {title}
            </div>
        </div>
    );
}

function GenerateEntryDiv(title) {
    return (
        <div>{title}</div>
    );
}

export default Sidebar;
