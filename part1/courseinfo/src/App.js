import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}
const Part = ({part, exercise}) => {
    return <p>{part} {exercise}</p>
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part part={part.name} exercise={part.exercises}/>)}
        </div>
    )
}


const Total = ({exercises}) => {
    return <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
}
const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total exercises={parts.map(part => part.exercises)}/>
        </div>
    )
}

export default App