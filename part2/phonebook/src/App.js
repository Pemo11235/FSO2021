import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '1563-090604'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onChangeName = (event) => {
        setNewName(event.target.value);
    }
    const onChangeNumber = (event) => {
        setNewNumber(event.target.value);
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
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={onChangeName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={onChangeNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) =>
                (<p key={person.name}>{person.name} - {person.number}</p>))}
        </div>
    )
}

export default App