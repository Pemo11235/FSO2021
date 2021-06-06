import React, {useEffect, useState} from 'react'
import {SearchBar} from "./SearchBar";
import {PersonForm} from "./PersonForm";
import {Persons} from "./Persons";
import services from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
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

    const onDelete = (id) => {
        const personToDelete = persons.find(person => person.id === id)
        const result = window.confirm(`Delete ${personToDelete.name}?`)

        if (result) {
            services.remove(id).then(id => setPersons(persons.filter(person => person.id !== id)))
        }
    }

    const onUpdate = (id, newObj) => {
        const personToUpdate = persons.find(person => person.id === id)
        const result = window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)

        if (result) {
            services.update(id, newObj).then(replaced => {
                const newPersons = persons.map(
                    (person) => person.id === replaced.id ?
                        {
                            id: replaced.id,
                            name: replaced.name,
                            number: replaced.number
                        } : {
                            id: person.id,
                            name: person.name,
                            number: person.number
                        }
                )
                setPersons(newPersons)
            })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const newObject = {
            name: newName,
            number: newNumber
        }
        isDuplicated(newName)
            ? onUpdate(getDuplicatedID(newName), newObject)
            : services
                .create(newObject)
                .then(newObj => {setPersons(persons.concat(newObj) )})
    }


    const isDuplicated = (name) => {
        return persons.find(person => person.name.toLowerCase() === name.toLowerCase() &&
            person.name.length === name.length);
    }

    const getDuplicatedID = (name) => {
        const foundPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase() &&
            person.name.length === name.length);
        return foundPerson.id
    }

    useEffect(() => {
        services
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, []);

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
            <Persons persons={persons} filterWord={filter} onDelete={onDelete}/>
        </div>
    )
};

export default App