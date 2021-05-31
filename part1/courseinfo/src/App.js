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
            {parts.map(part => <Part key= {part.name} part={part.name} exercise={part.exercises}/>)}
        </div>
    )
}

const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            {/*<Total exercises={course.parts.map(part => part.exercises)}/>*/}
        </div>
    )
}

const Total = ({exercises}) => {
    return <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
}
const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }
    return <Course course={course} />
}

export default App