import React from "react";

function SearchBar ({filter, onChangeFilter}) {
    return(
        <div>
            <p>Filter shown with <input value={filter} onChange={onChangeFilter}/></p>
        </div>
    )
}

export {SearchBar}