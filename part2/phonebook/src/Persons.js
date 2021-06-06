import React from "react";

function Persons({persons, filterWord}) {

    console.log(filterWord)
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name.toLowerCase().includes(filterWord.toLowerCase())
                )
                .map(filteredP =>
                    <p key={filteredP.id}> {filteredP.name} - {filteredP.number}</p>
                )
            }
        </div>
    )
}

export {Persons}