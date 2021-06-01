import React, {useState} from 'react'
import {SearchBar} from "./SearchBar";
import {PersonForm} from "./PersonForm";
import {Persons} from "./Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const onChangeName = (event) => {
        setNewName(event.target.value);
    }
    const onChangeNumber = (event) => {
        setNewNumber(event.target.value);
    }
    const onChangeFilter = (event) => {
        setFilter(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        isDuplicated(newName)
            ? window.alert(`${newName} is already in the phonebook !`)
            : setPersons(persons.concat({name: newName, number: newNumber}))
    }

    const isDuplicated = (name) => {
        let cleanedName = name.replaceAll(' ', '');
        return persons.find(person => person.name === cleanedName && person.name.length === cleanedName.length);
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <SearchBar filter={filter} onChangeFilter={onChangeFilter}/>
            <h3>Add new</h3>
            <PersonForm
                newNumber={newNumber} newName={newName}
                onSubmit={onSubmit} onChangeNumber={onChangeNumber}
                onChangeName={onChangeName}/>
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} />
        </div>
    )
};

export default App