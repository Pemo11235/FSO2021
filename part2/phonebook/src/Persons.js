function Persons({persons, filter}) {
    return(
        <div>
            {persons
                .filter(person => person.name.includes(filter))
                .map(person =>
                    <p>{person.name} - {person.number}</p>
                )}
        </div>
    )
}
export {Persons}