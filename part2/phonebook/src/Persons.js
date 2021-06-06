function Persons({persons, filter}) {
    return(
        <div>
            {persons
                .filter(person => person.name.includes(filter))
                .map(person =>
                    <p key={person.name}>{person.name} - {person.number}</p>
                )}
        </div>
    )
}
export {Persons}