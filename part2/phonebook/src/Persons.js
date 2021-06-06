import React from "react";
import {DeleteButton} from "./DeleteButton";

function Persons({persons, filterWord, onDelete}) {
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name.toLowerCase().includes(filterWord.toLowerCase())
                )
                .map(filteredP =>
                    <p key={filteredP.id}> {filteredP.name} - {filteredP.number}
                        <DeleteButton onClickAction={()=>onDelete(filteredP.id)} />
                    </p>
                )
            }
        </div>
    )
}

export {Persons}