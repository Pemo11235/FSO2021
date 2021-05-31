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
            {parts.map(part => <Part key={part.name} part={part.name} exercise={part.exercises}/>)}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total exercises={course.parts.map(part => part.exercises)}/>
        </div>
    )
}

const Total = ({exercises}) => {
    return <p><b>Number of exercises {exercises.reduce((acc, curr) => acc += curr)}</b></p>
}
const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return courses.map(c => <Course key={c.name} course={c}/> )
}

export default App