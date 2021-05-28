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


const Total = ({ex1, ex2, ex3}) => {
    return <p>Number of exercises {ex1 + ex2 + ex3}</p>
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    const parts =[part1, part2, part3];

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}/>
        </div>
    )
}

export default App